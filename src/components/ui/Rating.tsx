
import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export function Rating({
  value = 0,
  max = 5,
  size = 'md',
  readOnly = false,
  onChange,
  className
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };
  
  const handleClick = (index: number) => {
    if (!readOnly && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div 
      className={cn("flex items-center", className)}
      onMouseLeave={() => setHoverValue(null)}
    >
      {[...Array(max)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = hoverValue 
          ? starValue <= hoverValue 
          : starValue <= value;
          
        return (
          <span
            key={index}
            className={cn(
              "cursor-default inline-flex",
              !readOnly && "cursor-pointer"
            )}
            onClick={() => handleClick(index)}
            onMouseEnter={() => !readOnly && setHoverValue(starValue)}
          >
            <Star 
              className={cn(
                sizeClasses[size],
                "transition-colors",
                isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              )}
            />
          </span>
        );
      })}
      
      {value > 0 && (
        <span className="ml-1.5 text-sm font-medium text-gray-700">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
