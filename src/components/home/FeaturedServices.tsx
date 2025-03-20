
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Bed, Bath, PawPrint, Users } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ServiceCard } from '../ui/ServiceCard';
import { services, getProvinces, filterServicesByLocation } from '@/data/mockServices';

export const FeaturedServices = () => {
  const [activeTab, setActiveTab] = useState<'hotels' | 'airbnb'>('hotels');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  
  // Guest and room options
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [acceptsPets, setAcceptsPets] = useState(false);
  const [guestsMenuOpen, setGuestsMenuOpen] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Short delay to simulate loading
    setTimeout(() => {
      // Get all services or filter by province if selected
      let allServices = services;
      
      if (selectedProvince) {
        allServices = filterServicesByLocation(allServices, selectedProvince);
      }
      
      // Filter by type (hotel or airbnb) and include lodges in airbnb results
      const typeFiltered = allServices.filter(service => {
        if (activeTab === 'hotels') {
          // For hotels tab, only include pure hotels (excluding those with 'lodge' in name)
          return service.type === 'hotel' && !service.name.toLowerCase().includes('lodge');
        } else {
          // For 'airbnb' tab, include both airbnb and hotels that have 'lodge' in their name
          return service.type === 'airbnb' || 
                (service.type === 'hotel' && service.name.toLowerCase().includes('lodge'));
        }
      });
      
      // Apply room filters
      const roomFiltered = typeFiltered.filter(service => {
        return (service.rooms >= rooms) && 
               (service.beds >= beds) && 
               (service.bathrooms >= bathrooms) && 
               (!acceptsPets || service.acceptsPets);
      });
      
      // Map to the format expected by ServiceCard
      const mappedServices = roomFiltered.map(service => ({
        id: service.id,
        type: service.type,
        title: service.name,
        location: service.location,
        province: service.province,
        district: service.district,
        image: service.images.length > 0 ? service.images[0] : '',
        rating: service.rating,
        pricePerNight: service.price,
        rooms: service.rooms || 1,
        beds: service.beds || 1,
        bathrooms: service.bathrooms || 1,
        acceptsPets: service.acceptsPets || false,
      })).slice(0, 3);
      
      setFilteredServices(mappedServices);
      setIsLoading(false);
    }, 500);
  }, [activeTab, selectedProvince, rooms, beds, bathrooms, acceptsPets]);
  
  const provinces = getProvinces();
  
  // Helper functions for guest count changes
  const decreaseGuests = () => {
    setGuests(Math.max(1, guests - 1));
  };

  const increaseGuests = () => {
    setGuests(Math.min(10, guests + 1));
  };

  // Helper functions for room options
  const decreaseRooms = () => {
    setRooms(Math.max(1, rooms - 1));
  };

  const increaseRooms = () => {
    setRooms(Math.min(5, rooms + 1));
  };

  // Helper functions for bed options
  const decreaseBeds = () => {
    setBeds(Math.max(1, beds - 1));
  };

  const increaseBeds = () => {
    setBeds(Math.min(4, beds + 1));
  };

  // Helper functions for bathroom options
  const decreaseBathrooms = () => {
    setBathrooms(Math.max(1, bathrooms - 1));
  };

  const increaseBathrooms = () => {
    setBathrooms(Math.min(3, bathrooms + 1));
  };
  
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
                Airbnb & Lodges
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

            {/* New Guests Dropdown with Room Options */}
            <DropdownMenu open={guestsMenuOpen} onOpenChange={setGuestsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{guests} Guest{guests !== 1 ? 's' : ''}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 p-4 bg-white">
                <DropdownMenuLabel>Guests & Room Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <div className="space-y-4 py-2">
                    <div>
                      <p className="text-sm mb-2">Number of guests</p>
                      <div className="flex border rounded">
                        <button 
                          className="px-3 py-1 border-r text-sm" 
                          onClick={(e) => {
                            e.preventDefault();
                            decreaseGuests();
                          }}
                        >
                          -
                        </button>
                        <div className="flex-grow text-center py-1 text-sm flex items-center justify-center">
                          <Users className="h-3.5 w-3.5 mr-1.5" />
                          {guests}
                        </div>
                        <button 
                          className="px-3 py-1 border-l text-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            increaseGuests();
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm mb-2">Number of rooms</p>
                      <div className="flex border rounded">
                        <button 
                          className="px-3 py-1 border-r text-sm" 
                          onClick={(e) => {
                            e.preventDefault();
                            decreaseRooms();
                          }}
                        >
                          -
                        </button>
                        <div className="flex-grow text-center py-1 text-sm flex items-center justify-center">
                          <Bed className="h-3.5 w-3.5 mr-1.5" />
                          {rooms}
                        </div>
                        <button 
                          className="px-3 py-1 border-l text-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            increaseRooms();
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm mb-2">Beds per room</p>
                      <div className="flex border rounded">
                        <button 
                          className="px-3 py-1 border-r text-sm" 
                          onClick={(e) => {
                            e.preventDefault();
                            decreaseBeds();
                          }}
                        >
                          -
                        </button>
                        <div className="flex-grow text-center py-1 text-sm flex items-center justify-center">
                          <Bed className="h-3.5 w-3.5 mr-1.5" />
                          {beds}
                        </div>
                        <button 
                          className="px-3 py-1 border-l text-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            increaseBeds();
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm mb-2">Number of bathrooms</p>
                      <div className="flex border rounded">
                        <button 
                          className="px-3 py-1 border-r text-sm" 
                          onClick={(e) => {
                            e.preventDefault();
                            decreaseBathrooms();
                          }}
                        >
                          -
                        </button>
                        <div className="flex-grow text-center py-1 text-sm flex items-center justify-center">
                          <Bath className="h-3.5 w-3.5 mr-1.5" />
                          {bathrooms}
                        </div>
                        <button 
                          className="px-3 py-1 border-l text-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            increaseBathrooms();
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Checkbox 
                        id="pet-friendly"
                        checked={acceptsPets}
                        onCheckedChange={() => setAcceptsPets(!acceptsPets)}
                        className="mr-2"
                      />
                      <label htmlFor="pet-friendly" className="text-sm flex items-center cursor-pointer">
                        <PawPrint className="h-3.5 w-3.5 mr-1.5" />
                        Pet-friendly
                      </label>
                    </div>
                    
                    <Button 
                      className="w-full mt-2" 
                      size="sm"
                      onClick={() => setGuestsMenuOpen(false)}
                    >
                      Apply
                    </Button>
                  </div>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
            View all {activeTab === 'airbnb' ? 'Airbnbs & Lodges' : activeTab}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
