
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessagingSystem } from '@/components/messaging/MessagingSystem';
import { 
  ArrowLeft, MapPin, Wifi, Check, X, UtilityPole, ChevronLeft, ChevronRight, 
  Star, Calendar as CalendarIcon, MessageSquare, Heart, HeartOff, Share2, Shield, CreditCard, User 
} from 'lucide-react';
import { getServiceById } from '@/data/mockServices';
import { format } from 'date-fns';
import { Rating } from '@/components/ui/Rating';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentUser, saveBooking, saveUserReview, UserReview, Booking } from '@/data/localStorage';

// Payment method type
type PaymentMethod = 'credit_card' | 'paypal' | 'bitcoin' | 'bank_transfer' | 'cash';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = getServiceById(id || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [contactHostDialogOpen, setContactHostDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [userRating, setUserRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState('');
  const [showRatingSuccess, setShowRatingSuccess] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 3))
  });
  const [guests, setGuests] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [isInstantBook, setIsInstantBook] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      
      // Check if this service is in user's favorites
      if (userData.savedListings && userData.savedListings.includes(id)) {
        setIsFavorited(true);
      }
    }
  }, [id]);

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
    if (!currentUser) {
      toast.error('Please log in to book this accommodation');
      navigate('/login');
      return;
    }

    if (isInstantBook) {
      // Move to payment directly
      setBookingDialogOpen(false);
      setPaymentDialogOpen(true);
    } else {
      // Create a pending booking
      const newBooking: Booking = {
        id: uuidv4(),
        serviceId: service.id,
        userId: currentUser.id,
        checkIn: dateRange.from.toISOString(),
        checkOut: dateRange.to ? dateRange.to.toISOString() : new Date().toISOString(),
        guests: guests,
        totalPrice: calculateTotal() + 30 + 50, // Including fees
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      saveBooking(newBooking);
      
      setBookingDialogOpen(false);
      toast.success('Booking request sent to host! You will be notified once it\'s approved.');
    }
  };

  const handlePayment = () => {
    if (!currentUser) {
      toast.error('Please log in to complete this booking');
      navigate('/login');
      return;
    }

    // Create a completed booking
    const newBooking: Booking = {
      id: uuidv4(),
      serviceId: service.id,
      userId: currentUser.id,
      checkIn: dateRange.from.toISOString(),
      checkOut: dateRange.to ? dateRange.to.toISOString() : new Date().toISOString(),
      guests: guests,
      totalPrice: calculateTotal() + 30 + 50, // Including fees
      status: 'approved',
      createdAt: new Date().toISOString()
    };
    
    saveBooking(newBooking);
    
    setPaymentDialogOpen(false);
    toast.success('Booking confirmed! Check your bookings in your account page.');
  };

  const handleRateService = () => {
    if (!currentUser) {
      toast.error('Please log in to rate this service');
      navigate('/login');
      return;
    }

    if (userRating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    const newReview: UserReview = {
      id: uuidv4(),
      userId: currentUser.id,
      serviceId: service.id,
      rating: userRating,
      comment: reviewText,
      date: new Date().toISOString()
    };
    
    saveUserReview(currentUser.id, newReview);
    
    toast.success(`Thank you for rating this ${service.type} ${userRating} stars!`);
    setShowRatingSuccess(true);
    setReviewText('');
    
    // In a real app, this would refresh reviews
    setTimeout(() => setShowRatingSuccess(false), 3000);
  };

  const toggleFavorite = () => {
    if (!currentUser) {
      toast.error('Please log in to save favorites');
      navigate('/login');
      return;
    }

    const updatedUser = { ...currentUser };
    if (!updatedUser.savedListings) {
      updatedUser.savedListings = [];
    }

    if (isFavorited) {
      // Remove from favorites
      updatedUser.savedListings = updatedUser.savedListings.filter((listingId: string) => listingId !== service.id);
      toast.success('Removed from favorites');
    } else {
      // Add to favorites
      updatedUser.savedListings.push(service.id);
      toast.success('Added to favorites');
    }

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    setIsFavorited(!isFavorited);
  };

  const shareService = () => {
    if (navigator.share) {
      navigator.share({
        title: service.name,
        text: `Check out this amazing ${service.type} in ${service.location}!`,
        url: window.location.href
      })
      .catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        toast.success('Link copied to clipboard');
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
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
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="heading-2 mb-1">{service.name}</h1>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{service.location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Rating value={service.rating} readOnly />
                    <span className="ml-1 text-gray-500">({service.reviewCount} reviews)</span>
                  </div>
                  
                  <span className="bg-rwandan-green text-white px-2 py-0.5 rounded-full text-sm capitalize">
                    {service.type}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleFavorite}
                  className={isFavorited ? "text-red-500" : ""}
                >
                  {isFavorited ? (
                    <HeartOff className="mr-1 h-4 w-4" />
                  ) : (
                    <Heart className="mr-1 h-4 w-4" />
                  )}
                  {isFavorited ? 'Saved' : 'Save'}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={shareService}
                >
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
              </div>
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
              <TabsList className="mb-4 flex flex-wrap">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="host">Host</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
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
              
              <TabsContent value="reviews">
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-4">Rate Your Experience</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Rating 
                          value={userRating} 
                          size="lg" 
                          onChange={setUserRating} 
                        />
                        <span className="text-sm text-gray-500">
                          {userRating > 0 ? `${userRating} stars` : 'Click to rate'}
                        </span>
                      </div>
                      
                      <div>
                        <Textarea 
                          placeholder="Share your experience with this accommodation..." 
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          rows={4}
                          className="resize-none"
                        />
                      </div>
                      
                      <Button onClick={handleRateService}>
                        Submit Review
                      </Button>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mt-6">Guest Reviews</h3>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <span className="font-medium">J</span>
                          </div>
                          <div>
                            <h4 className="font-medium">John D.</h4>
                            <span className="text-xs text-gray-500">May 2023</span>
                          </div>
                        </div>
                        <Rating value={4.5} readOnly size="sm" />
                      </div>
                      <p className="text-gray-700">Exceptional location and service. The staff was very attentive and the amenities exceeded our expectations. Will definitely return!</p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <span className="font-medium">S</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Sarah M.</h4>
                            <span className="text-xs text-gray-500">April 2023</span>
                          </div>
                        </div>
                        <Rating value={5} readOnly size="sm" />
                      </div>
                      <p className="text-gray-700">Perfect stay for our honeymoon! The views were breathtaking and the room was absolutely spotless. Highly recommend for special occasions.</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <span className="font-medium">R</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Robert T.</h4>
                            <span className="text-xs text-gray-500">March 2023</span>
                          </div>
                        </div>
                        <Rating value={4} readOnly size="sm" />
                      </div>
                      <p className="text-gray-700">Great value for the price. The location was convenient and we enjoyed the breakfast options. Would stay here again on our next visit to Rwanda.</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm">
                      View All 24 Reviews
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="host">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="aspect-square rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                      <User className="h-16 w-16 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h3 className="font-display text-xl font-semibold mb-2">Hosted by Rwanda Hospitality Ltd</h3>
                    <p className="text-gray-500 mb-4">Joined in January 2020 · 230+ reviews</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Rating value={4.9} readOnly />
                      <span className="text-gray-600">(230 reviews)</span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">
                      We are a premier hospitality company in Rwanda, dedicated to providing exceptional accommodation experiences for travelers. Our team is passionate about sharing Rwanda's rich culture with visitors.
                    </p>
                    
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline"
                        onClick={() => setContactHostDialogOpen(true)}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact Host
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="policies">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Cancellation Policy</h3>
                    <p className="text-gray-700 mb-2">
                      Free cancellation for 48 hours after booking, as long as the cancellation is made at least 14 days before check-in.
                    </p>
                    <p className="text-gray-700">
                      Cancel before check-in and get a 50% refund, minus the first night and service fee.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Safety & Property</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-gray-500 mr-2" />
                        <span>Security cameras on property</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-gray-500 mr-2" />
                        <span>Carbon monoxide alarm</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-gray-500 mr-2" />
                        <span>Smoke alarm</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-gray-500 mr-2" />
                        <span>24/7 security staff</span>
                      </div>
                    </div>
                  </div>
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
                  onClick={() => setBookingDialogOpen(true)}
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
                    onClick={() => setContactHostDialogOpen(true)}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Host
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Booking Dialog */}
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
            <Button onClick={handleBooking}>
              {isInstantBook ? 'Proceed to Payment' : 'Request to Book'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Payment Method</label>
              <Select value={paymentMethod} onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">Credit/Debit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bitcoin">Bitcoin</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {paymentMethod === 'credit_card' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <Input placeholder="123" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                  <Input placeholder="John Doe" />
                </div>
              </div>
            )}
            
            {paymentMethod === 'paypal' && (
              <div className="text-center py-6">
                <CreditCard className="h-16 w-16 mx-auto text-blue-500 mb-4" />
                <p className="font-medium">Connect to PayPal</p>
                <p className="text-sm text-gray-500 mt-1 mb-4">You'll be redirected to PayPal to complete your payment</p>
                <Button className="w-full">Connect to PayPal</Button>
              </div>
            )}
            
            {paymentMethod === 'bitcoin' && (
              <div className="text-center py-6">
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="font-mono text-sm break-all">bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq</p>
                </div>
                <p className="text-sm text-gray-500 mb-2">Send exactly 0.0042 BTC to the address above</p>
                <p className="text-sm text-gray-500">Transaction will be confirmed automatically</p>
              </div>
            )}
            
            {paymentMethod === 'bank_transfer' && (
              <div className="space-y-3">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-medium mb-2">Bank Transfer Details</p>
                  <p className="text-sm">Account Name: Rwanda Tourism Services</p>
                  <p className="text-sm">Account Number: 1234567890</p>
                  <p className="text-sm">SWIFT/BIC: RWANDABANK</p>
                  <p className="text-sm">Reference: BOOKING-{id?.slice(0, 8)}</p>
                </div>
                <p className="text-sm text-gray-500">Please include the reference number in your transfer</p>
              </div>
            )}
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold">
                <span>Total to Pay</span>
                <span>{service.currency} {calculateTotal() + 30 + 50}</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
            <Button onClick={handlePayment}>Complete Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Contact Host Dialog */}
      <Dialog open={contactHostDialogOpen} onOpenChange={setContactHostDialogOpen}>
        <DialogContent className="max-w-lg max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Contact Host</DialogTitle>
          </DialogHeader>
          
          <MessagingSystem recipientId="host-123" serviceId={service.id} />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactHostDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
