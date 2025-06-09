# 🎵 Spostats - Your Spotify Statistics Dashboard

<div align="center">

![Spostats Dashboard](https://img.shields.io/badge/Spostats-Dashboard-1DB954?style=for-the-badge&logo=spotify&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

A modern, Spotify-inspired dashboard that provides detailed insights into your listening habits and music preferences.

</div>

## ✨ Features

- **📊 Comprehensive Statistics**
  - Daily and monthly listening time
  - Total tracks played
  - Unique artists count
  - Top genres analysis

- **🎵 Music Insights**
  - Top tracks with popularity metrics
  - Top artists with genre information
  - Recently played tracks with timestamps
  - Detailed track and artist analytics

- **🎨 Modern UI**
  - Spotify-inspired design
  - Responsive layout
  - Interactive components
  - Real-time updates
  - Clean and intuitive interface

- **🔒 Secure Authentication**
  - Spotify OAuth integration
  - Secure session management
  - Protected user data

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Spotify Developer Account
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/spostats.git
   cd spostats
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

4. Set up environment variables:
   - Create `.env` file in the backend directory:
     ```
     PORT=3001
     NODE_ENV=development
     SPOTIFY_CLIENT_ID=your_client_id
     SPOTIFY_CLIENT_SECRET=your_client_secret
     SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
     SESSION_SECRET=your_session_secret
     FRONTEND_URL=http://localhost:3000
     ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Frontend**
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - Shadcn/ui
  - React Router
  - Axios

- **Backend**
  - Node.js
  - Express
  - TypeScript
  - Spotify Web API
  - Session Management

## 📱 Features in Detail

### Dashboard Overview
- Real-time listening statistics
- Interactive data visualization
- Time-based filtering (4 weeks, 6 months, all time)
- Responsive design for all devices

### User Profile
- Spotify profile integration
- Listening activity status
- Follower count
- Profile customization

### Analytics
- Track popularity metrics
- Artist genre analysis
- Listening time trends
- Music preference insights

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spotify Web API for providing the data
- All contributors who have helped shape this project
- The open-source community for their amazing tools and libraries

## 📞 Support

If you have any questions or need help, please:
- Open an issue in the GitHub repository
- Contact the maintainers
- Check the documentation

---

<div align="center">
Made with ❤️ by [Your Name]
</div>