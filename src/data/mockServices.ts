export interface Service {
  id: string;
  type: 'hotel' | 'airbnb';
  name: string;
  location: string;
  province: string;
  district: string;
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
    province: "Kigali City",
    district: "Nyarugenge",
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
    province: "Kigali City",
    district: "Kicukiro",
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
    province: "Kigali City",
    district: "Gasabo",
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
    province: "Western Province",
    district: "Rubavu",
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
    province: "Northern Province",
    district: "Musanze",
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
    province: "Kigali City",
    district: "Gasabo",
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
  },
  {
    id: "hotel-kigali-serena",
    type: "hotel",
    name: "Kigali Serena Hotel",
    location: "Kigali",
    province: "Kigali City",
    district: "Kicukiro",
    price: 220,
    currency: "USD",
    rating: 4.8,
    reviewCount: 275,
    description: "The Kigali Serena Hotel is a 5-star luxury hotel located in Rwanda's capital city, offering elegant accommodations and world-class amenities.",
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Bar", "Conference Facilities", "Fitness Center"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 3,
    beds: 2,
    bathrooms: 2,
    acceptsPets: false
  },
  {
    id: "hotel-radisson-blu",
    type: "hotel",
    name: "Radisson Blu Hotel & Convention Centre",
    location: "Kigali",
    province: "Kigali City",
    district: "Gasabo",
    price: 200,
    currency: "USD",
    rating: 4.7,
    reviewCount: 245,
    description: "The Radisson Blu Hotel & Convention Centre in Kigali offers modern accommodations with a state-of-the-art convention center, perfect for business travelers.",
    amenities: ["Free WiFi", "Swimming Pool", "Convention Center", "Restaurant", "Bar", "Fitness Center", "Business Center"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 4,
    beds: 3,
    bathrooms: 2,
    acceptsPets: false
  },
  {
    id: "hotel-des-mille-collines",
    type: "hotel",
    name: "Hôtel Des Mille Collines",
    location: "Kigali",
    province: "Kigali City",
    district: "Nyarugenge",
    price: 170,
    currency: "USD",
    rating: 4.5,
    reviewCount: 320,
    description: "The historic Hôtel Des Mille Collines, known from the film 'Hotel Rwanda', offers comfortable rooms and a swimming pool in the heart of Kigali.",
    amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Bar", "Conference Rooms", "Garden", "Tennis Court"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 2,
    beds: 2,
    bathrooms: 1,
    acceptsPets: false
  },
  {
    id: "hotel-kigali-marriott",
    type: "hotel",
    name: "Kigali Marriott Hotel",
    location: "Kigali",
    province: "Kigali City",
    district: "Nyarugenge",
    price: 190,
    currency: "USD",
    rating: 4.7,
    reviewCount: 210,
    description: "The Kigali Marriott Hotel offers luxurious accommodations with modern amenities and impeccable service in Rwanda's vibrant capital city.",
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Bar", "Fitness Center", "Business Center"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 3,
    beds: 2,
    bathrooms: 2,
    acceptsPets: false
  },
  {
    id: "hotel-park-inn",
    type: "hotel",
    name: "Park Inn by Radisson Kigali",
    location: "Kigali",
    province: "Kigali City",
    district: "Gasabo",
    price: 160,
    currency: "USD",
    rating: 4.6,
    reviewCount: 195,
    description: "The Park Inn by Radisson Kigali offers modern, colorful rooms with all amenities needed for a comfortable stay in Rwanda's capital.",
    amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Bar", "Fitness Center", "Business Center", "Meeting Rooms"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 2,
    beds: 2,
    bathrooms: 1,
    acceptsPets: true
  },
  {
    id: "hotel-lemigo",
    type: "hotel",
    name: "Lemigo Hotel",
    location: "Kigali",
    province: "Kigali City",
    district: "Gasabo",
    price: 150,
    currency: "USD",
    rating: 4.4,
    reviewCount: 180,
    description: "Lemigo Hotel offers comfortable accommodations with modern amenities, including a swimming pool and multiple dining options in Kigali.",
    amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Bar", "Fitness Center", "Conference Center", "Business Center"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 2,
    beds: 1,
    bathrooms: 1,
    acceptsPets: false
  },
  {
    id: "hotel-gorillas",
    type: "hotel",
    name: "Gorillas Hotel",
    location: "Kigali",
    province: "Kigali City",
    district: "Kicukiro",
    price: 130,
    currency: "USD",
    rating: 4.3,
    reviewCount: 165,
    description: "Gorillas Hotel offers comfortable accommodations with modern amenities in a convenient location in Kigali.",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Conference Rooms", "Business Center", "Airport Shuttle", "Parking"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 2,
    beds: 2,
    bathrooms: 1,
    acceptsPets: false
  },
  {
    id: "lodge-bisate",
    type: "hotel",
    name: "Bisate Lodge",
    location: "Volcanoes National Park",
    province: "Northern Province",
    district: "Musanze",
    price: 350,
    currency: "USD",
    rating: 4.9,
    reviewCount: 120,
    description: "Bisate Lodge offers luxury accommodations in eco-friendly villas with stunning views of the Volcanoes National Park, perfect for gorilla trekking.",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Spa", "Guided Tours", "Laundry Service", "Mountain Views"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 1,
    beds: 1,
    bathrooms: 1,
    acceptsPets: false
  },
  {
    id: "lodge-sabyinyo",
    type: "hotel",
    name: "Sabyinyo Silverback Lodge",
    location: "Volcanoes National Park",
    province: "Northern Province",
    district: "Musanze",
    price: 380,
    currency: "USD",
    rating: 4.9,
    reviewCount: 105,
    description: "Sabyinyo Silverback Lodge offers luxury cottages with fireplaces and spectacular views of the Virunga Volcanoes, ideal for gorilla trekking expeditions.",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Fireplace", "Guided Tours", "Laundry Service", "Mountain Views"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 1,
    beds: 1,
    bathrooms: 1,
    acceptsPets: false
  },
  {
    id: "lodge-virunga",
    type: "hotel",
    name: "Virunga Lodge",
    location: "Near Volcanoes National Park",
    province: "Northern Province",
    district: "Musanze",
    price: 340,
    currency: "USD",
    rating: 4.8,
    reviewCount: 95,
    description: "Virunga Lodge offers luxurious eco-friendly bandas with breathtaking views of the Virunga Volcanoes and Lakes Ruhondo and Bulera.",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Guided Tours", "Massage", "Laundry Service", "Lake Views"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 1,
    beds: 1,
    bathrooms: 1,
    acceptsPets: false
  },
  {
    id: "lodge-one-and-only-gorilla",
    type: "hotel",
    name: "One&Only Gorilla's Nest",
    location: "Near Volcanoes National Park",
    province: "Northern Province",
    district: "Musanze",
    price: 400,
    currency: "USD",
    rating: 4.9,
    reviewCount: 85,
    description: "One&Only Gorilla's Nest offers luxury accommodations nestled among eucalyptus trees, providing an exclusive gateway to gorilla trekking experiences.",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Spa", "Pool", "Guided Tours", "Private Terraces"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 1,
    beds: 1,
    bathrooms: 1,
    acceptsPets: false
  },
  {
    id: "lodge-one-and-only-nyungwe",
    type: "hotel",
    name: "One&Only Nyungwe House",
    location: "Nyungwe Forest National Park",
    province: "Western Province",
    district: "Nyamasheke",
    price: 380,
    currency: "USD",
    rating: 4.9,
    reviewCount: 80,
    description: "One&Only Nyungwe House offers luxury accommodations on a working tea plantation on the edge of Nyungwe Forest National Park.",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Spa", "Pool", "Guided Forest Walks", "Tea Plantation Tours"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 1,
    beds: 1,
    bathrooms: 1,
    acceptsPets: false
  },
  {
    id: "camp-magashi",
    type: "hotel",
    name: "Magashi Camp",
    location: "Akagera National Park",
    province: "Eastern Province",
    district: "Kayonza",
    price: 320,
    currency: "USD",
    rating: 4.8,
    reviewCount: 75,
    description: "Magashi Camp offers luxury tented accommodations with views of Lake Rwanyakazinga in Akagera National Park, perfect for wildlife enthusiasts.",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Game Drives", "Boat Safaris", "Bird Watching", "Lake Views"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 1,
    beds: 1,
    bathrooms: 1,
    acceptsPets: false
  },
  {
    id: "hotel-lake-kivu-serena",
    type: "hotel",
    name: "Lake Kivu Serena Hotel",
    location: "Gisenyi (Rubavu)",
    province: "Western Province",
    district: "Rubavu",
    price: 190,
    currency: "USD",
    rating: 4.7,
    reviewCount: 140,
    description: "Lake Kivu Serena Hotel offers comfortable accommodations with a private beach on the shores of Lake Kivu in Rwanda's western province.",
    amenities: ["Free WiFi", "Swimming Pool", "Private Beach", "Restaurant", "Bar", "Water Sports", "Spa"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 2,
    beds: 2,
    bathrooms: 1,
    acceptsPets: true
  },
  {
    id: "hotel-bishops-house",
    type: "hotel",
    name: "The Bishop's House",
    location: "Near Volcanoes National Park",
    province: "Northern Province",
    district: "Musanze",
    price: 280,
    currency: "USD",
    rating: 4.7,
    reviewCount: 90,
    description: "The Bishop's House is a boutique hotel converted from a historic building, offering comfortable accommodations near Volcanoes National Park.",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Garden", "Guided Tours", "Airport Shuttle", "Mountain Views"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 2,
    beds: 1,
    bathrooms: 1,
    acceptsPets: false
  },
  {
    id: "hotel-mantis-kivu",
    type: "hotel",
    name: "Mantis Kivu Marina Bay Hotel",
    location: "Rusizi",
    province: "Western Province",
    district: "Rusizi",
    price: 180,
    currency: "USD",
    rating: 4.6,
    reviewCount: 110,
    description: "Mantis Kivu Marina Bay Hotel offers elegant accommodations with lake views and modern amenities in Rusizi on the southern shores of Lake Kivu.",
    amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Bar", "Marina", "Water Sports", "Lake Views"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 2,
    beds: 2,
    bathrooms: 1,
    acceptsPets: true
  },
  {
    id: "hotel-heaven-rwanda",
    type: "hotel",
    name: "Heaven Rwanda",
    location: "Kigali",
    province: "Kigali City",
    district: "Nyarugenge",
    price: 140,
    currency: "USD",
    rating: 4.5,
    reviewCount: 170,
    description: "Heaven Rwanda offers boutique accommodations with a renowned restaurant serving international cuisine with local ingredients in Kigali.",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Garden", "Airport Shuttle", "City Views", "Gift Shop"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 2,
    beds: 1,
    bathrooms: 1,
    acceptsPets: false
  },
  {
    id: "hotel-mythos",
    type: "hotel",
    name: "Mythos Boutique Hotel",
    location: "Kigali",
    province: "Kigali City",
    district: "Gasabo",
    price: 130,
    currency: "USD",
    rating: 4.4,
    reviewCount: 155,
    description: "Mythos Boutique Hotel offers comfortable accommodations with a Mediterranean-inspired restaurant in a quiet residential area of Kigali.",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Airport Shuttle", "Garden", "Meeting Room", "Laundry Service"],
    images: [],
    availableDates: [
      { from: "2023-06-01", to: "2023-12-31" }
    ],
    rooms: 2,
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

export const getProvinces = (): string[] => {
  const provinces = [...new Set(services.map(service => service.province))];
  return provinces.sort();
};

export

