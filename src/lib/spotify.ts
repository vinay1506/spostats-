import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:3001';

export const spotifyService = {
  // Redirect to Spotify login
  login: () => {
    window.location.href = `${API_BASE_URL}/auth/login`;
  },

  // Get user profile
  getProfile: async () => {
    const response = await axios.get(`${API_BASE_URL}/api/me`, {
      withCredentials: true
    });
    return response.data;
  },

  // Get top tracks
  getTopTracks: async (timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term') => {
    const response = await axios.get(`${API_BASE_URL}/api/top-tracks`, {
      params: { time_range: timeRange },
      withCredentials: true
    });
    return response.data;
  },

  // Get top artists
  getTopArtists: async (timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term') => {
    const response = await axios.get(`${API_BASE_URL}/api/top-artists`, {
      params: { time_range: timeRange },
      withCredentials: true
    });
    return response.data;
  },

  // Get recently played
  getRecentlyPlayed: async () => {
    const response = await axios.get(`${API_BASE_URL}/api/recently-played`, {
      withCredentials: true
    });
    return response.data;
  }
}; 