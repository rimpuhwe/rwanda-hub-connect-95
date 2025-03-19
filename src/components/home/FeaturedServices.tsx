import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin } from 'lucide-react';
import { ServiceCard } from '../ui/ServiceCard';
import { services } from '@/data/mockServices';
import { fetchAccommodations, mapPlaceToService, PlaceResult } from '@/services/placesApi';

export const FeaturedServices = () => {
  const [activeTab, setActiveTab] = useState<'hotels' | 'airbnb'>('hotels');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [googleServices, setGoogleServices] = useState<any[]>([]);
  
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
  
  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const province = selectedProvince || 'Rwanda';
        const results = await fetchAccommodations(province);
        
        const mappedPlaces = results.map(place => 
          mapPlaceToService(place, activeTab === 'hotels' ? 'hotel' : 'airbnb')
        );
        
        const filteredPlaces = mappedPlaces
          .filter(place => activeTab === 'hotels' 
            ? place.type === 'hotel' 
            : place.type === 'airbnb')
          .slice(0, 3);
        
        setGoogleServices(filteredPlaces);
      } catch (error) {
        console.error('Failed to fetch places:', error);
        setGoogleServices([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchServices();
  }, [activeTab, selectedProvince]);
  
  const filteredServices = googleServices.length > 0 
    ? googleServices 
    : mappedServices[activeTab];
  
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
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="rounded-xl overflow-hidden">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          ) : filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard
                key={`${service.type}-${service.id}`}
                {...service}
                className="animate-zoom-in"
              />
            ))
          ) : (
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
