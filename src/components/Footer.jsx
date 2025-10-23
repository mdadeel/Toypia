import { Heart, Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-8 sm:mt-12 md:mt-16">
      <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="ToyTopia" className="h-6 sm:h-8 w-6 sm:w-8" />
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                ToyTopia
              </span>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              Your trusted local toy store in Bangladesh. Connecting families with quality toys for children of all ages. Visit our physical store in Agrabad, Chittagong.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a href="https://www.facebook.com/badshahnawas.adeel" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                <Facebook className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-gray-700" />
              </a>
              <a href="https://www.linkedin.com/in/shahnawasadee1" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                <Linkedin className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-gray-700" />
              </a>
              <a href="https://www.instagram.com/shahnawas.adeel" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                <Instagram className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-gray-700" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-bold text-base sm:text-lg text-gray-900">Quick Links</h3>
            <div className="space-y-1.5 sm:space-y-2">
              <Link to="/" className="block text-gray-600 hover:text-primary transition-colors text-sm sm:text-base">
                Home
              </Link>
              <Link to="/profile" className="block text-gray-600 hover:text-primary transition-colors text-sm sm:text-base">
                My Profile
              </Link>
              <Link to="/auth" className="block text-gray-600 hover:text-primary transition-colors text-sm sm:text-base">
                Login
              </Link>
              <Link to="/favorites" className="block text-gray-600 hover:text-primary transition-colors text-sm sm:text-base">
                Favorites
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-bold text-base sm:text-lg text-gray-900">Legal</h3>
            <div className="space-y-1.5 sm:space-y-2">
              <a href="#" className="block text-gray-600 hover:text-primary transition-colors text-sm sm:text-base">
                Terms of Service
              </a>
              <a href="#" className="block text-gray-600 hover:text-primary transition-colors text-sm sm:text-base">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-600 hover:text-primary transition-colors text-sm sm:text-base">
                Refund Policy
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-bold text-base sm:text-lg text-gray-900">Contact Us</h3>
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-start gap-2 sm:gap-3">
                <Mail className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-xs sm:text-sm break-words">mdadeel125@gmail.com</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Phone className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-xs sm:text-sm">+88 018 5555 5555</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-xs sm:text-sm">Agrabad, Chittagong</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-gray-200 flex flex-col items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
            <span>Made with</span>
            <Heart className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-red-500 fill-current" />
            <span>© 2025 ToyTopia Bangladesh. All rights reserved.</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 text-center">
            <p>Bringing joy to children across Bangladesh, one toy at a time.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
