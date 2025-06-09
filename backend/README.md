# Spostats Backend

Backend server for the Spostats application, handling Spotify OAuth authentication and API requests.

## Features

- Spotify OAuth authentication
- Session management
- API endpoints for:
  - Top tracks
  - Top artists
  - Recently played tracks
  - User profile

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Spotify Developer Account with a registered application

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   NODE_ENV=development
   SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   SPOTIFY_REDIRECT_URI=http://localhost:3000/auth/callback
   SESSION_SECRET=your_session_secret_here
   FRONTEND_URL=http://localhost:5173
   ```

## Development

Start the development server:
```bash
npm run dev
```

## Production

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### Authentication
- `GET /auth/login` - Redirects to Spotify login
- `GET /auth/callback` - Handles Spotify OAuth callback
- `GET /auth/logout` - Logs out the user
- `POST /auth/refresh` - Refreshes the access token

### API
- `GET /api/top-tracks` - Get user's top tracks
- `GET /api/top-artists` - Get user's top artists
- `GET /api/recently-played` - Get user's recently played tracks
- `GET /api/me` - Get current user's profile

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 500: Server Error

## Security

- All API endpoints (except login) require authentication
- Session-based authentication
- Secure cookie handling
- CORS enabled for frontend domain
- Environment variables for sensitive data 