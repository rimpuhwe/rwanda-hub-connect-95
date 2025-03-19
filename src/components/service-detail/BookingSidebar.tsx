
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Star, MessageSquare, Users, Bed, Bath, PawPrint } from 'lucide-react';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BookingSidebarProps {
  service: any;
  dateRange: {
    from: Date;
    to?: Date;
  };
  setDateRange: (range: { from: Date; to?: Date }) => void;
  guests: number;
  setGuests: (guests: number) => void;
  isInstantBook: boolean;
  setIsInstantBook: (isInstantBook: boolean) => void;
  onBookingClick: () => void;
  onContactHostClick: () => void;
}

export const BookingSidebar = ({ 
  service,
  dateRange,
  setDateRange,
  guests,
  setGuests,
  isInstantBook,
  setIsInstantBook,
  onBookingClick,
  onContactHostClick
}: BookingSidebarProps) => {
  const [rooms, setRooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [acceptsPets, setAcceptsPets] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('guests');

  const calculateTotal = () => {
    if (!dateRange.to) return service.price;
    
    const days = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
    return service.price * days;
  };

  // Helper functions to handle guest count changes
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => setDateRange(range || { from: new Date() })}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="guests">
                <Users className="h-4 w-4 mr-2" />
                Guests
              </TabsTrigger>
              <TabsTrigger value="rooms">
                <Bed className="h-4 w-4 mr-2" />
                Room Options
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="guests" className="mt-0">
              <div className="space-y-4">
                <p className="font-medium mb-2">Number of guests</p>
                <div className="flex border rounded">
                  <button 
                    className="px-4 py-2 border-r" 
                    onClick={decreaseGuests}
                  >
                    -
                  </button>
                  <div className="flex-grow text-center py-2">{guests}</div>
                  <button 
                    className="px-4 py-2 border-l"
                    onClick={increaseGuests}
                  >
                    +
                  </button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rooms" className="mt-0 space-y-4">
              <div>
                <p className="font-medium mb-2">Number of rooms</p>
                <div className="flex border rounded">
                  <button 
                    className="px-4 py-2 border-r" 
                    onClick={decreaseRooms}
                  >
                    -
                  </button>
                  <div className="flex-grow text-center py-2">{rooms}</div>
                  <button 
                    className="px-4 py-2 border-l"
                    onClick={increaseRooms}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div>
                <p className="font-medium mb-2">Beds per room</p>
                <div className="flex border rounded">
                  <button 
                    className="px-4 py-2 border-r" 
                    onClick={decreaseBeds}
                  >
                    -
                  </button>
                  <div className="flex-grow text-center py-2">{beds}</div>
                  <button 
                    className="px-4 py-2 border-l"
                    onClick={increaseBeds}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div>
                <p className="font-medium mb-2">Number of bathrooms</p>
                <div className="flex border rounded">
                  <button 
                    className="px-4 py-2 border-r" 
                    onClick={decreaseBathrooms}
                  >
                    -
                  </button>
                  <div className="flex-grow text-center py-2">{bathrooms}</div>
                  <button 
                    className="px-4 py-2 border-l"
                    onClick={increaseBathrooms}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptsPets}
                    onChange={() => setAcceptsPets(!acceptsPets)}
                    className="mr-2"
                  />
                  <PawPrint className="h-4 w-4 mr-2" />
                  <span className="text-sm">Pet-friendly</span>
                </label>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isInstantBook}
              onChange={() => setIsInstantBook(!isInstantBook)}
              className="mr-2"
            />
            <span className="text-sm">Instant Book (no approval needed)</span>
          </label>
        </div>
        
        <Button 
          className="w-full mb-4" 
          size="lg"
          onClick={onBookingClick}
        >
          {isInstantBook ? 'Book Now' : 'Request to Book'}
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
        
        <div className="mt-4 pt-4 border-t">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onContactHostClick}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Host
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
