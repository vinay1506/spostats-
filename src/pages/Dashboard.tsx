import { useEffect, useState } from 'react';
import { spotifyService } from '@/lib/spotify';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Clock, 
  Music, 
  Users, 
  Calendar, 
  Headphones, 
  Activity, 
  PlayCircle, 
  Heart, 
  Disc, 
  Radio,
  BarChart3,
  TrendingUp,
  Clock4,
  Timer,
  Music2,
  UserPlus,
  Sparkles,
  Star,
  Crown
} from 'lucide-react';

interface Profile {
  display_name: string;
  images: { url: string }[];
  followers: { total: number };
}

interface Track {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[]; name: string };
  duration_ms: number;
  played_at?: string;
  popularity?: number;
}

interface Artist {
  name: string;
  images: { url: string }[];
  genres: string[];
  popularity: number;
}

interface Stats {
  todayMinutes: number;
  monthMinutes: number;
  totalTracks: number;
  uniqueArtists: number;
  topGenre: string;
  averageDailyMinutes: number;
}

const Dashboard = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  const [stats, setStats] = useState<Stats>({
    todayMinutes: 0,
    monthMinutes: 0,
    totalTracks: 0,
    uniqueArtists: 0,
    topGenre: '',
    averageDailyMinutes: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTimeRange, setActiveTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('medium_term');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, tracksData, artistsData, recentData] = await Promise.all([
          spotifyService.getProfile(),
          spotifyService.getTopTracks(activeTimeRange),
          spotifyService.getTopArtists(activeTimeRange),
          spotifyService.getRecentlyPlayed()
        ]);

        setProfile(profileData);
        setTopTracks(tracksData.items);
        setTopArtists(artistsData.items);
        setRecentlyPlayed(recentData.items.map((item: any) => item.track));

        // Calculate stats
        const today = new Date();
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        
        const todayTracks = recentData.items.filter((item: any) => {
          const playedAt = new Date(item.played_at);
          return playedAt.toDateString() === today.toDateString();
        });

        const monthTracks = recentData.items.filter((item: any) => {
          const playedAt = new Date(item.played_at);
          return playedAt >= monthStart;
        });

        const uniqueArtists = new Set(recentData.items.map((item: any) => item.track.artists[0].name)).size;
        
        // Calculate top genre
        const genreCount = new Map<string, number>();
        artistsData.items.forEach((artist: Artist) => {
          artist.genres.forEach(genre => {
            genreCount.set(genre, (genreCount.get(genre) || 0) + 1);
          });
        });
        const topGenre = Array.from(genreCount.entries())
          .sort((a, b) => b[1] - a[1])[0]?.[0] || '';

        setStats({
          todayMinutes: Math.round(todayTracks.reduce((acc: number, item: any) => acc + item.track.duration_ms, 0) / 60000),
          monthMinutes: Math.round(monthTracks.reduce((acc: number, item: any) => acc + item.track.duration_ms, 0) / 60000),
          totalTracks: recentData.items.length,
          uniqueArtists,
          topGenre,
          averageDailyMinutes: Math.round(monthTracks.reduce((acc: number, item: any) => acc + item.track.duration_ms, 0) / 60000 / today.getDate())
        });
      } catch (err) {
        setError('Failed to load data. Please try logging in again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTimeRange]);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-6 p-8 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500/20 border-t-green-500"></div>
            <Headphones className="h-8 w-8 text-green-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-400 text-lg font-medium">Loading your music stats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-6 p-8 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 max-w-md">
          <div className="relative">
            <div className="h-16 w-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
              <Headphones className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <p className="text-red-400 font-medium text-lg">{error}</p>
          <Button 
            onClick={() => spotifyService.login()} 
            className="bg-green-500 hover:bg-green-600 px-8 py-6 text-lg rounded-full shadow-lg shadow-green-500/20 transition-all hover:shadow-green-500/40"
          >
            <Headphones className="mr-2 h-5 w-5" />
            Connect with Spotify
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#121212] border-b border-[#535353]">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Music2 className="h-8 w-8 text-[#1db954]" />
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Spostats
              </h1>
            </div>
            <div className="h-6 w-px bg-[#535353]" />
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-[#b3b3b3] hover:text-white transition-colors">
                Home
              </a>
              <a href="/dashboard" className="text-white font-medium">
                Dashboard
              </a>
              <a href="/about" className="text-[#b3b3b3] hover:text-white transition-colors">
                About
              </a>
            </nav>
          </div>
          {profile && (
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-[#b3b3b3]">
                <Activity className="h-4 w-4" />
                <span className="text-sm">Active Now</span>
              </div>
              <div className="h-6 w-px bg-[#535353]" />
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8 border border-[#535353]">
                  <AvatarImage src={profile.images[0]?.url} />
                  <AvatarFallback className="bg-[#1db954] text-white">
                    {profile.display_name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-white hidden md:inline">
                  {profile.display_name}
                </span>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Profile Section */}
        {profile && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 bg-[#212121] p-8 rounded-lg">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-28 w-28 border-2 border-[#1db954] shadow-lg relative">
                  <AvatarImage src={profile.images[0]?.url} />
                  <AvatarFallback className="bg-[#1db954] text-white text-4xl">
                    {profile.display_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-[#1db954] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg border-2 border-[#121212]">
                  <Activity className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold text-white">
                  {profile.display_name}
                </h1>
                <p className="text-[#b3b3b3] flex items-center mt-3 text-xl">
                  <Users className="h-6 w-6 mr-2 text-[#1db954]" />
                  {profile.followers.total.toLocaleString()} followers
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={activeTimeRange === 'short_term' ? 'default' : 'outline'}
                onClick={() => setActiveTimeRange('short_term')}
                className={`${
                  activeTimeRange === 'short_term' 
                    ? 'bg-[#1db954] hover:bg-[#1db954]/90 text-black' 
                    : 'bg-transparent hover:bg-[#535353] text-white border-[#535353]'
                } rounded-full px-6 py-3 text-base transition-all`}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Last 4 Weeks
              </Button>
              <Button
                variant={activeTimeRange === 'medium_term' ? 'default' : 'outline'}
                onClick={() => setActiveTimeRange('medium_term')}
                className={`${
                  activeTimeRange === 'medium_term' 
                    ? 'bg-[#1db954] hover:bg-[#1db954]/90 text-black' 
                    : 'bg-transparent hover:bg-[#535353] text-white border-[#535353]'
                } rounded-full px-6 py-3 text-base transition-all`}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Last 6 Months
              </Button>
              <Button
                variant={activeTimeRange === 'long_term' ? 'default' : 'outline'}
                onClick={() => setActiveTimeRange('long_term')}
                className={`${
                  activeTimeRange === 'long_term' 
                    ? 'bg-[#1db954] hover:bg-[#1db954]/90 text-black' 
                    : 'bg-transparent hover:bg-[#535353] text-white border-[#535353]'
                } rounded-full px-6 py-3 text-base transition-all`}
              >
                <Calendar className="h-5 w-5 mr-2" />
                All Time
              </Button>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Card className="bg-[#212121] border-[#535353] hover:bg-[#282828] transition-all duration-300 group">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#b3b3b3] flex items-center">
                <Clock4 className="h-5 w-5 mr-2 text-[#1db954]" />
                Today's Listening
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">
                {formatDuration(stats.todayMinutes)}
              </div>
              <p className="text-sm text-[#b3b3b3] mt-2">Total listening time today</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#b3b3b3]">
                  <span>Daily Goal</span>
                  <span>{Math.min(Math.round((stats.todayMinutes / 120) * 100), 100)}%</span>
                </div>
                <div className="h-2 w-full bg-[#535353] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#1db954] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((stats.todayMinutes / 120) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#212121] border-[#535353] hover:bg-[#282828] transition-all duration-300 group">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#b3b3b3] flex items-center">
                <Timer className="h-5 w-5 mr-2 text-[#1db954]" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">
                {formatDuration(stats.monthMinutes)}
              </div>
              <p className="text-sm text-[#b3b3b3] mt-2">Total listening time this month</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#b3b3b3]">
                  <span>Daily Average</span>
                  <span>{formatDuration(stats.averageDailyMinutes)}</span>
                </div>
                <div className="h-2 w-full bg-[#535353] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#1db954] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((stats.averageDailyMinutes / 180) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#212121] border-[#535353] hover:bg-[#282828] transition-all duration-300 group">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#b3b3b3] flex items-center">
                <Music2 className="h-5 w-5 mr-2 text-[#1db954]" />
                Tracks Played
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">
                {stats.totalTracks.toLocaleString()}
              </div>
              <p className="text-sm text-[#b3b3b3] mt-2">Total tracks in your history</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#b3b3b3]">
                  <span>Collection Size</span>
                  <span>{Math.min(Math.round((stats.totalTracks / 10000) * 100), 100)}%</span>
                </div>
                <div className="h-2 w-full bg-[#535353] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#1db954] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((stats.totalTracks / 10000) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#212121] border-[#535353] hover:bg-[#282828] transition-all duration-300 group">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#b3b3b3] flex items-center">
                <UserPlus className="h-5 w-5 mr-2 text-[#1db954]" />
                Unique Artists
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">
                {stats.uniqueArtists.toLocaleString()}
              </div>
              <p className="text-sm text-[#b3b3b3] mt-2">Different artists you've listened to</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#b3b3b3]">
                  <span>Top Genre</span>
                  <span className="text-[#1db954]">{stats.topGenre}</span>
                </div>
                <div className="h-2 w-full bg-[#535353] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#1db954] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((stats.uniqueArtists / 1000) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <div>
          <Tabs defaultValue="tracks" className="space-y-6">
            <TabsList className="bg-[#212121] p-1.5 rounded-lg border border-[#535353]">
              <TabsTrigger 
                value="tracks" 
                className="data-[state=active]:bg-[#1db954] data-[state=active]:text-black rounded-lg px-6 py-2.5 transition-all text-[#b3b3b3] hover:text-white"
              >
                <Music className="h-5 w-5 mr-2" />
                Top Tracks
              </TabsTrigger>
              <TabsTrigger 
                value="artists" 
                className="data-[state=active]:bg-[#1db954] data-[state=active]:text-black rounded-lg px-6 py-2.5 transition-all text-[#b3b3b3] hover:text-white"
              >
                <Users className="h-5 w-5 mr-2" />
                Top Artists
              </TabsTrigger>
              <TabsTrigger 
                value="recent" 
                className="data-[state=active]:bg-[#1db954] data-[state=active]:text-black rounded-lg px-6 py-2.5 transition-all text-[#b3b3b3] hover:text-white"
              >
                <Radio className="h-5 w-5 mr-2" />
                Recently Played
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tracks">
              <Card className="bg-[#212121] border-[#535353]">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Your Top Tracks</CardTitle>
                  <CardDescription className="text-[#b3b3b3]">
                    Your most played tracks {activeTimeRange === 'short_term' ? 'in the last 4 weeks' : activeTimeRange === 'medium_term' ? 'in the last 6 months' : 'of all time'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-3">
                      {topTracks.map((track, index) => (
                        <div
                          key={track.name}
                          className="group flex items-center space-x-4 p-4 hover:bg-[#282828] rounded-lg transition-all duration-300"
                        >
                          <div className="relative">
                            <span className="text-2xl font-bold text-[#b3b3b3] w-8 group-hover:text-white transition-colors">
                              {index + 1}
                            </span>
                            {index < 3 && (
                              <Crown className="h-4 w-4 text-[#1db954] absolute -top-2 -right-2" />
                            )}
                          </div>
                          <img
                            src={track.album.images[2]?.url}
                            alt={track.name}
                            className="h-16 w-16 rounded shadow-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-lg truncate text-white group-hover:text-[#1db954] transition-colors">
                              {track.name}
                            </p>
                            <p className="text-sm text-[#b3b3b3] truncate">
                              {track.artists.map(a => a.name).join(', ')} • {track.album.name}
                            </p>
                            {track.popularity && (
                              <div className="mt-2 flex items-center space-x-2">
                                <TrendingUp className="h-4 w-4 text-[#1db954]" />
                                <div className="h-1.5 w-24 bg-[#535353] rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#1db954] rounded-full"
                                    style={{ width: `${track.popularity}%` }}
                                  />
                                </div>
                                <span className="text-xs text-[#b3b3b3]">{track.popularity}%</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm text-[#b3b3b3] bg-[#535353] px-3 py-1.5 rounded-full">
                              {Math.floor(track.duration_ms / 60000)}:{(track.duration_ms % 60000 / 1000).toFixed(0).padStart(2, '0')}
                            </div>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity text-[#b3b3b3] hover:text-white">
                              <PlayCircle className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="artists">
              <Card className="bg-[#212121] border-[#535353]">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Your Top Artists</CardTitle>
                  <CardDescription className="text-[#b3b3b3]">
                    Your most listened artists {activeTimeRange === 'short_term' ? 'in the last 4 weeks' : activeTimeRange === 'medium_term' ? 'in the last 6 months' : 'of all time'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {topArtists.map((artist, index) => (
                        <div
                          key={artist.name}
                          className="group relative flex flex-col items-center p-6 hover:bg-[#282828] rounded-lg transition-all duration-300"
                        >
                          <div className="relative">
                            <img
                              src={artist.images[0]?.url}
                              alt={artist.name}
                              className="h-44 w-44 rounded-full shadow-lg relative"
                            />
                            <div className="absolute -top-2 -right-2 bg-[#1db954] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg border-2 border-[#121212]">
                              {index < 3 ? (
                                <Crown className="h-5 w-5" />
                              ) : (
                                <span>{index + 1}</span>
                              )}
                            </div>
                          </div>
                          <div className="mt-4 text-center">
                            <p className="font-medium text-xl text-white group-hover:text-[#1db954] transition-colors">
                              {artist.name}
                            </p>
                            <p className="text-sm text-[#b3b3b3] mt-1">
                              {artist.genres.slice(0, 2).join(', ')}
                            </p>
                            <div className="mt-4 space-y-2">
                              <div className="flex items-center justify-between text-xs text-[#b3b3b3]">
                                <span>Popularity</span>
                                <span>{artist.popularity}%</span>
                              </div>
                              <div className="h-2 w-full bg-[#535353] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#1db954] rounded-full transition-all duration-500"
                                  style={{ width: `${artist.popularity}%` }}
                                />
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#b3b3b3] hover:text-white"
                            >
                              <Radio className="h-4 w-4 mr-2" />
                              View Artist
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recent">
              <Card className="bg-[#212121] border-[#535353]">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Recently Played</CardTitle>
                  <CardDescription className="text-[#b3b3b3]">
                    Your latest listening activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-3">
                      {recentlyPlayed.map((track, index) => (
                        <div
                          key={`${track.name}-${index}`}
                          className="group flex items-center space-x-4 p-4 hover:bg-[#282828] rounded-lg transition-all duration-300"
                        >
                          <span className="text-2xl font-bold text-[#b3b3b3] w-8 group-hover:text-white transition-colors">
                            {index + 1}
                          </span>
                          <img
                            src={track.album.images[2]?.url}
                            alt={track.name}
                            className="h-16 w-16 rounded shadow-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-lg truncate text-white group-hover:text-[#1db954] transition-colors">
                              {track.name}
                            </p>
                            <p className="text-sm text-[#b3b3b3] truncate">
                              {track.artists.map(a => a.name).join(', ')} • {track.album.name}
                            </p>
                            {track.played_at && (
                              <p className="text-xs text-[#b3b3b3] mt-1 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {new Date(track.played_at).toLocaleString()}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm text-[#b3b3b3] bg-[#535353] px-3 py-1.5 rounded-full">
                              {Math.floor(track.duration_ms / 60000)}:{(track.duration_ms % 60000 / 1000).toFixed(0).padStart(2, '0')}
                            </div>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity text-[#b3b3b3] hover:text-white">
                              <PlayCircle className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 