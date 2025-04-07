
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { saveBooking, Booking } from '@/data/localStorage';
import { createBooking } from '@/store/slices/bookingSlice';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DateRange } from 'react-day-picker';

// Booking form validation schema
const bookingSchema = z.object({
  guests: z.number().min(1, 'At least 1 guest is required').max(10, 'Maximum 10 guests allowed'),
  dateRange: z.object({
    from: z.date({ required_error: 'Check-in date is required' }),
    to: z.date({ required_error: 'Check-out date is required' }).optional(),
  }).refine(data => {
    if (!data.to) return true;
    return data.from < data.to;
  }, {
    message: 'Check-out date must be after check-in date',
    path: ['to'],
  }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentClick: () => void;
  service: any;
  currentUser: any;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  isInstantBook: boolean;
}

export const BookingDialog = ({ 
  open, 
  onOpenChange, 
  onPaymentClick, 
  service, 
  currentUser,
  dateRange,
  setDateRange,
  isInstantBook
}: BookingDialogProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [guests, setGuests] = useState(2);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: 2,
      dateRange: {
        from: dateRange.from || new Date(),
        to: dateRange.to,
      },
    },
  });

  const calculateTotal = () => {
    if (!dateRange.to) return service.price;
    
    const days = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
    return service.price * days;
  };

  const handleBooking = (values: BookingFormValues) => {
    if (!currentUser) {
      toast.error('Please log in to book this accommodation');
      navigate('/login');
      return;
    }
    
    // Update the date range in parent component
    setDateRange(values.dateRange as DateRange);
    
    if (isInstantBook) {
      // Move to payment directly
      onOpenChange(false);
      onPaymentClick();
    } else {
      // Create a pending booking
      const newBooking: Omit<Booking, 'id' | 'createdAt'> = {
        serviceId: service.id,
        userId: currentUser.id,
        checkIn: values.dateRange.from.toISOString(),
        checkOut: values.dateRange.to ? values.dateRange.to.toISOString() : new Date().toISOString(),
        guests: values.guests,
        totalPrice: calculateTotal() + 30 + 50, // Including fees
        status: 'pending',
      };
      
      // Dispatch action to create booking
      dispatch(createBooking(newBooking) as any);
      
      onOpenChange(false);
      toast.success('Booking request sent to host! You will be notified once it\'s approved.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete your booking</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleBooking)} className="space-y-4">
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select dates</FormLabel>
                  <FormControl>
                    <div className="border rounded p-4">
                      <Calendar
                        mode="range"
                        selected={field.value}
                        onSelect={(range) => field.onChange(range || { from: new Date() })}
                        numberOfMonths={1}
                        disabled={(date) => date < new Date()}
                        className="rounded border pointer-events-auto"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of guests</FormLabel>
                  <FormControl>
                    <div className="flex border rounded">
                      <button 
                        type="button"
                        className="px-4 py-2 border-r" 
                        onClick={() => {
                          const newValue = Math.max(1, field.value - 1);
                          field.onChange(newValue);
                          setGuests(newValue);
                        }}
                      >
                        -
                      </button>
                      <Input
                        type="number"
                        className="flex-grow text-center border-none"
                        {...field}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            field.onChange(value);
                            setGuests(value);
                          }
                        }}
                      />
                      <button 
                        type="button"
                        className="px-4 py-2 border-l"
                        onClick={() => {
                          const newValue = Math.min(10, field.value + 1);
                          field.onChange(newValue);
                          setGuests(newValue);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">
                {isInstantBook ? 'Proceed to Payment' : 'Request to Book'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
