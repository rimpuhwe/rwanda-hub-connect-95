
import { toast } from "sonner";

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

// We need to use a proxy because client-side requests to Google Places API are not allowed due to CORS
const API_PROXY_URL = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place';
const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY_HERE'; // Replace with your actual API key

// Fetch accommodations based on location
export const fetchAccommodations = async (
  province: string,
  district?: string,
  type: 'lodging' | 'restaurant' | 'establishment' = 'lodging'
): Promise<PlaceResult[]> => {
  try {
    // Construct the search query based on province and district
    const locationQuery = district 
      ? `${district} district, ${province} province, Rwanda`
      : `${province} province, Rwanda`;
    
    const params = new URLSearchParams({
      key: GOOGLE_API_KEY,
      location: '-1.9403,29.8739', // Default to Rwanda's coordinates
      radius: '50000', // 50km radius
      type,
      keyword: locationQuery,
    });
    
    const response = await fetch(`${API_PROXY_URL}/nearbysearch/json?${params}`);
    const data: PlacesResponse = await response.json();
    
    if (data.status !== 'OK') {
      console.error('Error fetching places:', data.status);
      toast.error('Failed to fetch accommodations');
      return [];
    }
    
    return data.results;
  } catch (error) {
    console.error('Error fetching places:', error);
    toast.error('Failed to fetch accommodations');
    return [];
  }
};

// Get photo URL from photo reference
export const getPhotoUrl = (photoReference: string, maxWidth = 400): string => {
  if (!photoReference) {
    return 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'; // Fallback image
  }
  
  return `${API_PROXY_URL}/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;
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
    province: 'Rwanda', // We'll extract this from the location if possible
    district: place.vicinity?.split(',').pop()?.trim() || 'Unknown',
    image: place.photos?.length 
      ? getPhotoUrl(place.photos[0].photo_reference)
      : 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
    rating: place.rating || 4.0,
    pricePerNight: getPriceFromLevel(place.price_level),
    rooms: Math.floor(Math.random() * 3) + 1, // Random number of rooms between 1-3
    beds: Math.floor(Math.random() * 2) + 1, // Random number of beds between 1-2
    bathrooms: Math.floor(Math.random() * 2) + 1, // Random number of bathrooms between 1-2
    acceptsPets: Math.random() > 0.5, // Randomly true or false
  };
};
