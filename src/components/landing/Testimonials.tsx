
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      text: "SpotifyStats completely changed how I discover music. The insights are incredible!",
      stats: "15,000+ songs analyzed"
    },
    {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b494?w=100&h=100&fit=crop&crop=face",
      text: "I love seeing my music evolution over time. The visualizations are beautiful!",
      stats: "Active user for 2 years"
    },
    {
      name: "Mike Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      text: "The genre breakdown helped me understand my taste better than ever before.",
      stats: "Discovered 50+ new artists"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Loved by
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              {" "}Music Enthusiasts
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of users who've discovered their music DNA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-green-500/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-green-500 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-green-500/30"
                />
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-green-400 text-sm">{testimonial.stats}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 backdrop-blur-sm rounded-3xl p-12 border border-green-500/20 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to explore your music universe?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect your Spotify account and start discovering insights about your music taste in seconds
          </p>
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
