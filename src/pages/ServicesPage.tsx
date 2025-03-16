
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getServicesByType, Service } from '@/data/mockServices';
import { MapPin, Star, Search, Filter } from 'lucide-react';

const ServicesPage = () => {
  const { type } = useParams();
  const [activeTab, setActiveTab] = useState<string>(type || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  useEffect(() => {
    const allServices = getServicesByType(activeTab === 'all' ? undefined : activeTab);
    setServices(allServices);
    setFilteredServices(allServices);
  }, [activeTab]);

  useEffect(() => {
    let filtered = [...services];
    
    if (searchQuery) {
      filtered = filtered.filter(
        service => 
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(
        service => service.price >= min && (max ? service.price <= max : true)
      );
    }
    
    setFilteredServices(filtered);
  }, [searchQuery, priceRange, services]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchQuery('');
    setPriceRange('all');
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
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="md:w-64">
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-100">$0 - $100</SelectItem>
                  <SelectItem value="100-200">$100 - $200</SelectItem>
                  <SelectItem value="200-300">$200 - $300</SelectItem>
                  <SelectItem value="300-">$300+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <ServiceGrid services={filteredServices} />
          </TabsContent>
          
          <TabsContent value="hotel" className="mt-0">
            <ServiceGrid services={filteredServices} />
          </TabsContent>
          
          <TabsContent value="airbnb" className="mt-0">
            <ServiceGrid services={filteredServices} />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

const ServiceGrid = ({ services }: { services: Service[] }) => {
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
            <div className="h-48 overflow-hidden">
              <img 
                src={service.images[0]} 
                alt={service.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display font-semibold text-xl">{service.name}</h3>
                <span className="bg-rwandan-green text-white text-xs px-2 py-1 rounded-full capitalize">
                  {service.type}
                </span>
              </div>
              
              <div className="flex items-center text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{service.location}</span>
              </div>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center text-yellow-500 mr-2">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 font-medium">{service.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({service.reviewCount} reviews)</span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="font-bold text-rwandan-blue">
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
