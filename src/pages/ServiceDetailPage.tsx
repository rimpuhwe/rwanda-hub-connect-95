
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getServiceById } from '@/data/mockServices';
import { toast } from 'sonner';
import { getCurrentUser } from '@/data/localStorage';

// Import our new components
import { ImageGallery } from '@/components/service-detail/ImageGallery';
import { ServiceHeader } from '@/components/service-detail/ServiceHeader';
import { ServiceTabs } from '@/components/service-detail/ServiceTabs';
import { BookingSidebar } from '@/components/service-detail/BookingSidebar';
import { BookingDialog } from '@/components/service-detail/BookingDialog';
import { PaymentDialog } from '@/components/service-detail/PaymentDialog';
import { ContactHostDialog } from '@/components/service-detail/ContactHostDialog';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = getServiceById(id || '');
  
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [contactHostDialogOpen, setContactHostDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 3))
  });
  const [guests, setGuests] = useState(2);
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
            <ServiceHeader 
              service={service} 
              currentUser={currentUser}
              isFavorited={isFavorited}
              toggleFavorite={toggleFavorite}
              shareService={shareService}
            />
            
            <ImageGallery images={service.images} alt={service.name} />
            
            <ServiceTabs service={service} currentUser={currentUser} />
          </div>
          
          <div>
            <BookingSidebar 
              service={service}
              dateRange={dateRange}
              setDateRange={setDateRange}
              guests={guests}
              setGuests={setGuests}
              isInstantBook={isInstantBook}
              setIsInstantBook={setIsInstantBook}
              onBookingClick={() => setBookingDialogOpen(true)}
              onContactHostClick={() => setContactHostDialogOpen(true)}
            />
          </div>
        </div>
      </div>
      
      <BookingDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        onPaymentClick={() => setPaymentDialogOpen(true)}
        service={service}
        currentUser={currentUser}
        dateRange={dateRange}
        setDateRange={setDateRange}
        isInstantBook={isInstantBook}
      />
      
      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        service={service}
        currentUser={currentUser}
        dateRange={dateRange}
        guests={guests}
      />
      
      <ContactHostDialog
        open={contactHostDialogOpen}
        onOpenChange={setContactHostDialogOpen}
        serviceId={service.id}
      />
      
      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
