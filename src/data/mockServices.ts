
export interface Service {
  id: string;
  type: 'hotel' | 'airbnb';
  name: string;
  location: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  description: string;
  amenities: string[];
  images: string[];
  availableDates?: { from: string; to: string }[];
  rooms?: number;
  beds?: number;
  bathrooms?: number;
  acceptsPets?: boolean;
}

export const services: Service[] = [
  {
    id: "hotel-1",
    type: "hotel",
    name: "Kigali Marriott Hotel",
    location: "Kigali City Center",
    price: 150,
    currency: "USD",
    rating: 4.8,
    reviewCount: 243,
    description: "A luxurious 5-star hotel located in the heart of Kigali. Offering panoramic views of the city's stunning hills, world-class amenities, and exceptional service.",
    amenities: ["Free WiFi", "Swimming Pool", "Fitness Center", "Restaurant", "Bar", "Conference Room", "Spa"],
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
      "https://images.unsplash.com/photo-1606402179428-a57976d71fa4"
    ],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 2,
    beds: 1,
    bathrooms: 1,
    acceptsPets: false
  },
  {
    id: "hotel-2",
    type: "hotel",
    name: "Serena Hotel Rwanda",
    location: "Kiyovu, Kigali",
    price: 200,
    currency: "USD",
    rating: 4.9,
    reviewCount: 312,
    description: "Set in an elegant garden environment, Serena Hotel Rwanda combines the warmth of Rwandan hospitality with 5-star luxury and amenities.",
    amenities: ["Free WiFi", "Outdoor Pool", "Spa", "Fitness Center", "Restaurant", "Business Center", "Airport Shuttle"],
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
      "https://images.unsplash.com/photo-1519449556851-5720b33024e7",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
    ],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 1,
    beds: 2,
    bathrooms: 1,
    acceptsPets: false
  },
  {
    id: "hotel-3",
    type: "hotel",
    name: "The Retreat by Heaven",
    location: "Kiyovu, Kigali",
    price: 280,
    currency: "USD",
    rating: 4.7,
    reviewCount: 189,
    description: "Rwanda's first eco-luxury hotel with solar-powered rooms, locally crafted furniture, and organic cuisine served from its farm-to-table restaurant.",
    amenities: ["Free WiFi", "Solar Heated Saltwater Pool", "Spa", "Organic Restaurant", "Bar", "Garden", "Air Conditioning"],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd",
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c"
    ],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 2,
    beds: 2,
    bathrooms: 2,
    acceptsPets: true
  },
  {
    id: "airbnb-1",
    type: "airbnb",
    name: "Modern Lake Kivu Villa",
    location: "Rubavu, Lake Kivu",
    price: 120,
    currency: "USD",
    rating: 4.9,
    reviewCount: 87,
    description: "A stunning villa with direct access to Lake Kivu. Enjoy breathtaking sunset views from the private terrace and take advantage of water activities right at your doorstep.",
    amenities: ["Free WiFi", "Lake View", "Kitchen", "Private Beach Access", "Terrace", "Parking", "BBQ Grill"],
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
      "https://images.unsplash.com/photo-1544984243-ec57ea16fe25",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d"
    ],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 3,
    beds: 2,
    bathrooms: 2,
    acceptsPets: true
  },
  {
    id: "airbnb-2",
    type: "airbnb",
    name: "Cozy Musanze Cottage",
    location: "Musanze, Northern Province",
    price: 85,
    currency: "USD",
    rating: 4.7,
    reviewCount: 56,
    description: "A charming cottage nestled in the Volcanoes National Park area. Perfect base for gorilla trekking and exploring the northern region of Rwanda.",
    amenities: ["Free WiFi", "Garden", "Mountain View", "Kitchen", "Fireplace", "Parking", "Breakfast"],
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      "https://images.unsplash.com/photo-1593604340846-4fbe9655f56e"
    ],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 2,
    beds: 1,
    bathrooms: 1,
    acceptsPets: false
  },
  {
    id: "airbnb-3",
    type: "airbnb",
    name: "Luxury Apartment in Kigali",
    location: "Nyarutarama, Kigali",
    price: 95,
    currency: "USD",
    rating: 4.8,
    reviewCount: 124,
    description: "A modern, fully-equipped luxury apartment in the upscale Nyarutarama district. Experience city living with all comforts and amenities.",
    amenities: ["Free WiFi", "Pool", "Gym Access", "Kitchen", "Balcony", "Air Conditioning", "Security"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1560185008-cde6e1238d16"
    ],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 1,
    beds: 1,
    bathrooms: 1,
    acceptsPets: true
  }
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getServicesByType = (type?: string): Service[] => {
  if (!type || type === 'all') return services;
  return services.filter(service => service.type === type);
};
