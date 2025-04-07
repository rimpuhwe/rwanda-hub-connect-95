
import { Hero } from '@/components/home/Hero';
import { FeaturedServices } from '@/components/home/FeaturedServices';
import { AboutRwanda } from '@/components/home/AboutRwanda';
import { BlogPreview } from '@/components/home/BlogPreview';
import { JobsPreview } from '@/components/home/JobsPreview';
import { Testimonials } from '@/components/home/Testimonials';
import { Partners } from '@/components/home/Partners';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FeaturedDestinationsGrid } from '@/components/ui/CategoryCard';
import { ServiceCardGrid } from '@/components/ui/ServiceCardEnhanced';
import { useQuery } from '@tanstack/react-query';
import { useServices } from '@/hooks/useServices';
import { useSelector } from '@/hooks/useRedux';

// Featured destinations for the main highlight section
const featuredDestination = {
  title: "Volcanoes National Park",
  description: "Home to endangered mountain gorillas and stunning hiking trails through lush forests and volcanic landscapes",
  imageSrc: "https://images.unsplash.com/photo-1590149884999-3ce5673c03d7?q=80&w=2069",
  url: "/about/volcanoes-national-park"
};

const sideDestinations = [
  {
    title: "Lake Kivu",
    description: "Rwanda's largest lake offering beautiful beaches and water activities",
    imageSrc: "https://images.unsplash.com/photo-1624620423909-c51e4ad7acd0?q=80&w=2069",
    url: "/about/lake-kivu"
  },
  {
    title: "Kigali City",
    description: "Rwanda's vibrant capital with cultural sites, museums, and excellent dining",
    imageSrc: "https://images.unsplash.com/photo-1579016761563-ab99a812389e?q=80&w=2070",
    url: "/about/kigali"
  }
];

const Index = () => {
  // Use Redux for UI state
  const uiState = useSelector(state => state.ui);
  
  // Use TanStack Query to fetch top-rated services
  const { data: services, isLoading } = useServices({ featured: true, limit: 4 });
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        
        {/* Featured Destinations Section */}
        <section className="section-spacing" id="featured-destinations">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="inline-block bg-rwandan-accent/10 text-rwandan-accent text-sm font-medium py-1 px-3 rounded-full mb-4">
                Featured Destinations
              </span>
              <h2 className="heading-2 text-gray-900 mb-4">
                Explore Rwanda's Hidden Gems
              </h2>
              <p className="text-gray-600 text-lg">
                From mountain gorillas to scenic lakes, discover the most breathtaking destinations Rwanda has to offer.
              </p>
            </div>
            
            <FeaturedDestinationsGrid 
              featured={featuredDestination}
              destinations={sideDestinations}
            />
          </div>
        </section>
        
        <FeaturedServices />
        
        {/* Top-Rated Services Section */}
        <section className="section-spacing bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="inline-block bg-rwandan-blue/10 text-rwandan-blue text-sm font-medium py-1 px-3 rounded-full mb-4">
                Top Rated
              </span>
              <h2 className="heading-2 text-gray-900 mb-4">
                Highly Recommended Experiences
              </h2>
              <p className="text-gray-600 text-lg">
                Curated selection of Rwanda's best accommodations and experiences, as rated by our users.
              </p>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-xl shadow animate-pulse h-72"></div>
                ))}
              </div>
            ) : services ? (
              <ServiceCardGrid services={services} />
            ) : null}
          </div>
        </section>
        
        <AboutRwanda />
        <Testimonials />
        <BlogPreview />
        <Partners />
        <JobsPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
