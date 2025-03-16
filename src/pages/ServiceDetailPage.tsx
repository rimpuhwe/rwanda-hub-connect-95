
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft, MapPin, Star, Wifi, Check, X, UtilityPole, ChevronLeft, ChevronRight } from 'lucide-react';
import { getServiceById } from '@/data/mockServices';
import { format } from 'date-fns';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = getServiceById(id || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 3))
  });
  const [guests, setGuests] = useState(2);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex flex-col items-center justify-center py-12">
          <h1 className="heading-2 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-6">The service you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/services')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === service.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? service.images.length - 1 : prevIndex - 1
    );
  };

  const calculateTotal = () => {
    if (!dateRange.to) return service.price;
    
    const days = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
    return service.price * days;
  };

  const handleBooking = () => {
    alert('Booking successful! In a real app, this would connect to a payment gateway.');
    setBookingDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-8">
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-6"
          onClick={() => navigate('/services')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="heading-2 mb-3">{service.name}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{service.location}</span>
              </div>
              
              <div className="flex items-center text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 font-medium">{service.rating}</span>
                <span className="ml-1 text-gray-500">({service.reviewCount} reviews)</span>
              </div>
              
              <span className="bg-rwandan-green text-white px-3 py-1 rounded-full text-sm capitalize">
                {service.type}
              </span>
            </div>
            
            <div className="relative mb-8 bg-gray-100 rounded-xl overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={service.images[currentImageIndex]} 
                  alt={service.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {service.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="text-gray-700">
                <div className="prose max-w-none">
                  <p className="text-lg mb-4">{service.description}</p>
                  
                  <h3 className="font-display text-xl font-semibold mt-6 mb-3">About this place</h3>
                  <p>
                    Experience the best of Rwandan hospitality in this {service.type === 'hotel' ? 'premium hotel' : 'beautiful property'}. 
                    Located in {service.location}, you'll be close to major attractions and enjoy convenient access to local amenities.
                  </p>
                  
                  <h3 className="font-display text-xl font-semibold mt-6 mb-3">House rules</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Check-in: After 2:00 PM</li>
                    <li>Checkout: Before 11:00 AM</li>
                    <li>No smoking</li>
                    <li>No parties or events</li>
                    {service.type === 'airbnb' && <li>Pets allowed (with restrictions)</li>}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="amenities">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                  {service.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-rwandan-green mr-2" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="location">
                <p className="mb-4">Located in {service.location}, Rwanda.</p>
                <div className="bg-gray-200 rounded-lg h-[300px] flex items-center justify-center">
                  <p className="text-gray-500">Map will be displayed here (Google Maps integration)</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-semibold mb-4">Book your stay</h3>
                
                <div className="mb-4">
                  <p className="font-bold text-2xl text-rwandan-blue">
                    {service.currency} {service.price}
                    <span className="text-gray-500 font-normal text-sm">/night</span>
                  </p>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1">{service.rating} · {service.reviewCount} reviews</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="font-medium mb-2">When do you plan to stay?</p>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Check-in</span>
                      <span>Check-out</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>{dateRange.from ? format(dateRange.from, 'MMM dd, yyyy') : 'Select date'}</span>
                      <span>{dateRange.to ? format(dateRange.to, 'MMM dd, yyyy') : 'Select date'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="font-medium mb-2">Number of guests</p>
                  <div className="flex border rounded">
                    <button 
                      className="px-4 py-2 border-r" 
                      onClick={() => setGuests(g => Math.max(1, g - 1))}
                    >
                      -
                    </button>
                    <div className="flex-grow text-center py-2">{guests}</div>
                    <button 
                      className="px-4 py-2 border-l"
                      onClick={() => setGuests(g => Math.min(10, g + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <Button 
                  className="w-full mb-4" 
                  size="lg"
                  onClick={() => setBookingDialogOpen(true)}
                >
                  Book Now
                </Button>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>{service.currency} {service.price} x 3 nights</span>
                    <span>{service.currency} {service.price * 3}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Cleaning fee</span>
                    <span>{service.currency} 30</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Service fee</span>
                    <span>{service.currency} 50</span>
                  </div>
                  <div className="flex justify-between font-bold pt-4 border-t">
                    <span>Total</span>
                    <span>{service.currency} {service.price * 3 + 30 + 50}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete your booking</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="border rounded p-4 mb-4">
              <p className="font-medium mb-2">Select dates</p>
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => setDateRange(range || { from: new Date() })}
                numberOfMonths={1}
                disabled={(date) => date < new Date()}
                className="rounded border"
              />
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>{service.currency} {service.price} x {dateRange.to ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) : 1} nights</span>
                <span>{service.currency} {calculateTotal()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Cleaning fee</span>
                <span>{service.currency} 30</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Service fee</span>
                <span>{service.currency} 50</span>
              </div>
              <div className="flex justify-between font-bold pt-4 border-t">
                <span>Total</span>
                <span>{service.currency} {calculateTotal() + 30 + 50}</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleBooking}>Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
