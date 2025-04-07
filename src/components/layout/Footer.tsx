
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { separatorFile } from '@/components/ui/separator';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Slanted separator for visual interest */}
      <div className="relative h-16">
        <div className="absolute inset-0 bg-white transform -skew-y-2 origin-top-right"></div>
      </div>
      
      {/* Newsletter Section */}
      <div className="bg-rwandan-blue py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-6 lg:mb-0 text-center lg:text-left">
              <h3 className="text-2xl font-display font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-white/80">Stay updated with travel tips and special offers</p>
            </div>
            <div className="w-full lg:w-auto">
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 rounded-l-md border-0 text-gray-900"
                />
                <button type="submit" className="bg-rwandan-green hover:bg-rwandan-green/90 text-white px-6 py-3 font-medium rounded-r-md transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-display text-2xl font-bold text-white">
                Let's<span className="text-rwandan-green">Rwanda</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your all-in-one gateway to Rwanda's private sector services.
              Discover, connect, and experience the best of Rwanda.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-white">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/hotels" className="text-gray-400 text-sm hover:text-rwandan-green transition-colors">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/services/airbnb" className="text-gray-400 text-sm hover:text-rwandan-green transition-colors">
                  Vacation Rentals
                </Link>
              </li>
              <li>
                <Link to="/services/tours" className="text-gray-400 text-sm hover:text-rwandan-green transition-colors">
                  Tours & Activities
                </Link>
              </li>
              <li>
                <Link to="/services/dining" className="text-gray-400 text-sm hover:text-rwandan-green transition-colors">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/services/transportation" className="text-gray-400 text-sm hover:text-rwandan-green transition-colors">
                  Transportation
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 text-sm hover:text-rwandan-green transition-colors">
                  All Services
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-white">Explore Rwanda</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 text-sm hover:text-rwandan-green transition-colors">
                  About Rwanda
                </Link>
              </li>
              <li>
                <Link to="/about/culture" className="text-gray-400 text-sm hover:text-rwandan-green transition-colors">
                  Culture & Heritage
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 text-sm hover:text-rwandan-green transition-colors">
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link to="/about/wildlife" className="text-gray-400 text-sm hover:text-rwandan-green transition-colors">
                  Wildlife & Nature
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-400 text-sm hover:text-rwandan-green transition-colors">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-400 text-sm hover:text-rwandan-green transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-rwandan-green mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Kigali, Rwanda<br />KG 123 St</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-rwandan-green flex-shrink-0" />
                <span className="text-gray-400 text-sm">+250 781 234 567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-rwandan-green flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@letsrwanda.com</span>
              </li>
              
              <li className="pt-4">
                <a href="/contact" className="px-4 py-2 border border-rwandan-green text-rwandan-green text-sm font-medium rounded hover:bg-rwandan-green hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Let's Rwanda. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-500 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-500 text-sm hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
