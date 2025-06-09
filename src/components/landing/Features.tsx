
import { BarChart3, Clock, Palette, Share2, TrendingUp, Music } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Top Artists & Tracks",
      description: "See your most played artists and songs across different time periods"
    },
    {
      icon: Palette,
      title: "Genre Analysis",
      description: "Discover your music taste with beautiful genre breakdowns and insights"
    },
    {
      icon: Clock,
      title: "Listening Patterns",
      description: "Analyze when and how much you listen with detailed time-based charts"
    },
    {
      icon: TrendingUp,
      title: "Trends & Growth",
      description: "Track how your music taste evolves over time with trend analysis"
    },
    {
      icon: Share2,
      title: "Social Sharing",
      description: "Create beautiful cards to share your music stats on social media"
    },
    {
      icon: Music,
      title: "Discover New Music",
      description: "Get personalized recommendations based on your listening habits"
    }
  ];

  return (
    <section id="features" className="py-20 px-6 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Features for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              {" "}Music Lovers
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to understand and share your unique music journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10"
            >
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl p-4 w-fit mb-6 group-hover:from-green-500/30 group-hover:to-green-600/30 transition-all duration-300">
                <feature.icon className="w-8 h-8 text-green-500" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-green-400 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
