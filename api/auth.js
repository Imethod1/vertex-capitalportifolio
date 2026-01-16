/**
 * GitHub OAuth Handler for Decap CMS
 * Handles authorization redirect, token exchange, and collaborator verification
 * Only allows repository collaborators with push/admin access
 */

const REPO_OWNER = 'Imethod1';
const REPO_NAME = 'vertex-capitalportifolio';

/**
 * Verify user is a collaborator with push/admin permissions on the repository
 */
async function verifyRepositoryAccess(accessToken) {
  try {
    // Get user info
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user info');
    }

    const userData = await userResponse.json();
    const username = userData.login;

    console.log(`Verifying access for user: ${username}`);

    // Check if user is a collaborator on the repository
    const collaboratorResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/collaborators/${username}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    // 204 = user is a collaborator, 404 = not a collaborator
    if (collaboratorResponse.status === 204) {
      // User is a collaborator - get their permission level
      const permissionResponse = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/collaborators/${username}/permission`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (permissionResponse.ok) {
        const permissionData = await permissionResponse.json();
        const permission = permissionData.permission; // 'pull', 'push', 'admin', 'maintain'

        console.log(`User ${username} has '${permission}' permission on repository`);

        // Allow 'push', 'admin', or 'maintain' permissions
        if (['push', 'admin', 'maintain'].includes(permission)) {
          console.log(`✅ User ${username} authorized to edit repository`);
          return {
            authorized: true,
            username,
            permission,
          };
        } else {
          console.log(`❌ User ${username} has insufficient permissions (${permission})`);
          return {
            authorized: false,
            username,
            permission,
            reason: `You have '${permission}' access. Push or admin access required.`,
          };
        }
      }
    } else if (collaboratorResponse.status === 404) {
      console.log(`❌ User ${username} is not a collaborator on the repository`);
      return {
        authorized: false,
        username,
        reason: 'You are not a collaborator on this repository.',
      };
    } else {
      throw new Error(`Unexpected response: ${collaboratorResponse.status}`);
    }
  } catch (error) {
    console.error('Error verifying repository access:', error.message);
    throw error;
  }
}

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
        'Accept': 'application/json',
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

    // Step 3: Verify user is a collaborator with push/admin access
    const accessVerification = await verifyRepositoryAccess(tokenData.access_token);

    if (!accessVerification.authorized) {
      console.log(`❌ Authorization denied for user ${accessVerification.username}`);
      const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Access Denied</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 40px; }
    .error { background: #fee; border: 1px solid #fcc; border-radius: 4px; padding: 20px; color: #c33; }
    h1 { color: #d32f2f; }
  </style>
</head>
<body>
  <div class="error">
    <h1>❌ Access Denied</h1>
    <p><strong>User:</strong> ${accessVerification.username}</p>
    <p><strong>Reason:</strong> ${accessVerification.reason}</p>
    <p>Only collaborators with push or admin access can edit this repository.</p>
    <p><a href="https://github.com/${REPO_OWNER}/${REPO_NAME}">Visit repository</a></p>
  </div>
</body>
</html>`;
      return res.status(403).setHeader('Content-Type', 'text/html').send(html);
    }

    console.log(`✅ Access granted for user ${accessVerification.username}`);

    // User is authorized - send token back to Decap CMS
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>GitHub Authentication Success</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 40px; }
    .success { background: #efe; border: 1px solid #cfc; border-radius: 4px; padding: 20px; color: #3c3; }
  </style>
</head>
<body>
  <div class="success">
    <p>✅ Authenticated as <strong>${accessVerification.username}</strong></p>
    <p>Permission level: <strong>${accessVerification.permission}</strong></p>
    <p>This window should close automatically...</p>
  </div>
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
