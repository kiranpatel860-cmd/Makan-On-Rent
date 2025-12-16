import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { SAMPLE_PROPERTIES, CITIES } from '../services/mockData';
import PropertyCard from '../components/PropertyCard';
import CityAutocomplete from '../components/CityAutocomplete';
import { PropertyType, Category } from '../types';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter States
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Residential');
  const [selectedType, setSelectedType] = useState('');
  const [maxRent, setMaxRent] = useState<number>(100000);
  const [selectedBhk, setSelectedBhk] = useState<number | null>(null);
  const [bachelorAllowed, setBachelorAllowed] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(false);

  // Derived State (Filtered List)
  const filteredProperties = SAMPLE_PROPERTIES.filter(p => {
    if (selectedCity && p.address.city !== selectedCity) return false;
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedType && p.type !== selectedType) return false;
    if (p.rent > maxRent) return false;
    if (selectedBhk && p.bhk !== selectedBhk) return false;
    if (bachelorAllowed && !p.bachelorAllowed) return false;
    if (petsAllowed && !p.petsAllowed) return false;
    return true;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Shared Styles
  const labelClass = "block text-sm font-semibold text-gray-600 mb-1.5";
  const inputClass = "block w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 focus:bg-white border transition-colors sm:text-sm";


  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {filteredProperties.length} Rentals Found
             {selectedCity ? ` in ${selectedCity}` : ' in India'}
          </h1>
          <button 
            className="md:hidden flex items-center gap-2 text-brand-700 font-medium"
            onClick={() => setShowMobileFilters(true)}
          >
            <SlidersHorizontal size={20} /> Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className={`md:w-64 flex-shrink-0 ${showMobileFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden md:block'}`}>
            
            {showMobileFilters && (
              <div className="flex justify-between items-center mb-6 md:hidden">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)}><X size={24} /></button>
              </div>
            )}

            <div className="space-y-6">
              {/* Category */}
              <div>
                <label className={labelClass}>Category</label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${selectedCategory === 'Residential' ? 'bg-white shadow text-brand-700' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setSelectedCategory('Residential')}
                  >
                    Residential
                  </button>
                  <button
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${selectedCategory === 'Commercial' ? 'bg-white shadow text-brand-700' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setSelectedCategory('Commercial')}
                  >
                    Commercial
                  </button>
                </div>
              </div>

              {/* City */}
              <div>
                <label className={labelClass}>City</label>
                <CityAutocomplete
                   value={selectedCity}
                   onChange={setSelectedCity}
                   placeholder="All Cities"
                   className={inputClass}
                />
              </div>

              {/* Rent Range */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-gray-600">Max Rent</span>
                  <span className="text-brand-700 font-bold">₹{maxRent.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="200000"
                  step="5000"
                  value={maxRent}
                  onChange={(e) => setMaxRent(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
              </div>

              {/* BHK (Residential Only) */}
              {selectedCategory === 'Residential' && (
                <div>
                  <label className={labelClass}>BHK</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map(bhk => (
                      <button
                        key={bhk}
                        onClick={() => setSelectedBhk(selectedBhk === bhk ? null : bhk)}
                        className={`h-10 w-10 rounded-full border flex items-center justify-center text-sm font-medium transition ${selectedBhk === bhk ? 'bg-brand-700 text-white border-brand-700' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'}`}
                      >
                        {bhk}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Property Type */}
              <div>
                <label className={labelClass}>Property Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Any Type</option>
                  {Object.values(PropertyType).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Preferences */}
              <div>
                <label className={labelClass}>Preferences</label>
                <div className="space-y-2">
                  <label className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bachelorAllowed}
                      onChange={(e) => setBachelorAllowed(e.target.checked)}
                      className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">Bachelor Friendly</span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={petsAllowed}
                      onChange={(e) => setPetsAllowed(e.target.checked)}
                      className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">Pets Allowed</span>
                  </label>
                </div>
              </div>

              {showMobileFilters && (
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-brand-700 text-white py-3 rounded-lg font-bold mt-8"
                >
                  Show Results
                </button>
              )}
            </div>
          </aside>

          {/* Results Grid */}
          <main className="flex-grow">
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
                <Filter size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-900">No properties found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search in a different city.</p>
                <button
                  onClick={() => {
                    setSelectedCity('');
                    setSelectedCategory('Residential');
                    setMaxRent(200000);
                    setSelectedBhk(null);
                    setSelectedType('');
                    setBachelorAllowed(false);
                    setPetsAllowed(false);
                  }}
                  className="mt-6 text-brand-700 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Search;