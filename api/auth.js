/**
 * GitHub OAuth Handler for Decap CMS
 * Handles both authorization redirect and token exchange
 */

export default async (req, res) => {
  const clientId = 'Ov23lifj7lCto8d0EHYT';
  const clientSecret = process.env.DECAP_CMS_GITHUB_APP_SECRET;

  // Log the incoming request for debugging
  console.log('Auth endpoint called:', {
    method: req.method,
    query: req.query,
    body: req.body
  });

  // Get code from query params (GET) or body (POST)
  const code = req.query.code || req.body?.code;

  // Step 1: If no code, redirect to GitHub OAuth
  if (!code) {
    const redirectUri = `${req.headers.origin || 'https://vertex-capitalportifolio.vercel.app'}/api/auth`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;
    
    console.log('Redirecting to GitHub OAuth:', githubAuthUrl);
    return res.redirect(githubAuthUrl);
  }

  // Step 2: Exchange code for access token
  if (!clientSecret) {
    console.error('Missing DECAP_CMS_GITHUB_APP_SECRET environment variable');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', // Request JSON response
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });

    const tokenData = await tokenResponse.json();

    // Check for OAuth errors
    if (tokenData.error) {
      console.error('GitHub OAuth error:', tokenData.error_description);
      return res.status(400).json({ 
        error: tokenData.error_description || 'OAuth authentication failed' 
      });
    }

    if (!tokenData.access_token) {
      console.error('No access token received from GitHub');
      return res.status(400).json({ error: 'Failed to obtain access token' });
    }

    console.log('Successfully obtained access token');

    // Send HTML that posts token back to opener window (Decap CMS)
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>GitHub Authentication Success</title>
</head>
<body>
  <script>
    (function() {
      function receiveMessage(e) {
        console.log("Received message:", e);
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({ token: tokenData.access_token, provider: 'github' }).replace(/'/g, "\\'")}',
          e.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      
      console.log("Sending init message to opener");
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script>
  <p>Authenticated successfully! This window should close automatically.</p>
</body>
</html>`;

    return res.status(200).setHeader('Content-Type', 'text/html').send(html);

  } catch (error) {
    console.error('OAuth handler error:', error.message);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
};
