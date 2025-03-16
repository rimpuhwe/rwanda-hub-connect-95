
import { Hero } from '@/components/home/Hero';
import { FeaturedServices } from '@/components/home/FeaturedServices';
import { AboutRwanda } from '@/components/home/AboutRwanda';
import { BlogPreview } from '@/components/home/BlogPreview';
import { JobsPreview } from '@/components/home/JobsPreview';
import { Testimonials } from '@/components/home/Testimonials';
import { Partners } from '@/components/home/Partners';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturedServices />
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
