import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">MakanOnRental</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              India's dedicated rental marketplace. Connect directly with owners. No brokerage, verified listings, simple process.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-500">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/search" className="hover:text-white transition">Search Homes</Link></li>
              <li><Link to="/list-property" className="hover:text-white transition">List Property</Link></li>
              <li><Link to="/rental-agreement" className="hover:text-white transition">Rental Agreement</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-500">Cities</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/search?city=Mumbai" className="hover:text-white transition">Rent in Mumbai</Link></li>
              <li><Link to="/search?city=Vadodara" className="hover:text-white transition">Rent in Vadodara</Link></li>
              <li><Link to="/search?city=Ahmedabad" className="hover:text-white transition">Rent in Ahmedabad</Link></li>
              <li><Link to="/search?city=Pune" className="hover:text-white transition">Rent in Pune</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-500">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <span>+91 9909563256</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <a href="mailto:kiranpatel860@gmail.com" className="hover:text-brand-500">kiranpatel860@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <Globe size={16} className="mt-0.5 flex-shrink-0" />
                <span>MakanOnRental.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>Vadodara, Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MakanOnRental. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;