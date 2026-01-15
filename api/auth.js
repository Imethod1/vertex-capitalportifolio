/**
 * GitHub OAuth Handler for Decap CMS
 * Exchanges authorization code for GitHub access token
 */

export default async (req, res) => {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  const clientId = 'Ov23lifj7lCto8d0EHYT';
  const clientSecret = process.env.DECAP_CMS_GITHUB_APP_SECRET;

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
        'Accept': 'application/vnd.github.v3+json',
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

    // Return token to Decap CMS
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      token: tokenData.access_token,
      provider: 'github',
    });

  } catch (error) {
    console.error('OAuth handler error:', error.message);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
};
