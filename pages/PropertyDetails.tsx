import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Check, User, Phone, AlertCircle, Share2, 
  Heart, Flag, CheckCircle, Facebook, Twitter, Linkedin, Copy, MessageCircle, X, Briefcase 
} from 'lucide-react';
import { SAMPLE_PROPERTIES } from '../services/mockData';
import { useAuth } from '../context/AuthContext';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = SAMPLE_PROPERTIES.find(p => p.id === id);
  const [interestSent, setInterestSent] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Auth Context
  const { isAuthenticated, openLoginModal, user, toggleSaveProperty } = useAuth();

  // Form State
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  // Derived state
  const isSaved = user?.savedPropertyIds?.includes(property?.id || '');

  // Auto-fill form data if user is logged in
  useEffect(() => {
    if (user) {
        setUserName(user.name || '');
        setUserPhone(user.phone || '');
    }
  }, [user]);

  if (!property) {
    return <div className="p-10 text-center">Property not found. <Link to="/" className="text-brand-600">Go Home</Link></div>;
  }

  const handleShowInterest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
        openLoginModal();
        return;
    }

    if(userName && userPhone) {
      // Simulate API call
      setTimeout(() => {
        setInterestSent(true);
        setShowPhone(true);
      }, 1000);
    }
  };

  const handleSave = () => {
    if (isAuthenticated) {
        toggleSaveProperty(property.id);
    } else {
        openLoginModal();
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this property on MakanOnRental: ${property.title} - ₹${property.rent.toLocaleString()}/mo`;
    
    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
         const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
         if (isMobile) {
             shareUrl = `whatsapp://send?text=${encodeURIComponent(text + ' ' + url)}`;
         } else {
             shareUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
         }
         break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        }).catch(() => {
            alert('Failed to copy link.');
        });
        setShowShareMenu(false);
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
    setShowShareMenu(false);
  };

  const inputClass = "block w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 focus:bg-white border transition-colors disabled:bg-gray-100 disabled:text-gray-500";
  const labelClass = "block text-sm font-semibold text-gray-600 mb-1.5";


  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Listing Images Gallery */}
      <div className="bg-gray-200 h-64 md:h-96 w-full relative group">
         <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
         <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            1/{property.images.length} Photos
         </div>
         
         {/* Share Button & Dropdown */}
         <div className="absolute top-4 right-4 z-20">
            <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="bg-white/90 p-2 rounded-full hover:bg-white text-gray-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                aria-label="Share Property"
            >
                {showShareMenu ? <X size={20} /> : <Share2 size={20} />}
            </button>
            
            {showShareMenu && (
                <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl border border-gray-100 p-2 w-56 flex flex-col gap-1 animate-fade-in origin-top-right z-50">
                    <button onClick={() => handleShare('whatsapp')} className="flex items-center gap-3 px-3 py-2.5 hover:bg-green-50 rounded-md text-left text-sm font-medium text-gray-700 transition-colors">
                        <MessageCircle size={18} className="text-green-500" /> WhatsApp
                    </button>
                    <button onClick={() => handleShare('facebook')} className="flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50 rounded-md text-left text-sm font-medium text-gray-700 transition-colors">
                        <Facebook size={18} className="text-blue-600" /> Facebook
                    </button>
                    <button onClick={() => handleShare('twitter')} className="flex items-center gap-3 px-3 py-2.5 hover:bg-sky-50 rounded-md text-left text-sm font-medium text-gray-700 transition-colors">
                        <Twitter size={18} className="text-sky-500" /> Twitter (X)
                    </button>
                    <button onClick={() => handleShare('linkedin')} className="flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50 rounded-md text-left text-sm font-medium text-gray-700 transition-colors">
                        <Linkedin size={18} className="text-blue-700" /> LinkedIn
                    </button>
                    <div className="h-px bg-gray-100 my-1"></div>
                    <button onClick={() => handleShare('copy')} className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-md text-left text-sm font-medium text-gray-700 transition-colors">
                        <Copy size={18} className="text-gray-500" /> Copy Link
                    </button>
                </div>
            )}
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block bg-brand-100 text-brand-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                        {property.category} • {property.type}
                    </span>
                    <span className={`inline-block text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${property.listedBy === 'Owner' ? 'bg-blue-600' : 'bg-orange-500'}`}>
                        {property.listedBy} Listed
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-1 text-gray-400" />
                    <span>{property.address.locality}, {property.address.city}, {property.address.state}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-left md:text-right">
                  <div className="text-3xl font-bold text-gray-900">₹{property.rent.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">per month</div>
                  {property.maintenance && <div className="text-xs text-gray-400">+ ₹{property.maintenance} maintenance</div>}
                </div>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-100 mb-6">
                 {property.bhk && (
                   <div className="text-center p-2">
                     <div className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Config</div>
                     <div className="text-gray-900 font-semibold">{property.bhk} BHK</div>
                   </div>
                 )}
                 <div className="text-center p-2 border-l border-gray-100">
                     <div className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Area</div>
                     <div className="text-gray-900 font-semibold">{property.areaSqFt} sqft</div>
                 </div>
                 <div className="text-center p-2 border-l border-gray-100">
                     <div className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Furnishing</div>
                     <div className="text-gray-900 font-semibold">{property.furnishing}</div>
                 </div>
                 <div className="text-center p-2 border-l border-gray-100">
                     <div className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Available</div>
                     <div className="text-gray-900 font-semibold">{new Date(property.availableDate).toLocaleDateString()}</div>
                 </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <Check size={18} className="text-brand-600 mr-2" />
                      <span className="text-sm font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules/Restrictions */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">House Rules</h2>
                <div className="flex gap-4">
                  <div className={`px-4 py-2 rounded-lg border text-sm font-medium ${property.petsAllowed ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
                    Pets: {property.petsAllowed ? 'Allowed' : 'Not Allowed'}
                  </div>
                  <div className={`px-4 py-2 rounded-lg border text-sm font-medium ${property.bachelorAllowed ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
                    Bachelors: {property.bachelorAllowed ? 'Welcome' : 'Family Only'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Contact Form */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                 <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white ${property.listedBy === 'Owner' ? 'bg-blue-600' : 'bg-orange-500'}`}>
                    {property.listedBy === 'Owner' ? <User size={24} /> : <Briefcase size={24} />}
                 </div>
                 <div>
                   <p className="text-xs uppercase font-bold text-gray-500 tracking-wide">
                       Property {property.listedBy}
                   </p>
                   <h3 className="font-bold text-gray-900">{property.ownerName}</h3>
                 </div>
                 {property.verified && <CheckCircle size={20} className="text-green-500 ml-auto" />}
              </div>

              {!interestSent ? (
                <form onSubmit={handleShowInterest} className="space-y-4">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
                    <p className="text-xs text-blue-800 flex items-start">
                      <AlertCircle size={14} className="mr-1 mt-0.5 flex-shrink-0" />
                      Enter your details to view {property.listedBy.toLowerCase()}'s contact number securely.
                    </p>
                  </div>
                  
                  {!isAuthenticated && (
                     <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center mb-2">
                         <p className="text-sm text-gray-600 mb-2">You must login to view contacts</p>
                     </div>
                  )}

                  <div>
                    <label className={labelClass}>Your Name</label>
                    <input 
                      required
                      type="text" 
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      disabled={!isAuthenticated}
                      className={inputClass}
                      placeholder="Enter name"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
                        +91
                      </span>
                      <input 
                        required
                        type="tel"
                        value={userPhone}
                        onChange={e => setUserPhone(e.target.value)}
                        disabled={!isAuthenticated}
                        pattern="[0-9]{10}"
                        className="flex-1 min-w-0 block w-full px-3 py-2.5 rounded-none rounded-r-lg border border-gray-200 bg-gray-50 text-gray-900 focus:ring-brand-500 focus:border-brand-500 focus:bg-white sm:text-sm disabled:bg-gray-100 disabled:text-gray-500 transition-colors"
                        placeholder="9876543210"
                      />
                    </div>
                  </div>
                  
                  <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-brand-700 hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors shadow-lg">
                    {isAuthenticated ? 'Show Interest & View Contact' : 'Login to Show Interest'}
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-4 animate-fade-in">
                  <div className="bg-green-100 p-3 rounded-full h-12 w-12 flex items-center justify-center mx-auto text-green-600">
                    <Check size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Interest Sent!</h3>
                  <p className="text-sm text-gray-500">We've shared your interest with {property.ownerName}.</p>
                  
                  <div className="bg-gray-100 rounded-lg p-4 mt-4">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">{property.listedBy} Contact</p>
                    <div className="flex items-center justify-center gap-2 text-xl font-bold text-gray-900">
                       <Phone size={20} className="text-brand-600" />
                       {showPhone ? property.ownerPhone : '**********'}
                    </div>
                    <a href={`tel:${property.ownerPhone}`} className="block mt-2 text-sm text-brand-700 font-medium hover:underline">
                      Call Now
                    </a>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-between text-gray-400">
                 <button 
                    onClick={handleSave}
                    className={`flex items-center gap-1 text-xs transition ${isSaved ? 'text-red-500 hover:text-red-600' : 'hover:text-gray-600'}`}
                 >
                    <Heart size={14} className={isSaved ? "fill-current" : ""} /> {isSaved ? 'Saved' : 'Save'}
                 </button>
                 <button className="flex items-center gap-1 text-xs hover:text-red-600 transition"><Flag size={14} /> Report</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;