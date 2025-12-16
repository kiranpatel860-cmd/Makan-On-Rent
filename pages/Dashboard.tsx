import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, MessageSquare, Edit, Trash2, Heart, List } from 'lucide-react';
import { SAMPLE_PROPERTIES } from '../services/mockData';
import { Property } from '../types';
import { useAuth } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Tab State: 'my-listings' or 'saved-properties'
  const [activeTab, setActiveTab] = useState<'my-listings' | 'saved-properties'>('my-listings');

  // Simulate user's properties with local state to allow deletion in the UI
  const [myProperties, setMyProperties] = useState<Property[]>(SAMPLE_PROPERTIES.slice(0, 2));

  // Derive Saved Properties from Global Sample Data using IDs in User Object
  const savedProperties = SAMPLE_PROPERTIES.filter(p => user?.savedPropertyIds?.includes(p.id));

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setMyProperties(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleEdit = (property: Property) => {
    navigate('/list-property', { state: { editMode: true, property } });
  };

  if (!user) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Please login to view dashboard.</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Section - Show only if managing listings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="text-gray-500 text-sm font-medium">My Listings</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{myProperties.length}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="text-gray-500 text-sm font-medium">Saved Properties</div>
            <div className="text-3xl font-bold text-brand-600 mt-2">{savedProperties.length}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="text-gray-500 text-sm font-medium">Messages</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">5</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex border-b border-gray-200">
            <button
                onClick={() => setActiveTab('my-listings')}
                className={`py-4 px-6 font-medium text-sm focus:outline-none flex items-center gap-2 border-b-2 transition-colors ${
                    activeTab === 'my-listings' 
                    ? 'border-brand-600 text-brand-700' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
                <List size={18} /> My Listings
            </button>
            <button
                onClick={() => setActiveTab('saved-properties')}
                className={`py-4 px-6 font-medium text-sm focus:outline-none flex items-center gap-2 border-b-2 transition-colors ${
                    activeTab === 'saved-properties' 
                    ? 'border-brand-600 text-brand-700' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
                <Heart size={18} className={activeTab === 'saved-properties' ? "fill-brand-100" : ""} /> Saved Properties
            </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'my-listings' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="font-semibold text-gray-800">Manage Your Listings</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {myProperties.length > 0 ? (
                        myProperties.map(property => (
                            <tr key={property.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded object-cover" src={property.images[0]} alt="" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                    <div className="text-sm text-gray-500">{property.address.locality}</div>
                                </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ₹{property.rent.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex gap-4">
                                <span className="flex items-center gap-1"><Eye size={14} /> 240</span>
                                <span className="flex items-center gap-1"><MessageSquare size={14} /> 5</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-3">
                                <button 
                                    onClick={() => handleEdit(property)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                    title="Edit Listing"
                                >
                                    <Edit size={18} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(property.id)}
                                    className="text-red-600 hover:text-red-900"
                                    title="Delete Listing"
                                >
                                    <Trash2 size={18} />
                                </button>
                                </div>
                            </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                            No listings found. Start by listing your property!
                            </td>
                        </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
        )}

        {activeTab === 'saved-properties' && (
            <div className="animate-fade-in">
                {savedProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedProperties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-medium text-gray-900">No saved properties yet</h3>
                        <p className="text-gray-500 mt-2">Start browsing and save properties you like to view them here.</p>
                        <button
                            onClick={() => navigate('/search')}
                            className="mt-6 inline-block bg-brand-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-800 transition"
                        >
                            Browse Rentals
                        </button>
                    </div>
                )}
            </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;