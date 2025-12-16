import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Square, CheckCircle, Heart } from 'lucide-react';
import { Property } from '../types';
import { useAuth } from '../context/AuthContext';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { user, toggleSaveProperty, openLoginModal } = useAuth();

  const isSaved = user?.savedPropertyIds?.includes(property.id);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to details page
    e.stopPropagation();
    
    if (!user) {
      openLoginModal();
    } else {
      toggleSaveProperty(property.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full group relative">
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-200">
        <Link to={`/property/${property.id}`}>
            <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            />
        </Link>
        
        <div className="absolute top-3 left-3 flex gap-2">
           <span className="bg-brand-700 text-white text-xs font-semibold px-2 py-1 rounded shadow-sm">
            {property.category}
          </span>
          {property.verified && (
            <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded shadow-sm flex items-center gap-1">
              <CheckCircle size={12} /> Verified
            </span>
          )}
        </div>
        
        {/* Listed By Badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-bold px-2 py-1 rounded shadow-sm ${
            property.listedBy === 'Owner' 
              ? 'bg-blue-600 text-white' 
              : 'bg-orange-500 text-white'
          }`}>
            {property.listedBy === 'Owner' ? 'Owner Listed' : 'Broker Listed'}
          </span>
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="bg-gray-900/80 text-white text-sm font-bold px-3 py-1 rounded backdrop-blur-sm">
            ₹{property.rent.toLocaleString('en-IN')}/mo
          </span>
        </div>

        {/* Save Button */}
        <button
            onClick={handleHeartClick}
            className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 transition-colors shadow-sm focus:outline-none"
            title={isSaved ? "Remove from saved" : "Save property"}
        >
            <Heart size={18} className={isSaved ? "fill-red-500 text-red-500" : ""} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/property/${property.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 mb-1 hover:text-brand-700 transition-colors" title={property.title}>
            {property.title}
            </h3>
        </Link>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin size={14} className="mr-1 flex-shrink-0" />
          <span className="truncate">{property.address.locality}, {property.address.city}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-100 mt-auto">
          {property.bhk && (
            <div className="flex flex-col items-center justify-center text-center p-1">
              <BedDouble size={18} className="text-brand-600 mb-1" />
              <span className="text-xs text-gray-600 font-medium">{property.bhk} BHK</span>
            </div>
          )}
          <div className="flex flex-col items-center justify-center text-center p-1">
            <Square size={18} className="text-brand-600 mb-1" />
            <span className="text-xs text-gray-600 font-medium">{property.areaSqFt} sqft</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-1">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${property.furnishing === 'Furnished' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
               {property.furnishing === 'Semi-Furnished' ? 'Semi' : property.furnishing}
            </span>
          </div>
        </div>

        <Link
          to={`/property/${property.id}`}
          className="mt-4 w-full block text-center bg-transparent border border-brand-700 text-brand-700 font-medium py-2 rounded-lg hover:bg-brand-50 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;