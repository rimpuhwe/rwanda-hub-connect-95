
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  id: string;
  type: 'hotel' | 'airbnb' | 'tour' | 'restaurant';
  name: string;
  image: string;
  location: string;
  province?: string;
  price: number;
  rating: number;
  reviews?: number;
  tags?: string[];
  capacity?: number;
  featured?: boolean;
  discount?: number;
  className?: string;
}

export const ServiceCardEnhanced: React.FC<ServiceCardProps> = ({
  id,
  type,
  name,
  image,
  location,
  province,
  price,
  rating,
  reviews = 0,
  tags = [],
  capacity,
  featured = false,
  discount,
  className = ''
}) => {
  // Format price based on type
  const formatPrice = () => {
    if (type === 'hotel' || type === 'airbnb') {
      return `$${price} / night`;
    } else if (type === 'tour') {
      return `$${price} / person`;
    } else {
      return `$${price}`;
    }
  };
  
  // Calculate discount price
  const discountedPrice = discount ? price - (price * (discount / 100)) : null;

  return (
    <Link
      to={`/services/${type}/${id}`}
      className={cn(
        "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group",
        featured ? "ring-2 ring-rwandan-blue" : "",
        className
      )}
    >
      {/* Image container */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {featured && (
            <Badge className="bg-rwandan-blue text-white">Featured</Badge>
          )}
          {discount && (
            <Badge className="bg-rwandan-green text-white">-{discount}% Off</Badge>
          )}
        </div>
        
        {/* Save button (heart) */}
        <button 
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            // Add to favorites logic here
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      {/* Content */}
      <div className="p-5">
        {/* Type tag */}
        <div className="mb-2">
          <span className="text-xs font-medium text-rwandan-blue bg-rwandan-blue/10 px-2 py-1 rounded">
            {type === 'hotel' ? 'Hotel' : type === 'airbnb' ? 'Vacation Rental' : type === 'tour' ? 'Tour' : 'Restaurant'}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">{name}</h3>
        
        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{location}{province ? `, ${province}` : ''}</span>
        </div>
        
        {/* Features/Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
          
          {capacity && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {capacity}
            </span>
          )}
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-100 my-3"></div>
        
        {/* Price and rating */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {discountedPrice ? (
              <>
                <span className="text-lg font-bold text-rwandan-green">${discountedPrice}</span>
                <span className="text-sm text-gray-500 line-through">${price}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">{formatPrice()}</span>
            )}
          </div>
          
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium ml-1">{rating}</span>
            {reviews > 0 && (
              <span className="text-xs text-gray-500 ml-1">({reviews})</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

// Variant for multiple cards in a grid
export const ServiceCardGrid: React.FC<{
  services: ServiceCardProps[];
}> = ({ services }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {services.map((service) => (
        <ServiceCardEnhanced key={service.id} {...service} />
      ))}
    </div>
  );
};
