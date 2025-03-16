
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

// Placeholder hero backgrounds
const heroBackgrounds = [
  'https://images.unsplash.com/photo-1619549358771-8b61926b15f0?q=80&w=2070',
  'https://images.unsplash.com/photo-1612738072307-3432d829b6e1?q=80&w=2070',
  'https://images.unsplash.com/photo-1614094082869-cd4e4b2905c7?q=80&w=2071'
];

export const Hero = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Background images with crossfade */}
      {heroBackgrounds.map((bg, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
            index === currentBgIndex ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
      
      {/* Content */}
      <div className="container relative z-20 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block animate-fade-up bg-white/10 backdrop-blur-sm text-white text-sm font-medium py-1 px-3 rounded-full mb-4">
            Discover Rwanda
          </span>
          
          <h1 className="animate-fade-up font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Explore <span className="text-rwandan-accent">Rwanda's</span> Finest Services
            <br />in One Place
          </h1>
          
          <p className="animate-fade-up text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Your gateway to hotels, accommodations, and experiences in the heart of East Africa
          </p>

          {/* Search bar */}
          <div className="animate-fade-up max-w-2xl mx-auto mb-10">
            <div className="relative flex items-center glass p-2 rounded-full">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search for hotels, Airbnbs, or experiences..."
                  className="w-full bg-transparent border-none outline-none py-3 px-6 text-white placeholder-white/70"
                />
              </div>
              <button className="absolute right-2 rounded-full bg-rwandan-blue text-white p-3 hover:bg-rwandan-blue/90 transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="animate-fade-up flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <a
              href="#services"
              className="btn-primary text-base py-3 px-8 font-semibold"
            >
              Book Now
            </a>
            <a
              href="#about"
              className="btn-secondary bg-white/10 border-white text-white hover:bg-white/20 text-base py-3 px-8 font-semibold"
            >
              Explore Rwanda
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/80 rounded-full animate-[fade-in_1.5s_infinite_alternate]"></div>
        </div>
      </div>
    </div>
  );
};
