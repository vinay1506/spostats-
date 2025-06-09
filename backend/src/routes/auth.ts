import express from 'express';
import axios from 'axios';
import { Request, Response } from 'express';

const router = express.Router();

// Spotify OAuth endpoints
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

// Login route - redirects to Spotify
router.get('/login', (req: Request, res: Response) => {
  const scope = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-read-recently-played'
  ].join(' ');

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    scope: scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    show_dialog: 'true'
  });

  res.redirect(`${SPOTIFY_AUTH_URL}?${params.toString()}`);
});

// Callback route - handles the OAuth callback
router.get('/callback', async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(SPOTIFY_TOKEN_URL, 
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI!
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString('base64')}`
        }
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Store tokens in session
    req.session.access_token = access_token;
    req.session.refresh_token = refresh_token;
    req.session.token_expires_at = Date.now() + (expires_in * 1000);

    // Redirect to frontend with success
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    console.error('Error during token exchange:', error);
    res.redirect(`${process.env.FRONTEND_URL}/error`);
  }
});

// Logout route
router.get('/logout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.redirect(process.env.FRONTEND_URL!);
  });
});

// Refresh token route
router.post('/refresh', async (req: Request, res: Response) => {
  const refresh_token = req.session.refresh_token;

  if (!refresh_token) {
    return res.status(401).json({ error: 'No refresh token available' });
  }

  try {
    const response = await axios.post(SPOTIFY_TOKEN_URL,
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString('base64')}`
        }
      }
    );

    const { access_token, expires_in } = response.data;
    
    req.session.access_token = access_token;
    req.session.token_expires_at = Date.now() + (expires_in * 1000);

    res.json({ access_token });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Could not refresh token' });
  }
});

export const authRouter = router; 