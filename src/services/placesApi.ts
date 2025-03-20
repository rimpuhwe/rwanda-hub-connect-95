import { toast } from "sonner";
import { services, getServicesByType, filterServicesByLocation } from "@/data/mockServices";

// Define the response type for Google Places API
export interface PlaceResult {
  place_id: string;
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos?: {
    photo_reference: string;
    height: number;
    width: number;
    html_attributions: string[];
  }[];
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  types: string[];
  business_status?: string;
}

interface PlacesResponse {
  results: PlaceResult[];
  status: string;
  next_page_token?: string;
}

// Placeholder images for services without images
const placeholderImages = [
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
  "https://images.unsplash.com/photo-1524230572899-a752b3835840",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
];

// Fetch accommodations based on location
export const fetchAccommodations = async (
  province: string,
  district?: string,
  type: 'lodging' | 'restaurant' | 'establishment' = 'lodging'
): Promise<PlaceResult[]> => {
  try {
    // Instead of API, get data from mock services
    let filteredServices = getServicesByType();
    
    // Apply province and district filters if provided
    if (province !== 'Rwanda') {
      filteredServices = filterServicesByLocation(filteredServices, province, district);
    }
    
    // Map our services to the PlaceResult format
    const results: PlaceResult[] = filteredServices.map(service => ({
      place_id: service.id,
      name: service.name,
      vicinity: `${service.location}, ${service.district} District, ${service.province}`,
      geometry: {
        location: {
          lat: 0, // We don't have actual coordinates in the mock data
          lng: 0,
        },
      },
      photos: service.images.map(img => ({
        photo_reference: img,
        height: 400,
        width: 600,
        html_attributions: [],
      })),
      rating: service.rating,
      user_ratings_total: service.reviewCount,
      price_level: service.price > 200 ? 3 : service.price > 100 ? 2 : 1,
      types: [service.type === 'hotel' ? 'lodging' : 'apartment'],
      business_status: 'OPERATIONAL',
    }));
    
    return results;
  } catch (error) {
    console.error('Error fetching places:', error);
    toast.error('Failed to fetch accommodations');
    return [];
  }
};

// Get photo URL from photo reference
export const getPhotoUrl = (photoReference: string, maxWidth = 400): string => {
  // If it's already a URL, return it
  if (photoReference.startsWith('http')) {
    return photoReference;
  }
  
  // Otherwise return a random placeholder
  return placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
};

// Convert price level to actual price (estimation)
export const getPriceFromLevel = (priceLevel?: number): number => {
  if (priceLevel === undefined) return 100; // Default price
  
  const basePrices = {
    0: 50, // Free/cheap
    1: 80, // Inexpensive
    2: 120, // Moderate
    3: 200, // Expensive
    4: 300, // Very expensive
  };
  
  return basePrices[priceLevel as keyof typeof basePrices] || 100;
};

// Map Google Places result to our service format
export const mapPlaceToService = (place: PlaceResult, type: 'hotel' | 'airbnb' = 'hotel') => {
  const isHotel = place.types.some(t => 
    t === 'lodging' || t === 'hotel' || t === 'resort'
  );
  
  return {
    id: place.place_id,
    placeId: place.place_id,
    type: isHotel ? 'hotel' : 'airbnb',
    title: place.name,
    location: place.vicinity,
    vicinity: place.vicinity,
    province: place.vicinity?.split(',').pop()?.trim() || 'Rwanda',
    district: place.vicinity?.split(',')[1]?.trim() || 'Unknown',
    image: place.photos?.length 
      ? getPhotoUrl(place.photos[0].photo_reference)
      : placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
    rating: place.rating || 4.0,
    pricePerNight: getPriceFromLevel(place.price_level),
    rooms: Math.floor(Math.random() * 3) + 1, // Random number of rooms between 1-3
    beds: Math.floor(Math.random() * 2) + 1, // Random number of beds between 1-2
    bathrooms: Math.floor(Math.random() * 2) + 1, // Random number of bathrooms between 1-2
    acceptsPets: Math.random() > 0.5, // Randomly true or false
  };
};
