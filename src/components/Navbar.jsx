import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut, Menu, X, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/all-toys', label: 'All Toys' },
    { path: '/favorites', label: 'Favorites' },
    { path: '/profile', label: 'Profile' },
  ];

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <nav className={`sticky top-0 z-50 bg-white border-b border-gray-200 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="ToyTopia" className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-900">
              ToyTopia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? 'text-primary font-semibold' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold overflow-hidden border border-gray-300">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || 'User'} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      user.email?.charAt(0).toUpperCase() || 'U'
                    )}
                  </div>
                  <span className="font-medium text-gray-700 text-sm truncate max-w-[100px]">
                    Hi, {user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'Friend'}!
                  </span>
                </Link>
                <Button 
                  onClick={signOut} 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 px-3 py-1 text-sm"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button 
                  size="sm" 
                  className="gap-2 px-4 py-2"
                >
                  <User className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? 
              <X className="h-6 w-6 text-gray-600" /> : 
              <Menu className="h-6 w-6 text-gray-600" />
            }
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {user ? (
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Link to="/profile" className="flex items-center gap-2 flex-1">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold overflow-hidden border border-gray-300">
                        {user.photoURL ? (
                          <img 
                            src={user.photoURL} 
                            alt={user.displayName || 'User'} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          user.email?.charAt(0).toUpperCase() || 'U'
                        )}
                      </div>
                      <div className="truncate">
                        <p className="font-medium text-sm truncate max-w-[120px]">Hi, {user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'Friend'}!</p>
                      </div>
                    </Link>
                  </div>
                  <Button 
                    onClick={signOut} 
                    variant="outline" 
                    className="w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="px-4 py-3">
                  <Link 
                    to="/auth" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block"
                  >
                    <Button 
                      className="w-full"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
