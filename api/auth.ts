import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async (req: VercelRequest, res: VercelResponse) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  const clientId = 'Ov23lifj7lCto8d0EHYT';
  const clientSecret = process.env.DECAP_CMS_GITHUB_APP_SECRET;

  try {
    // Exchange code for token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const tokenData: any = await tokenResponse.json();

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description });
    }

    // Return token to Decap CMS
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      token: tokenData.access_token,
      provider: 'github',
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
