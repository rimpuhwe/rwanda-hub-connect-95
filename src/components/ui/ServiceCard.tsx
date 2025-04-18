
import { Link } from 'react-router-dom';
import { Star, MapPin, PawPrint } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  id: string;
  type: 'hotel' | 'airbnb';
  title: string;
  location: string;
  province?: string;
  district?: string;
  image: string;
  rating: number;
  pricePerNight: number;
  className?: string;
  rooms?: number;
  beds?: number;
  bathrooms?: number;
  acceptsPets?: boolean;
  // Google Places specific properties
  placeId?: string;
  vicinity?: string;
  photos?: string[];
}

// Placeholder images for hotels without images
const placeholderImages = [
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
  "https://images.unsplash.com/photo-1524230572899-a752b3835840",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
];

// Get a random placeholder image
const getRandomPlaceholder = () => {
  const randomIndex = Math.floor(Math.random() * placeholderImages.length);
  return placeholderImages[randomIndex];
};

export const ServiceCard = ({
  id,
  type,
  title,
  location,
  province,
  district,
  image,
  rating,
  pricePerNight,
  className,
  rooms = 1,
  beds = 1,
  bathrooms = 1,
  acceptsPets = false,
  placeId,
  vicinity,
}: ServiceCardProps) => {
  // Use provided image or get a random placeholder if image is missing or invalid
  const displayImage = image || getRandomPlaceholder();
  
  // Determine the category label
  let categoryLabel = type === 'hotel' ? 'Hotel' : 'Airbnb';
  if (title.toLowerCase().includes('lodge')) {
    categoryLabel = 'Lodge';
  }

  return (
    <Link
      to={`/services/${type}/${id}`}
      className={cn(
        'group block rounded-xl overflow-hidden glass-card hover-lift',
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            // Fallback if the image fails to load
            const target = e.target as HTMLImageElement;
            target.src = getRandomPlaceholder();
          }}
        />
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-block bg-white/90 backdrop-blur-sm text-xs font-medium py-1 px-2 rounded-full">
            {categoryLabel}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-display text-lg font-medium text-gray-900 line-clamp-1 group-hover:text-rwandan-blue transition-colors">
            {title}
          </h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-rwandan-accent text-rwandan-accent" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="mt-1 flex items-center text-sm text-gray-600">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span className="line-clamp-1">
            {vicinity || location}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {acceptsPets && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
              <PawPrint className="h-3 w-3 mr-1" /> Pet-friendly
            </span>
          )}
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold text-gray-900">
              ${pricePerNight}
            </span>
            <span className="text-sm text-gray-600 ml-1">/ night</span>
          </div>
          <span className="inline-block text-sm font-medium text-rwandan-blue group-hover:underline">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};
