
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  getServicesByType, 
  getProvinces, 
  getDistrictsByProvince, 
  filterServicesByLocation, 
  Service 
} from '@/data/mockServices';
import { format } from 'date-fns';
import { MapPin, Star, Search, Filter, Calendar as CalendarIcon, Wifi, Utensils, Tv, Car, Heart, Users, Bed, Bath, PawPrint } from 'lucide-react';
import { toast } from "sonner";

const ServicesPage = () => {
  const { type } = useParams();
  const [activeTab, setActiveTab] = useState<string>(type || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  } | undefined>(undefined);
  const [guests, setGuests] = useState(2);
  const [province, setProvince] = useState<string>('all');
  const [district, setDistrict] = useState<string>('all');
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  // Room options state
  const [rooms, setRooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [acceptsPets, setAcceptsPets] = useState(false);

  // Get provinces for filter
  const provinces = getProvinces();

  useEffect(() => {
    const allServices = getServicesByType(activeTab === 'all' ? undefined : activeTab);
    setServices(allServices);
    setFilteredServices(allServices);
  }, [activeTab]);

  // Update available districts when province changes
  useEffect(() => {
    if (province !== 'all') {
      const districts = getDistrictsByProvince(province);
      setAvailableDistricts(districts);

      // Reset district if the current one is not in the new province
      if (district !== 'all' && !districts.includes(district)) {
        setDistrict('all');
      }
    } else {
      setAvailableDistricts([]);
      setDistrict('all');
    }
  }, [province, district]);

  useEffect(() => {
    let filtered = [...services];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        service => 
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(
      service => service.price >= priceRange[0] && service.price <= priceRange[1]
    );
    
    // Filter by province and district
    if (province !== 'all' || district !== 'all') {
      filtered = filterServicesByLocation(
        filtered, 
        province === 'all' ? undefined : province,
        district === 'all' ? undefined : district
      );
    }
    
    // Filter by amenities
    if (amenities.length > 0) {
      filtered = filtered.filter(service => 
        amenities.every(amenity => 
          service.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
        )
      );
    }
    
    // Filter by property type
    if (propertyType !== 'all') {
      filtered = filtered.filter(service => service.type === propertyType);
    }
    
    // Filter by room options
    if (rooms > 1) {
      filtered = filtered.filter(
        service => service.rooms !== undefined && service.rooms >= rooms
      );
    }
    
    if (beds > 1) {
      filtered = filtered.filter(
        service => service.beds !== undefined && service.beds >= beds
      );
    }
    
    if (bathrooms > 1) {
      filtered = filtered.filter(
        service => service.bathrooms !== undefined && service.bathrooms >= bathrooms
      );
    }
    
    if (acceptsPets) {
      filtered = filtered.filter(
        service => service.acceptsPets === true
      );
    }
    
    // Sort results
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredServices(filtered);
  }, [
    searchQuery, priceRange, province, district, amenities, 
    propertyType, sortBy, services, rooms, beds, bathrooms, acceptsPets
  ]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchQuery('');
    setPriceRange([0, 500]);
    setDateRange(undefined);
    setGuests(2);
    setProvince('all');
    setDistrict('all');
    setAmenities([]);
    setPropertyType('all');
    setSortBy('recommended');
    // Reset the room options
    setRooms(1);
    setBeds(1);
    setBathrooms(1);
    setAcceptsPets(false);
  };

  const handleAmenityToggle = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter(a => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const resetFilters = () => {
    setPriceRange([0, 500]);
    setDateRange(undefined);
    setGuests(2);
    setProvince('all');
    setDistrict('all');
    setAmenities([]);
    setPropertyType('all');
    setSortBy('recommended');
    // Reset the room options
    setRooms(1);
    setBeds(1);
    setBathrooms(1);
    setAcceptsPets(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="heading-2 text-center mb-2">Explore Accommodations in Rwanda</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Discover the perfect place to stay during your Rwandan adventure, from luxury hotels to cozy Airbnb homes.
          </p>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="all">All Accommodations</TabsTrigger>
              <TabsTrigger value="hotel">Hotels</TabsTrigger>
              <TabsTrigger value="airbnb">Airbnbs</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search by name, location, or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 py-6 text-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                            </>
                          ) : (
                            format(dateRange.from, "MMM d, yyyy")
                          )
                        ) : (
                          "Check-in & Check-out"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Select value={province} onValueChange={setProvince}>
                    <SelectTrigger>
                      <MapPin className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Provinces</SelectItem>
                      {provinces.map(p => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Select 
                    value={district} 
                    onValueChange={setDistrict}
                    disabled={province === 'all' || availableDistricts.length === 0}
                  >
                    <SelectTrigger>
                      <MapPin className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Districts</SelectItem>
                      {availableDistricts.map(d => (
                        <SelectItem key={d} value={d}>{d} District</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex border rounded bg-white">
                    <span className="px-4 py-2 border-r bg-gray-50 flex items-center">
                      <Users className="h-4 w-4 mr-2" /> Guests
                    </span>
                    <button 
                      className="px-4 py-2 border-r" 
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                    >
                      -
                    </button>
                    <div className="flex-grow text-center py-2">{guests}</div>
                    <button 
                      className="px-4 py-2 border-l"
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="md:col-span-4 flex justify-between">
                  <Popover open={filterMenuOpen} onOpenChange={setFilterMenuOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        More Filters
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[340px] p-5" align="start">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-3">Price Range per night</h3>
                          <div className="px-2">
                            <Slider
                              defaultValue={[0, 500]}
                              value={priceRange}
                              min={0}
                              max={500}
                              step={10}
                              onValueChange={(value: [number, number]) => setPriceRange(value)}
                            />
                            <div className="flex justify-between mt-2 text-sm">
                              <span>${priceRange[0]}</span>
                              <span>${priceRange[1]}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-3">Property Type</h3>
                          <Select value={propertyType} onValueChange={setPropertyType}>
                            <SelectTrigger>
                              <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="hotel">Hotel</SelectItem>
                              <SelectItem value="airbnb">Airbnb</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* Room options section */}
                        <div>
                          <h3 className="font-medium mb-3">Room Options</h3>
                          
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm mb-2">Number of rooms</p>
                              <div className="flex border rounded">
                                <button 
                                  className="px-3 py-1 border-r text-sm" 
                                  onClick={() => setRooms(Math.max(1, rooms - 1))}
                                >
                                  -
                                </button>
                                <div className="flex-grow text-center py-1 text-sm">{rooms}</div>
                                <button 
                                  className="px-3 py-1 border-l text-sm"
                                  onClick={() => setRooms(Math.min(5, rooms + 1))}
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
                                  onClick={() => setBeds(Math.max(1, beds - 1))}
                                >
                                  -
                                </button>
                                <div className="flex-grow text-center py-1 text-sm">{beds}</div>
                                <button 
                                  className="px-3 py-1 border-l text-sm"
                                  onClick={() => setBeds(Math.min(4, beds + 1))}
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
                                  onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                                >
                                  -
                                </button>
                                <div className="flex-grow text-center py-1 text-sm">{bathrooms}</div>
                                <button 
                                  className="px-3 py-1 border-l text-sm"
                                  onClick={() => setBathrooms(Math.min(3, bathrooms + 1))}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            
                            <div>
                              <label className="flex items-center cursor-pointer">
                                <Checkbox 
                                  id="pets" 
                                  checked={acceptsPets} 
                                  onCheckedChange={() => setAcceptsPets(!acceptsPets)}
                                  className="mr-2"
                                />
                                <span className="text-sm flex items-center">
                                  <PawPrint className="h-4 w-4 mr-2" />
                                  Pet-friendly
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="amenities">
                            <AccordionTrigger>Amenities</AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                    id="wifi" 
                                    checked={amenities.includes('wifi')} 
                                    onCheckedChange={() => handleAmenityToggle('wifi')}
                                  />
                                  <label htmlFor="wifi" className="flex items-center">
                                    <Wifi className="h-4 w-4 mr-2" /> WiFi
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                    id="kitchen" 
                                    checked={amenities.includes('kitchen')} 
                                    onCheckedChange={() => handleAmenityToggle('kitchen')}
                                  />
                                  <label htmlFor="kitchen" className="flex items-center">
                                    <Utensils className="h-4 w-4 mr-2" /> Kitchen
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                    id="tv" 
                                    checked={amenities.includes('tv')} 
                                    onCheckedChange={() => handleAmenityToggle('tv')}
                                  />
                                  <label htmlFor="tv" className="flex items-center">
                                    <Tv className="h-4 w-4 mr-2" /> TV
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                    id="parking" 
                                    checked={amenities.includes('parking')} 
                                    onCheckedChange={() => handleAmenityToggle('parking')}
                                  />
                                  <label htmlFor="parking" className="flex items-center">
                                    <Car className="h-4 w-4 mr-2" /> Parking
                                  </label>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        
                        <div className="flex justify-between pt-4 border-t">
                          <Button variant="outline" onClick={resetFilters}>Reset</Button>
                          <Button onClick={() => setFilterMenuOpen(false)}>Apply Filters</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort Results" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Top Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-4 flex flex-wrap gap-2">
            {searchQuery && (
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span>Search: {searchQuery}</span>
                <button className="ml-2" onClick={() => setSearchQuery('')}>×</button>
              </div>
            )}
            
            {priceRange[0] > 0 || priceRange[1] < 500 ? (
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span>Price: ${priceRange[0]} - ${priceRange[1]}</span>
                <button className="ml-2" onClick={() => setPriceRange([0, 500])}>×</button>
              </div>
            ) : null}
            
            {province !== 'all' && (
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span>Province: {province}</span>
                <button className="ml-2" onClick={() => setProvince('all')}>×</button>
              </div>
            )}
            
            {district !== 'all' && (
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span>District: {district}</span>
                <button className="ml-2" onClick={() => setDistrict('all')}>×</button>
              </div>
            )}
            
            {rooms > 1 && (
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span>Rooms: {rooms}</span>
                <button className="ml-2" onClick={() => setRooms(1)}>×</button>
              </div>
            )}
            
            {beds > 1 && (
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span>Beds: {beds}</span>
                <button className="ml-2" onClick={() => setBeds(1)}>×</button>
              </div>
            )}
            
            {bathrooms > 1 && (
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span>Bathrooms: {bathrooms}</span>
                <button className="ml-2" onClick={() => setBathrooms(1)}>×</button>
              </div>
            )}
            
            {acceptsPets && (
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span>Pet-friendly</span>
                <button className="ml-2" onClick={() => setAcceptsPets(false)}>×</button>
              </div>
            )}
            
            {amenities.map((amenity) => (
              <div key={amenity} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span>Amenity: {amenity}</span>
                <button className="ml-2" onClick={() => handleAmenityToggle(amenity)}>×</button>
              </div>
            ))}
            
            {(priceRange[0] > 0 || priceRange[1] < 500 || province !== 'all' || district !== 'all' || 
              amenities.length > 0 || propertyType !== 'all' || rooms > 1 || beds > 1 || 
              bathrooms > 1 || acceptsPets) && (
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Clear All Filters
              </Button>
            )}
          </div>

          <TabsContent value="all" className="mt-0">
            <ServiceGrid 
              services={filteredServices} 
              rooms={rooms}
              beds={beds}
              bathrooms={bathrooms}
              acceptsPets={acceptsPets}
            />
          </TabsContent>
          
          <TabsContent value="hotel" className="mt-0">
            <ServiceGrid 
              services={filteredServices}
              rooms={rooms}
              beds={beds}
              bathrooms={bathrooms}
              acceptsPets={acceptsPets}
            />
          </TabsContent>
          
          <TabsContent value="airbnb" className="mt-0">
            <ServiceGrid 
              services={filteredServices}
              rooms={rooms}
              beds={beds}
              bathrooms={bathrooms}
              acceptsPets={acceptsPets}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

const ServiceGrid = ({ 
  services,
  rooms = 1,
  beds = 1,
  bathrooms = 1,
  acceptsPets = false
}: { 
  services: Service[];
  rooms?: number;
  beds?: number;
  bathrooms?: number;
  acceptsPets?: boolean;
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      if (userData.savedListings) {
        setFavorites(userData.savedListings);
      }
    }
  }, []);
  
  const toggleFavorite = (serviceId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      toast("Please log in to save favorites", {
        description: "Create an account or sign in to save your favorite listings",
        duration: 3000,
      });
      return;
    }
    
    const userData = JSON.parse(currentUser);
    if (!userData.savedListings) {
      userData.savedListings = [];
    }
    
    if (favorites.includes(serviceId)) {
      // Remove from favorites
      userData.savedListings = userData.savedListings.filter((id: string) => id !== serviceId);
      setFavorites(prev => prev.filter(id => id !== serviceId));
      toast("Removed from favorites", {
        description: "The listing has been removed from your saved properties",
      });
    } else {
      // Add to favorites
      userData.savedListings.push(serviceId);
      setFavorites(prev => [...prev, serviceId]);
      toast("Added to favorites", {
        description: "The listing has been saved to your profile",
      });
    }
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No accommodations found</h3>
        <p className="text-gray-600">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <Link to={`/services/${service.type}/${service.id}`} key={service.id}>
          <Card className="overflow-hidden hover-lift h-full">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={service.images[0]} 
                alt={service.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <button 
                onClick={(e) => toggleFavorite(service.id, e)}
                className={`absolute top-2 right-2 p-2 rounded-full ${
                  favorites.includes(service.id) 
                    ? 'bg-red-100 text-red-500' 
                    : 'bg-white/80 text-gray-600'
                }`}
              >
                <Heart className={`h-5 w-5 ${favorites.includes(service.id) ? 'fill-current' : ''}`} />
              </button>
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display font-semibold text-xl">{service.name}</h3>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full capitalize">
                  {service.type}
                </span>
              </div>
              
              <div className="flex items-center text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {service.location}
                  {service.district && (
                    <span className="font-medium ml-1">
                      ({service.district} District)
                    </span>
                  )}
                </span>
              </div>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center text-yellow-500 mr-2">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 font-medium">{service.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({service.reviewCount} reviews)</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {rooms > 1 && service.rooms && service.rooms >= rooms && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center">
                    <Bed className="h-3 w-3 mr-1" /> {service.rooms} Room{service.rooms > 1 ? 's' : ''}
                  </span>
                )}
                {beds > 1 && service.beds && service.beds >= beds && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center">
                    <Bed className="h-3 w-3 mr-1" /> {service.beds} Bed{service.beds > 1 ? 's' : ''}
                  </span>
                )}
                {bathrooms > 1 && service.bathrooms && service.bathrooms >= bathrooms && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center">
                    <Bath className="h-3 w-3 mr-1" /> {service.bathrooms} Bath{service.bathrooms > 1 ? 's' : ''}
                  </span>
                )}
                {acceptsPets && service.acceptsPets && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                    <PawPrint className="h-3 w-3 mr-1" /> Pet-friendly
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="font-bold text-blue-600">
                  {service.currency} {service.price}
                  <span className="text-gray-500 font-normal text-sm">/night</span>
                </div>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ServicesPage;
