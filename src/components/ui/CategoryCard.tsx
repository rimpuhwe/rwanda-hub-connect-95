
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  imageSrc: string;
  url: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  accent?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  imageSrc,
  url,
  className,
  size = 'medium',
  accent = false,
}) => {
  // Map size to class names
  const sizeClasses = {
    small: 'h-48',
    medium: 'h-64',
    large: 'h-80',
  };
  
  return (
    <Link 
      to={url} 
      className={cn(
        'group relative block overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300',
        sizeClasses[size],
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t',
          accent ? 'from-rwandan-green/90 to-transparent' : 'from-black/70 to-black/20'
        )} />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <h3 className="text-xl md:text-2xl font-display font-bold mb-2">{title}</h3>
        <p className="text-sm text-white/80 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center">
          <span className="text-sm font-medium">Explore</span>
          <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

// Variant for featured categories in a grid layout
export const CategoryCardGrid: React.FC<{
  categories: Array<Omit<CategoryCardProps, 'size' | 'accent'>>
}> = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, index) => (
        <CategoryCard 
          key={index}
          {...category}
          size="medium"
          accent={index === 0}
        />
      ))}
    </div>
  );
};

// Variant for featured destinations with large hero card and smaller side cards
export const FeaturedDestinationsGrid: React.FC<{
  featured: Omit<CategoryCardProps, 'size' | 'accent'>;
  destinations: Array<Omit<CategoryCardProps, 'size' | 'accent'>>;
}> = ({ featured, destinations }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Featured destination (large) */}
      <div className="lg:col-span-2">
        <CategoryCard 
          {...featured}
          size="large"
          accent={true}
        />
      </div>
      
      {/* Side destinations (smaller) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
        {destinations.slice(0, 2).map((destination, index) => (
          <CategoryCard 
            key={index}
            {...destination}
            size="small"
          />
        ))}
      </div>
    </div>
  );
};
