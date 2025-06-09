import express from 'express';
import axios from 'axios';
import { Request, Response } from 'express';

const router = express.Router();
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

// Middleware to check if user is authenticated
const requireAuth = (req: Request, res: Response, next: express.NextFunction) => {
  if (!req.session.access_token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
};

// Helper function to make authenticated Spotify API calls
const spotifyRequest = async (access_token: string, endpoint: string) => {
  try {
    const response = await axios.get(`${SPOTIFY_API_BASE}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Spotify API error:', error);
    throw error;
  }
};

// Get user's top tracks
router.get('/top-tracks', requireAuth, async (req: Request, res: Response) => {
  try {
    const { time_range = 'medium_term', limit = 20 } = req.query;
    const data = await spotifyRequest(
      req.session.access_token!,
      `/me/top/tracks?time_range=${time_range}&limit=${limit}`
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top tracks' });
  }
});

// Get user's top artists
router.get('/top-artists', requireAuth, async (req: Request, res: Response) => {
  try {
    const { time_range = 'medium_term', limit = 20 } = req.query;
    const data = await spotifyRequest(
      req.session.access_token!,
      `/me/top/artists?time_range=${time_range}&limit=${limit}`
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top artists' });
  }
});

// Get user's recently played tracks
router.get('/recently-played', requireAuth, async (req: Request, res: Response) => {
  try {
    const { limit = 20 } = req.query;
    const data = await spotifyRequest(
      req.session.access_token!,
      `/me/player/recently-played?limit=${limit}`
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recently played tracks' });
  }
});

// Get current user's profile
router.get('/me', requireAuth, async (req: Request, res: Response) => {
  try {
    const data = await spotifyRequest(
      req.session.access_token!,
      '/me'
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

export const apiRouter = router; 