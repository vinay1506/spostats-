import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/landing/Footer';
import Dashboard from '@/pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={
            <>
              <Navbar />
              <main>
                <Hero />
                <Features />
                <Testimonials />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
