
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { toast } from 'sonner';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useSelector } from '@/hooks/useRedux';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Use Redux for user state
  const userState = useSelector(state => state.auth.user);

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

  useEffect(() => {
    // Check if user is logged in from Redux or localStorage fallback
    const user = userState || localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') || '{}') : null;
    if (user) {
      setCurrentUser(user);
    }

    // Re-check on storage changes (for when user logs in/out in another tab)
    const handleStorageChange = () => {
      const user = localStorage.getItem('currentUser');
      if (user) {
        setCurrentUser(JSON.parse(user));
      } else {
        setCurrentUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [userState]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  const handleSearchSelect = (value: string) => {
    setIsSearchOpen(false);
    
    // Navigate based on the search result category
    if (value.startsWith('hotel:') || value.startsWith('airbnb:')) {
      const [type, id] = value.split(':');
      navigate(`/services/${type}/${id}`);
    } else if (value.startsWith('blog:')) {
      const id = value.replace('blog:', '');
      navigate(`/blog/${id}`);
    } else if (value.startsWith('job:')) {
      const id = value.replace('job:', '');
      navigate(`/jobs/${id}`);
    } else {
      // Default search results page
      navigate(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white py-3 shadow-md'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 z-10">
            <span className="font-display text-2xl font-bold text-rwandan-blue">
              Let's<span className="text-rwandan-green">Rwanda</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className="px-3 py-2 text-base font-medium text-gray-900 hover:text-rwandan-blue transition-colors">
                    Home
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 py-2 text-base font-medium text-gray-900 hover:text-rwandan-blue bg-transparent hover:bg-transparent focus:bg-transparent">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[500px] p-4 grid grid-cols-2 gap-3">
                      <Link to="/services/hotels" className="block p-3 hover:bg-gray-50 rounded-md">
                        <div className="font-medium mb-1">Hotels</div>
                        <p className="text-sm text-gray-500">Find the best hotels in Rwanda</p>
                      </Link>
                      <Link to="/services/airbnb" className="block p-3 hover:bg-gray-50 rounded-md">
                        <div className="font-medium mb-1">Vacation Rentals</div>
                        <p className="text-sm text-gray-500">Browse homes and private stays</p>
                      </Link>
                      <Link to="/services/tours" className="block p-3 hover:bg-gray-50 rounded-md">
                        <div className="font-medium mb-1">Tours & Guides</div>
                        <p className="text-sm text-gray-500">Explore with local guides</p>
                      </Link>
                      <Link to="/services/transportation" className="block p-3 hover:bg-gray-50 rounded-md">
                        <div className="font-medium mb-1">Transportation</div>
                        <p className="text-sm text-gray-500">Get around with ease</p>
                      </Link>
                      <Link to="/services" className="col-span-2 mt-2 text-center text-rwandan-blue hover:underline text-sm font-medium">
                        View All Services →
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 py-2 text-base font-medium text-gray-900 hover:text-rwandan-blue bg-transparent hover:bg-transparent focus:bg-transparent">
                    Discover Rwanda
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[500px] p-4 grid grid-cols-2 gap-3">
                      <Link to="/about/culture" className="block p-3 hover:bg-gray-50 rounded-md">
                        <div className="font-medium mb-1">Culture & Heritage</div>
                        <p className="text-sm text-gray-500">Explore Rwandan traditions</p>
                      </Link>
                      <Link to="/about/nature" className="block p-3 hover:bg-gray-50 rounded-md">
                        <div className="font-medium mb-1">Wildlife & Nature</div>
                        <p className="text-sm text-gray-500">Discover beautiful landscapes</p>
                      </Link>
                      <Link to="/about/cuisine" className="block p-3 hover:bg-gray-50 rounded-md">
                        <div className="font-medium mb-1">Food & Cuisine</div>
                        <p className="text-sm text-gray-500">Taste local flavors</p>
                      </Link>
                      <Link to="/about/history" className="block p-3 hover:bg-gray-50 rounded-md">
                        <div className="font-medium mb-1">History & Museums</div>
                        <p className="text-sm text-gray-500">Learn about Rwanda's past</p>
                      </Link>
                      <Link to="/about" className="col-span-2 mt-2 text-center text-rwandan-blue hover:underline text-sm font-medium">
                        About Rwanda →
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/blog" className="px-3 py-2 text-base font-medium text-gray-900 hover:text-rwandan-blue transition-colors">
                    Blog
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/jobs" className="px-3 py-2 text-base font-medium text-gray-900 hover:text-rwandan-blue transition-colors">
                    Jobs
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5 text-gray-700" />
            </button>
            
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-300">
                    <div className="h-8 w-8 bg-rwandan-blue text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{currentUser.fullName?.charAt(0) || 'U'}</span>
                    </div>
                    <span className="text-sm font-medium hidden lg:inline">{currentUser.fullName || 'User'}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <Link to="/account">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Account</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/account/bookings">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Bookings</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm py-2 px-4">
                  Log in
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
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
              'fixed inset-0 bg-white z-40 transform transition-all duration-300 ease-in-out lg:hidden',
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
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-bold uppercase text-gray-500 mb-2">Services</p>
                  <Link
                    to="/services/hotels"
                    className="block py-2 text-gray-900 hover:text-rwandan-blue transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Hotels
                  </Link>
                  <Link
                    to="/services/airbnb"
                    className="block py-2 text-gray-900 hover:text-rwandan-blue transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Vacation Rentals
                  </Link>
                  <Link
                    to="/services"
                    className="block py-2 text-rwandan-blue font-medium transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Services →
                  </Link>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-bold uppercase text-gray-500 mb-2">About Rwanda</p>
                  <Link
                    to="/about/culture"
                    className="block py-2 text-gray-900 hover:text-rwandan-blue transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Culture & Heritage
                  </Link>
                  <Link
                    to="/about/nature"
                    className="block py-2 text-gray-900 hover:text-rwandan-blue transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Wildlife & Nature
                  </Link>
                  <Link
                    to="/about"
                    className="block py-2 text-rwandan-blue font-medium transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About Rwanda →
                  </Link>
                </div>
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
                
                {currentUser ? (
                  <>
                    <Link
                      to="/account"
                      className="text-lg font-medium text-gray-900 hover:text-rwandan-blue transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="text-lg font-medium text-red-600 hover:text-red-700 transition-colors duration-300"
                    >
                      Log out
                    </button>
                  </>
                ) : (
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
                )}
              </nav>
            </div>
          </div>

          {/* Search Dialog */}
          <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <CommandInput placeholder="Search for accommodations, blogs, jobs..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Hotels">
                <CommandItem onSelect={() => handleSearchSelect('hotel:hotel-1')}>
                  <div className="flex flex-col">
                    <span>Kigali Marriott Hotel</span>
                    <span className="text-xs text-gray-500">Kigali City Center</span>
                  </div>
                </CommandItem>
                <CommandItem onSelect={() => handleSearchSelect('hotel:hotel-2')}>
                  <div className="flex flex-col">
                    <span>Serena Hotel Rwanda</span>
                    <span className="text-xs text-gray-500">Kiyovu, Kigali</span>
                  </div>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Airbnbs">
                <CommandItem onSelect={() => handleSearchSelect('airbnb:airbnb-1')}>
                  <div className="flex flex-col">
                    <span>Modern Lake Kivu Villa</span>
                    <span className="text-xs text-gray-500">Rubavu, Lake Kivu</span>
                  </div>
                </CommandItem>
                <CommandItem onSelect={() => handleSearchSelect('airbnb:airbnb-2')}>
                  <div className="flex flex-col">
                    <span>Cozy Musanze Cottage</span>
                    <span className="text-xs text-gray-500">Musanze, Northern Province</span>
                  </div>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Blogs">
                <CommandItem onSelect={() => handleSearchSelect('blog:1')}>
                  <div className="flex flex-col">
                    <span>10 Must-Visit Places in Rwanda</span>
                    <span className="text-xs text-gray-500">Travel Guide</span>
                  </div>
                </CommandItem>
                <CommandItem onSelect={() => handleSearchSelect('blog:2')}>
                  <div className="flex flex-col">
                    <span>Rwanda's Wildlife: What to Expect</span>
                    <span className="text-xs text-gray-500">Nature & Wildlife</span>
                  </div>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Jobs">
                <CommandItem onSelect={() => handleSearchSelect('job:1')}>
                  <div className="flex flex-col">
                    <span>Hotel Manager</span>
                    <span className="text-xs text-gray-500">Kigali Marriott Hotel</span>
                  </div>
                </CommandItem>
                <CommandItem onSelect={() => handleSearchSelect('job:2')}>
                  <div className="flex flex-col">
                    <span>Front Desk Receptionist</span>
                    <span className="text-xs text-gray-500">Radisson Blu Hotel</span>
                  </div>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
      </div>
    </header>
  );
};
