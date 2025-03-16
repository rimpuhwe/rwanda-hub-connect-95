
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ServiceCard } from '../ui/ServiceCard';

// Placeholder data
const FEATURED_SERVICES = {
  hotels: [
    {
      id: '1',
      type: 'hotel' as const,
      title: 'Kigali Marriott Hotel',
      location: 'Downtown Kigali',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925',
      rating: 4.8,
      pricePerNight: 250,
    },
    {
      id: '2',
      type: 'hotel' as const,
      title: 'Radisson Blu Hotel & Convention Centre',
      location: 'Kimihurura, Kigali',
      image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=2070',
      rating: 4.9,
      pricePerNight: 300,
    },
    {
      id: '3',
      type: 'hotel' as const,
      title: 'The Retreat by Heaven',
      location: 'Kiyovu, Kigali',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
      rating: 4.7,
      pricePerNight: 220,
    },
  ],
  airbnb: [
    {
      id: '1',
      type: 'airbnb' as const,
      title: 'Modern Studio with Lake Kivu View',
      location: 'Rubavu',
      image: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070',
      rating: 4.9,
      pricePerNight: 120,
    },
    {
      id: '2',
      type: 'airbnb' as const,
      title: 'Luxury Villa with Mountain Views',
      location: 'Musanze',
      image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1974',
      rating: 4.8,
      pricePerNight: 180,
    },
    {
      id: '3',
      type: 'airbnb' as const,
      title: 'Cozy Apartment in City Center',
      location: 'Nyarutarama, Kigali',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070',
      rating: 4.7,
      pricePerNight: 95,
    },
  ],
};

export const FeaturedServices = () => {
  const [activeTab, setActiveTab] = useState<'hotels' | 'airbnb'>('hotels');
  
  return (
    <section id="services" className="section-spacing bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <span className="block text-sm font-medium text-rwandan-blue mb-2">
              Trending Services
            </span>
            <h2 className="heading-2 text-gray-900">
              Featured Accommodations
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl">
              Discover our handpicked selection of the best hotels and Airbnbs across Rwanda,
              offering exceptional experiences for every traveler.
            </p>
          </div>
          
          <div className="inline-flex p-1 bg-gray-100 rounded-full">
            <button
              onClick={() => setActiveTab('hotels')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'hotels'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Hotels
            </button>
            <button
              onClick={() => setActiveTab('airbnb')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'airbnb'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Airbnb
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_SERVICES[activeTab].map((service) => (
            <ServiceCard
              key={`${service.type}-${service.id}`}
              {...service}
              className="animate-zoom-in"
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            to={`/services/${activeTab}`}
            className="btn-secondary inline-flex items-center"
          >
            View all {activeTab}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
