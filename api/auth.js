/**
 * GitHub OAuth Handler for Decap CMS
 * Standard Decap CMS authentication endpoint
 * Handles OAuth redirect and token exchange
 */

export default async (req, res) => {
  const clientId = 'Ov23lifj7lCto8d0EHYT';
  const clientSecret = process.env.DECAP_CMS_GITHUB_APP_SECRET;

  const code = req.query.code;

  // Step 1: If no code, redirect to GitHub OAuth
  if (!code) {
    const redirectUri = `${req.headers.origin || 'https://vertex-capitalportifolio.vercel.app'}/api/auth`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;
    
    console.log('Redirecting to GitHub:', githubAuthUrl);
    return res.redirect(githubAuthUrl);
  }

  // Step 2: Exchange code for access token
  if (!clientSecret) {
    console.error('Missing DECAP_CMS_GITHUB_APP_SECRET');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('GitHub OAuth error:', tokenData.error_description);
      return res.status(400).json({ error: tokenData.error_description });
    }

    if (!tokenData.access_token) {
      console.error('No access token from GitHub');
      return res.status(400).json({ error: 'Failed to obtain access token' });
    }

    console.log('✅ GitHub authentication successful');

    // Return token to Decap CMS
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Authorizing...</title>
</head>
<body>
  <p>Authorizing...</p>
  <script>
    (function() {
      function receiveMessage(e) {
        window.opener.postMessage(
          'authorization:github:success:' + JSON.stringify({ 
            token: '${tokenData.access_token}', 
            provider: 'github' 
          }).replace(/'/g, "\\\\'"),
          e.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script>
</body>
</html>`;

    return res.status(200).setHeader('Content-Type', 'text/html').send(html);

  } catch (error) {
    console.error('Auth error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};
