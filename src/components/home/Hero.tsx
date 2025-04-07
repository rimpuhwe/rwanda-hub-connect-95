
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { services } from '@/data/mockServices';
import { toast } from 'sonner';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// Hero backgrounds - use high-quality images of Rwanda
const heroBackgrounds = [
  'https://images.unsplash.com/photo-1619549358771-8b61926b15f0?q=80&w=2070', // Kigali skyline
  'https://images.unsplash.com/photo-1612738072307-3432d829b6e1?q=80&w=2070', // Mountain gorillas
  'https://images.unsplash.com/photo-1614094082869-cd4e4b2905c7?q=80&w=2071'  // Lake Kivu
];

export const Hero = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.info("Please enter a search term");
      return;
    }
    
    setIsSearchOpen(true);
  };

  const handleSearchSelect = (value: string) => {
    setIsSearchOpen(false);
    
    // Navigate based on the search result category
    if (value.startsWith('hotel:') || value.startsWith('airbnb:')) {
      const [type, id] = value.split(':');
      navigate(`/services/${type}/${id}`);
    } else if (value.startsWith('blog:')) {
      const id = value.replace('blog:', '');
      navigate(`/blog/${id}`);
    } else if (value.startsWith('job:')) {
      const id = value.replace('job:', '');
      navigate(`/jobs/${id}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  const handleTraditionalSearch = () => {
    if (!searchQuery.trim()) {
      toast.info("Please enter a search term");
      return;
    }
    
    // Check if query exactly matches a service name (case insensitive)
    const exactMatch = services.find(
      service => service.name.toLowerCase() === searchQuery.toLowerCase()
    );
    
    if (exactMatch) {
      navigate(`/services/${exactMatch.type}/${exactMatch.id}`);
      return;
    }
    
    // Check for location search: "hotels in [location]" or "airbnb in [location]"
    const hotelLocationMatch = searchQuery.toLowerCase().match(/hotels?\s+in\s+(.+)/i);
    const airbnbLocationMatch = searchQuery.toLowerCase().match(/airbnbs?\s+in\s+(.+)/i);
    const lodgeLocationMatch = searchQuery.toLowerCase().match(/lodges?\s+in\s+(.+)/i);
    
    if (hotelLocationMatch) {
      const location = hotelLocationMatch[1].trim();
      navigate(`/services/hotel?location=${encodeURIComponent(location)}`);
      return;
    }
    
    if (airbnbLocationMatch || lodgeLocationMatch) {
      const location = (airbnbLocationMatch ? airbnbLocationMatch[1] : lodgeLocationMatch![1]).trim();
      navigate(`/services/airbnb?location=${encodeURIComponent(location)}`);
      return;
    }
    
    // General search - navigate to services page with search query
    navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
  };

  // Define content for each slide
  const heroContent = [
    {
      headline: "Discover the Land of a Thousand Hills",
      subheading: "Explore Rwanda's breathtaking landscapes and vibrant culture",
      ctaText: "Plan Your Trip",
      ctaLink: "/services"
    },
    {
      headline: "Meet Rwanda's Mountain Gorillas",
      subheading: "Experience unforgettable wildlife encounters in Volcanoes National Park",
      ctaText: "Book a Safari",
      ctaLink: "/services/tours"
    },
    {
      headline: "Relax in Rwanda's Scenic Beauty",
      subheading: "Discover pristine lakes, lush forests, and stunning vistas",
      ctaText: "Find Accommodations",
      ctaLink: "/services/hotels"
    }
  ];
  
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
      <div className="container relative z-20 px-4 sm:px-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl mx-auto text-center">
          {/* Dynamic content based on current slide */}
          <span className="animate-fade-up opacity-0 animation-delay-100 inline-block bg-white/10 backdrop-blur-sm text-white text-sm font-medium py-1 px-3 rounded-full mb-4">
            Explore Rwanda
          </span>
          
          <h1 className="animate-fade-up opacity-0 animation-delay-200 font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            {heroContent[currentBgIndex].headline}
          </h1>
          
          <p className="animate-fade-up opacity-0 animation-delay-300 text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {heroContent[currentBgIndex].subheading}
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="animate-fade-up opacity-0 animation-delay-400 w-full max-w-2xl mx-auto mb-10">
            <div className="relative flex items-center glass p-2 rounded-full shadow-lg">
              <input
                type="text"
                placeholder="Search for hotels, experiences, or destinations..."
                className="w-full bg-transparent border-none outline-none py-3 px-6 text-white placeholder-white/70"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={() => setIsSearchOpen(true)}
              />
              <button 
                type="button"
                onClick={handleTraditionalSearch}
                className="absolute right-2 rounded-full bg-rwandan-green text-white p-3 hover:bg-rwandan-green/90 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* CTA buttons */}
          <div className="animate-fade-up opacity-0 animation-delay-500 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <a
              href={heroContent[currentBgIndex].ctaLink}
              className="group btn-primary text-base py-3 px-8 font-semibold flex items-center space-x-2"
            >
              <span>{heroContent[currentBgIndex].ctaText}</span>
              <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#featured-destinations"
              className="btn-secondary bg-white/10 border-white text-white hover:bg-white/20 text-base py-3 px-8 font-semibold"
            >
              Explore Destinations
            </a>
          </div>
        </div>

        {/* Featured categories quick navigation */}
        <div className="absolute bottom-20 left-0 right-0 z-30">
          <div className="container px-4 sm:px-6">
            <div className="w-full max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href="/services/hotels" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all transform hover:-translate-y-1 duration-300">
                  <div className="text-white font-medium mb-1">Hotels</div>
                  <div className="text-white/70 text-sm">Find your perfect stay</div>
                </a>
                <a href="/services/airbnb" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all transform hover:-translate-y-1 duration-300">
                  <div className="text-white font-medium mb-1">Vacation Rentals</div>
                  <div className="text-white/70 text-sm">Homes & private stays</div>
                </a>
                <a href="/services/tours" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all transform hover:-translate-y-1 duration-300">
                  <div className="text-white font-medium mb-1">Tours & Activities</div>
                  <div className="text-white/70 text-sm">Unforgettable experiences</div>
                </a>
                <a href="/services/dining" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all transform hover:-translate-y-1 duration-300">
                  <div className="text-white font-medium mb-1">Restaurants</div>
                  <div className="text-white/70 text-sm">Taste local cuisine</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {heroBackgrounds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBgIndex(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              index === currentBgIndex ? "bg-white w-8" : "bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput 
          placeholder="Search for accommodations, activities, destinations..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Hotels">
            <CommandItem onSelect={() => handleSearchSelect('hotel:hotel-1')}>
              <div className="flex flex-col">
                <span>Kigali Marriott Hotel</span>
                <span className="text-xs text-gray-500">Kigali City Center</span>
              </div>
            </CommandItem>
            <CommandItem onSelect={() => handleSearchSelect('hotel:hotel-2')}>
              <div className="flex flex-col">
                <span>Serena Hotel Rwanda</span>
                <span className="text-xs text-gray-500">Kiyovu, Kigali</span>
              </div>
            </CommandItem>
          </CommandGroup>
          
          <CommandGroup heading="Airbnbs">
            <CommandItem onSelect={() => handleSearchSelect('airbnb:airbnb-1')}>
              <div className="flex flex-col">
                <span>Modern Lake Kivu Villa</span>
                <span className="text-xs text-gray-500">Rubavu, Lake Kivu</span>
              </div>
            </CommandItem>
            <CommandItem onSelect={() => handleSearchSelect('airbnb:airbnb-2')}>
              <div className="flex flex-col">
                <span>Cozy Musanze Cottage</span>
                <span className="text-xs text-gray-500">Musanze, Northern Province</span>
              </div>
            </CommandItem>
          </CommandGroup>
          
          <CommandGroup heading="Popular Destinations">
            <CommandItem onSelect={() => navigate('/about/kigali')}>
              <div className="flex flex-col">
                <span>Kigali</span>
                <span className="text-xs text-gray-500">Rwanda's capital city</span>
              </div>
            </CommandItem>
            <CommandItem onSelect={() => navigate('/about/volcanoes-national-park')}>
              <div className="flex flex-col">
                <span>Volcanoes National Park</span>
                <span className="text-xs text-gray-500">Home to mountain gorillas</span>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};
