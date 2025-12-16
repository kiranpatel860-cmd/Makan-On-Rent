import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Building, ChevronRight, CheckCircle, Shield, Clock, Quote, User } from 'lucide-react';
import { SAMPLE_PROPERTIES } from '../services/mockData';
import PropertyCard from '../components/PropertyCard';
import CityAutocomplete from '../components/CityAutocomplete';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState('');
  const [searchType, setSearchType] = useState('Residential');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?city=${searchCity}&category=${searchType}`);
  };

  const featuredProperties = SAMPLE_PROPERTIES.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-brand-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              List Fast. Rent Faster.
              <span className="block text-brand-200 mt-2 text-3xl md:text-5xl">India's Rental-Only Marketplace</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-100 mb-10 max-w-2xl font-light">
              Find verified rental homes and commercial spaces. Landlords list in minutes — renters connect directly. No buying. Just renting.
            </p>

            {/* Quick Search Box */}
            <form onSubmit={handleSearch} className="bg-white p-2 rounded-lg shadow-xl flex flex-col md:flex-row gap-2 md:gap-0">
              <div className="relative flex-grow md:border-r border-gray-200">
                <MapPin className="absolute left-3 top-3.5 text-gray-400 z-10" size={20} />
                <CityAutocomplete
                   value={searchCity}
                   onChange={setSearchCity}
                   placeholder="Select City"
                   className="w-full pl-10 pr-4 py-3 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-transparent"
                />
              </div>

              <div className="relative flex-grow md:w-1/4 md:border-r border-gray-200">
                <Building className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none bg-transparent"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-brand-700 hover:bg-brand-800 text-white font-semibold py-3 px-8 rounded-md transition duration-200 flex items-center justify-center"
              >
                <Search className="mr-2" size={20} />
                Search
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="text-brand-100 text-sm font-medium mr-2">Trending:</span>
              <button onClick={() => navigate('/search?type=Apartment')} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition">Apartments</button>
              <button onClick={() => navigate('/search?category=Commercial')} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition">Office Space</button>
              <button onClick={() => navigate('/search?bachelor=true')} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition">Bachelor Friendly</button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props / How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How MakanOnRental Works</h2>
            <p className="mt-4 text-gray-600">Three simple steps to your next rental journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Sign Up & Verify</h3>
              <p className="text-gray-500">Create an account and verify your mobile number securely via OTP.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">2. List or Search</h3>
              <p className="text-gray-500">Owners list properties with photos. Tenants filter by BHK, rent, and locality.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Connect Directly</h3>
              <p className="text-gray-500">Submit interest to get contact details. No middle-men, just direct connection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Rentals</h2>
              <p className="mt-2 text-gray-600">Handpicked properties just for you.</p>
            </div>
            <Link to="/search" className="hidden md:flex items-center text-brand-700 font-semibold hover:text-brand-800">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/search" className="inline-flex items-center text-brand-700 font-semibold hover:text-brand-800">
              View All <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="flex-shrink-0 relative group">
              <div className="absolute inset-0 bg-brand-200 rounded-full transform rotate-6 transition-transform group-hover:rotate-12"></div>
              {/* NOTE TO DEVELOPER: Replace the src below with your actual image path, e.g., "/kiran-patel.jpg" */}
              <img 
                src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Kiran Patel" 
                className="relative w-64 h-64 object-cover rounded-full border-4 border-white shadow-lg"
              />
            </div>
            
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold mb-4">
                <User size={16} /> Meet the Founder
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Kiran Patel</h2>
              <p className="text-brand-600 font-medium mb-6">Founder & CEO, MakanOnRental</p>
              
              <div className="relative">
                <Quote className="absolute -top-4 -left-6 text-gray-200 transform -scale-x-100" size={48} />
                <p className="text-gray-600 text-lg leading-relaxed relative z-10 italic">
                  "Driven by a passion for technology and real estate, I started MakanOnRental to solve a simple problem: finding a home shouldn't be hard. Our platform is built on the values of trust and transparency, aiming to connect owners and tenants directly without the hassle. We are not just building a portal; we are building a community."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Are you a Property Owner?</h2>
          <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
            List your residential or commercial property on India's most trusted rental portal. It's free, fast, and secure.
          </p>
          <Link
            to="/list-property"
            className="inline-block bg-white text-brand-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            List Your Property Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;