
import { Button } from '@/components/ui/button';
import { Play, BarChart3, Users, Headphones } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Discover Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              {" "}Music DNA
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Dive deep into your Spotify listening habits. Uncover your top artists, tracks, and genres with beautiful visualizations that tell your unique music story.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
            >
              <Play className="w-5 h-5 mr-2" />
              Connect Your Spotify
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-8 py-4 text-lg rounded-full transition-all duration-300"
            >
              View Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <BarChart3 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Rich Analytics</h3>
              <p className="text-gray-400">Detailed insights into your listening patterns and music preferences</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Social Sharing</h3>
              <p className="text-gray-400">Share your music stats and discover what your friends are listening to</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Headphones className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Personal Insights</h3>
              <p className="text-gray-400">Understand your music taste evolution and get personalized recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
