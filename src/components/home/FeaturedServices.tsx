
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin } from 'lucide-react';
import { ServiceCard } from '../ui/ServiceCard';
import { services } from '@/data/mockServices';

export const FeaturedServices = () => {
  const [activeTab, setActiveTab] = useState<'hotels' | 'airbnb'>('hotels');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  
  // Map services to match ServiceCard props format
  const mappedServices = {
    hotels: services
      .filter(service => service.type === 'hotel')
      .map(service => ({
        id: service.id,
        type: service.type,
        title: service.name,
        location: service.location,
        province: service.province,
        district: service.district,
        image: service.images[0],
        rating: service.rating,
        pricePerNight: service.price,
        rooms: service.rooms,
        beds: service.beds,
        bathrooms: service.bathrooms,
        acceptsPets: service.acceptsPets,
      })).slice(0, 3),
    airbnb: services
      .filter(service => service.type === 'airbnb')
      .map(service => ({
        id: service.id,
        type: service.type,
        title: service.name,
        location: service.location,
        province: service.province,
        district: service.district,
        image: service.images[0],
        rating: service.rating,
        pricePerNight: service.price,
        rooms: service.rooms,
        beds: service.beds,
        bathrooms: service.bathrooms,
        acceptsPets: service.acceptsPets,
      })).slice(0, 3),
  };
  
  // Filter services by province if selected
  const filteredServices = selectedProvince 
    ? mappedServices[activeTab].filter(service => 
        service.province === selectedProvince
      )
    : mappedServices[activeTab];
  
  // Get unique provinces from all services
  const provinces = [...new Set(services.map(service => service.province))];
  
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
          
          <div className="space-y-4">
            <div className="inline-flex p-1 bg-gray-100 rounded-full">
              <button
                onClick={() => {
                  setActiveTab('hotels');
                  setSelectedProvince(null);
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'hotels'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Hotels
              </button>
              <button
                onClick={() => {
                  setActiveTab('airbnb');
                  setSelectedProvince(null);
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'airbnb'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Airbnb
              </button>
            </div>
            
            {/* Province filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedProvince(null)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedProvince === null
                    ? 'bg-rwandan-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Provinces
              </button>
              
              {provinces.map(province => (
                <button
                  key={province}
                  onClick={() => setSelectedProvince(province)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center ${
                    selectedProvince === province
                      ? 'bg-rwandan-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  {province}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard
              key={`${service.type}-${service.id}`}
              {...service}
              className="animate-zoom-in"
            />
          ))}
          
          {filteredServices.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500">No accommodations found in this province.</p>
              <button 
                onClick={() => setSelectedProvince(null)}
                className="mt-4 text-rwandan-blue hover:underline"
              >
                View all provinces
              </button>
            </div>
          )}
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
