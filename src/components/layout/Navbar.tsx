
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'glass py-3 border-b border-white/10 shadow-sm'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 z-10">
          <span className="font-display text-2xl font-bold text-rwandan-blue">
            Let's<span className="text-rwandan-green">Rwanda</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-sm font-medium text-gray-900 hover:text-rwandan-blue transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="text-sm font-medium text-gray-900 hover:text-rwandan-blue transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-gray-900 hover:text-rwandan-blue transition-colors duration-300"
          >
            About Rwanda
          </Link>
          <Link
            to="/blog"
            className="text-sm font-medium text-gray-900 hover:text-rwandan-blue transition-colors duration-300"
          >
            Blog
          </Link>
          <Link
            to="/jobs"
            className="text-sm font-medium text-gray-900 hover:text-rwandan-blue transition-colors duration-300"
          >
            Jobs
          </Link>
        </nav>

        {/* Action buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300">
            <Search className="h-5 w-5 text-gray-700" />
          </button>
          <Link to="/login" className="btn-secondary text-sm py-2 px-4">
            Log in
          </Link>
          <Link to="/register" className="btn-primary text-sm py-2 px-4">
            Sign up
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>

        {/* Mobile menu */}
        <div
          className={cn(
            'fixed inset-0 bg-white z-40 transform transition-all duration-300 ease-in-out md:hidden',
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            <nav className="flex flex-col space-y-6 text-center">
              <Link
                to="/"
                className="text-lg font-medium text-gray-900 hover:text-rwandan-blue transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-lg font-medium text-gray-900 hover:text-rwandan-blue transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/about"
                className="text-lg font-medium text-gray-900 hover:text-rwandan-blue transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About Rwanda
              </Link>
              <Link
                to="/blog"
                className="text-lg font-medium text-gray-900 hover:text-rwandan-blue transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/jobs"
                className="text-lg font-medium text-gray-900 hover:text-rwandan-blue transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>
              <div className="pt-6 flex flex-col space-y-4">
                <Link
                  to="/login"
                  className="btn-secondary w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="btn-primary w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
