
import { useState } from 'react';
import { CategoryCardGrid } from '@/components/ui/CategoryCard';

// Featured categories data
const categories = [
  {
    title: "Hotels & Resorts",
    description: "Find luxury accommodations and world-class service across Rwanda",
    imageSrc: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
    url: "/services/hotels"
  },
  {
    title: "Vacation Rentals",
    description: "Discover unique homes and private stays for an authentic experience",
    imageSrc: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070",
    url: "/services/airbnb"
  },
  {
    title: "Wildlife Tours",
    description: "Experience unforgettable encounters with Rwanda's incredible wildlife",
    imageSrc: "https://images.unsplash.com/photo-1544646626-91855325e415?q=80&w=1935",
    url: "/services/tours/wildlife"
  },
  {
    title: "Cultural Experiences",
    description: "Immerse yourself in Rwanda's rich cultural heritage and traditions",
    imageSrc: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2071",
    url: "/services/tours/cultural"
  },
  {
    title: "Food & Dining",
    description: "Taste the flavors of Rwanda with the best restaurants and dining experiences",
    imageSrc: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?q=80&w=2070",
    url: "/services/dining"
  },
  {
    title: "Transportation",
    description: "Convenient and reliable transportation options for exploring Rwanda",
    imageSrc: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2044",
    url: "/services/transportation"
  }
];

export const FeaturedServices = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter categories based on selection
  const filteredCategories = selectedCategory === 'all' 
    ? categories 
    : categories.filter(cat => cat.title.toLowerCase().includes(selectedCategory.toLowerCase()));
  
  return (
    <section className="section-spacing pb-0" id="services">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="inline-block bg-rwandan-green/10 text-rwandan-green text-sm font-medium py-1 px-3 rounded-full mb-4">
            Our Services
          </span>
          <h2 className="heading-2 text-gray-900 mb-4">
            Discover What Rwanda Has to Offer
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our wide range of services designed to make your Rwandan adventure comfortable, 
            memorable, and truly exceptional.
          </p>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
              ${selectedCategory === 'all' 
                ? 'bg-rwandan-blue text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setSelectedCategory('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
              ${selectedCategory === 'hotel' 
                ? 'bg-rwandan-blue text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setSelectedCategory('hotel')}
          >
            Hotels
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
              ${selectedCategory === 'rental' 
                ? 'bg-rwandan-blue text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setSelectedCategory('rental')}
          >
            Vacation Rentals
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
              ${selectedCategory === 'tour' 
                ? 'bg-rwandan-blue text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setSelectedCategory('tour')}
          >
            Tours
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
              ${selectedCategory === 'food' 
                ? 'bg-rwandan-blue text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setSelectedCategory('food')}
          >
            Food & Dining
          </button>
        </div>
        
        {/* Category Cards Grid */}
        <CategoryCardGrid categories={filteredCategories} />
        
        {/* Call to action */}
        <div className="text-center mt-12 mb-16">
          <a href="/services" className="btn-primary inline-flex items-center space-x-2 py-3 px-6">
            <span>View All Services</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
