
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
import { saveBooking, Booking } from '@/data/localStorage';
import { createBooking } from '@/store/slices/bookingSlice';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Payment method type
type PaymentMethod = 'credit_card' | 'paypal' | 'bitcoin' | 'bank_transfer' | 'cash';

// Form validation schema
const paymentSchema = z.object({
  cardholderName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  service: any;
  currentUser: any;
  dateRange: {
    from: Date;
    to?: Date;
  };
  guests: number;
  onClose: () => void;
}

const PaymentForm = ({ service, currentUser, dateRange, guests, onClose }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardholderName: currentUser?.fullName || '',
      email: currentUser?.email || '',
    },
  });

  const calculateTotal = () => {
    if (!dateRange.to) return service.price;
    
    const days = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
    return service.price * days;
  };

  const handlePayment = async (values: PaymentFormValues) => {
    if (!stripe || !elements) {
      toast.error('Stripe has not loaded properly');
      return;
    }

    if (!currentUser) {
      toast.error('Please log in to complete this booking');
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    if (paymentMethod === 'credit_card') {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        toast.error('Something went wrong with the payment form');
        setIsProcessing(false);
        return;
      }

      // Simulate a payment with Stripe (in a real app, you would process the payment)
      // For demo purposes, we'll just create a booking after a short delay
      setTimeout(() => {
        // Create a new booking
        const newBooking: Omit<Booking, 'id' | 'createdAt'> = {
          serviceId: service.id,
          userId: currentUser.id,
          checkIn: dateRange.from.toISOString(),
          checkOut: dateRange.to ? dateRange.to.toISOString() : new Date().toISOString(),
          guests: guests,
          totalPrice: calculateTotal() + 30 + 50, // Including fees
          status: 'approved',
        };
        
        // Dispatch action to create booking
        dispatch(createBooking(newBooking) as any);
        
        setIsProcessing(false);
        onClose();
        toast.success('Booking confirmed! Check your bookings in your account page.');
      }, 1500);
    } else {
      // Handle other payment methods (simulation for demo)
      setTimeout(() => {
        // Create a new booking
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
        
        setIsProcessing(false);
        onClose();
        toast.success('Booking confirmed! Check your bookings in your account page.');
      }, 1000);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="cardholderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cardholder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Card Details</label>
              <div className="border rounded-md p-3">
                <CardElement options={{ 
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  }
                }}/>
              </div>
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
              <p className="text-sm">Reference: BOOKING-{service.id?.slice(0, 8)}</p>
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
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
          <Button type="submit" disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Complete Payment'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: any;
  currentUser: any;
  dateRange: {
    from: Date;
    to?: Date;
  };
  guests: number;
}

export const PaymentDialog = ({ 
  open, 
  onOpenChange, 
  service, 
  currentUser,
  dateRange,
  guests
}: PaymentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        
        <Elements stripe={stripePromise}>
          <PaymentForm 
            service={service} 
            currentUser={currentUser} 
            dateRange={dateRange} 
            guests={guests} 
            onClose={() => onOpenChange(false)} 
          />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};
