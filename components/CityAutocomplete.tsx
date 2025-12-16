import React, { useState, useEffect, useRef } from 'react';
import { CITIES } from '../services/mockData';
import { MapPin } from 'lucide-react';

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CityAutocomplete: React.FC<CityAutocompleteProps> = ({ value, onChange, placeholder = "Select City", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    setIsOpen(true);
    setFilteredCities(
      CITIES.filter((city) =>
        city.toLowerCase().includes(val.toLowerCase())
      )
    );
  };

  const handleSelect = (city: string) => {
    onChange(city);
    setIsOpen(false);
  };

  const handleFocus = () => {
    setIsOpen(true);
    setFilteredCities(
      CITIES.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />
      
      {isOpen && (
        <ul className="absolute z-50 w-full bg-white mt-1 max-h-60 overflow-auto rounded-md shadow-lg border border-gray-200 text-left">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <li
                key={city}
                onClick={() => handleSelect(city)}
                className="px-4 py-2 hover:bg-brand-50 cursor-pointer text-sm text-gray-700 flex items-center gap-2"
              >
                <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                {city}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-sm text-gray-500 text-center">
              No cities found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CityAutocomplete;