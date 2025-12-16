import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, AlertCircle, Lock } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { PropertyType, Category } from '../types';
import CityAutocomplete from '../components/CityAutocomplete';
import { useAuth } from '../context/AuthContext';

const ListProperty: React.FC = () => {
  const { isAuthenticated, openLoginModal, user } = useAuth();
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const location = useLocation();
  const isEditMode = location.state?.editMode;
  const editProperty = location.state?.property;

  const [formData, setFormData] = useState({
    title: '',
    category: Category.Residential,
    type: PropertyType.Apartment,
    city: '',
    rent: '',
    maintenance: '',
    bhk: '',
    area: '',
    address: '',
    description: '',
    ownerName: '',
    ownerPhone: '',
    bachelorAllowed: false,
    petsAllowed: false,
    listedBy: 'Owner' as 'Owner' | 'Broker'
  });

  // Pre-fill user data if available
  useEffect(() => {
    if (user && !isEditMode) {
        setFormData(prev => ({
            ...prev,
            ownerName: user.name || '',
            ownerPhone: user.phone || ''
        }));
    }
  }, [user, isEditMode]);

  // Pre-fill form if in Edit Mode
  useEffect(() => {
    if (isEditMode && editProperty) {
      setFormData({
        title: editProperty.title || '',
        category: editProperty.category || Category.Residential,
        type: editProperty.type || PropertyType.Apartment,
        city: editProperty.address?.city || '',
        rent: editProperty.rent ? editProperty.rent.toString() : '',
        maintenance: editProperty.maintenance ? editProperty.maintenance.toString() : '',
        bhk: editProperty.bhk ? editProperty.bhk.toString() : '',
        area: editProperty.areaSqFt ? editProperty.areaSqFt.toString() : '',
        address: editProperty.address ? `${editProperty.address.locality}, ${editProperty.address.city}, ${editProperty.address.state}, ${editProperty.address.pin}` : '',
        description: editProperty.description || '',
        ownerName: editProperty.ownerName || '',
        ownerPhone: editProperty.ownerPhone || '',
        bachelorAllowed: editProperty.bachelorAllowed || false,
        petsAllowed: editProperty.petsAllowed || false,
        listedBy: editProperty.listedBy || 'Owner'
      });
      if (editProperty.images) {
        setPreviewImages(editProperty.images);
      }
    }
  }, [isEditMode, editProperty]);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      previewImages.forEach(url => {
        if (url.startsWith('blob:')) {
           URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateAndProcessFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    let validationWarning = '';

    Array.from(files).forEach(file => {
      // Robust validation: Check MIME type OR file extension
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const isValidExtension = fileExtension && ['jpg', 'jpeg', 'png', 'webp'].includes(fileExtension);
      
      if (!validTypes.includes(file.type) && !isValidExtension) {
        validationWarning = 'Only JPG, PNG, and WebP files are allowed.';
        return;
      }
      
      // Validate Size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        validationWarning = 'Some files were too large (max 5MB).';
        return;
      }
      
      validFiles.push(file);
    });

    if (validFiles.length === 0) {
      setUploadError(validationWarning || 'No valid files selected.');
      return;
    }

    const newImages = validFiles.map((file) => URL.createObjectURL(file));
    
    setPreviewImages(prev => {
      const combined = [...prev, ...newImages];
      
      if (combined.length > 5) {
        // Enforce strict limit of 5
        const imagesToKeep = combined.slice(0, 5);
        const imagesToDiscard = combined.slice(5);

        // Revoke URLs for discarded images to prevent memory leaks
        imagesToDiscard.forEach(url => URL.revokeObjectURL(url));
        
        // Use setTimeout to avoid state update during render cycle
        setTimeout(() => setUploadError('Maximum 5 photos allowed. Excess photos were truncated.'), 0);
        return imagesToKeep;
      }
      
      // If success, check for validation warnings or clear error
      if (validationWarning) {
         setTimeout(() => setUploadError(validationWarning), 0);
      } else {
         setTimeout(() => setUploadError(null), 0);
      }
      
      return combined;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFiles(e.target.files);
    }
    // Reset input so same file can be selected again if needed
    if (e.target) e.target.value = '';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
        setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if we're actually leaving the drop zone or just entering a child element
    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
    
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages(prev => {
      const newImages = [...prev];
      if (newImages[index].startsWith('blob:')) {
        URL.revokeObjectURL(newImages[index]); // Cleanup
      }
      newImages.splice(index, 1);
      return newImages;
    });
    // If we drop below 5 (or equal), limit error is resolved
    if (previewImages.length - 1 <= 5) setUploadError(null);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(prev => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (previewImages.length < 3) {
        setUploadError("Please upload at least 3 images to publish your listing.");
        return;
    }
    const message = isEditMode 
        ? 'Property updated successfully! Redirecting to dashboard...' 
        : 'Property listed successfully! Redirecting to dashboard...';
    alert(message);
    window.location.hash = '#/dashboard';
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Reusable input classes
  const inputClass = "block w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 focus:bg-white border transition-colors";
  const labelClass = "block text-sm font-semibold text-gray-600 mb-1.5";

  if (!isAuthenticated) {
      return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                  <div className="bg-brand-100 text-brand-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock size={32} />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h1>
                  <p className="text-gray-600 mb-6">
                      You need to be logged in to list a property. Please sign in or create an account to continue.
                  </p>
                  <button 
                    onClick={openLoginModal}
                    className="w-full bg-brand-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-800 transition-colors"
                  >
                      Login / Sign Up
                  </button>
                  <button 
                    onClick={() => window.history.back()}
                    className="w-full mt-3 text-gray-500 font-medium py-2 hover:text-gray-800 transition-colors"
                  >
                      Go Back
                  </button>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-brand-700 p-6 text-white">
            <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Property' : 'List Your Property'}</h1>
            <p className="text-brand-100 mt-1">{isEditMode ? 'Update your listing details.' : 'Fill in the details to find the perfect tenant.'}</p>
          </div>

          <div className="p-8">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
              {[1, 2, 3].map(num => (
                <div key={num} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm z-10 ${step >= num ? 'bg-brand-600 text-white ring-4 ring-brand-50' : 'bg-white text-gray-500 border border-gray-300'}`}>
                  {num}
                </div>
              ))}
            </div>

            <form onSubmit={step === 3 ? handleSubmit : handleNext}>
              {/* Step 1: Basic Details */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-bold text-gray-900 pb-2 border-b border-gray-100">Property Basics</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className={labelClass}>I want to rent out my</label>
                       <div className="flex rounded-lg shadow-sm">
                         <button type="button" onClick={() => setFormData({...formData, category: Category.Residential})} className={`flex-1 py-2.5 text-sm font-medium border rounded-l-lg transition-colors ${formData.category === Category.Residential ? 'bg-brand-50 border-brand-500 text-brand-700 z-10 ring-1 ring-brand-500' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}>Residential</button>
                         <button type="button" onClick={() => setFormData({...formData, category: Category.Commercial})} className={`flex-1 py-2.5 text-sm font-medium border rounded-r-lg transition-colors ${formData.category === Category.Commercial ? 'bg-brand-50 border-brand-500 text-brand-700 z-10 ring-1 ring-brand-500' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}>Commercial</button>
                       </div>
                    </div>

                    <div>
                      <label className={labelClass}>Property Type</label>
                      <select name="type" onChange={handleChange} value={formData.type} className={inputClass}>
                         {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>City</label>
                      <CityAutocomplete
                        value={formData.city}
                        onChange={(val) => setFormData({...formData, city: val})}
                        className={inputClass}
                      />
                    </div>

                    {formData.category === Category.Residential && (
                       <div>
                        <label className={labelClass}>BHK</label>
                        <input type="number" name="bhk" placeholder="e.g. 2" required onChange={handleChange} value={formData.bhk} className={inputClass} />
                       </div>
                    )}

                    <div>
                      <label className={labelClass}>Built-up Area (sq. ft)</label>
                      <input type="number" name="area" placeholder="1200" required onChange={handleChange} value={formData.area} className={inputClass} />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <button type="submit" className="bg-brand-700 text-white px-8 py-2.5 rounded-lg hover:bg-brand-800 transition font-medium shadow-sm">Next Step</button>
                  </div>
                </div>
              )}

              {/* Step 2: Details & Pricing */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-bold text-gray-900 pb-2 border-b border-gray-100">Details & Pricing</h2>

                  <div>
                    <label className={labelClass}>Property Title</label>
                    <input type="text" name="title" placeholder="e.g. Spacious 2 BHK near Station" required onChange={handleChange} value={formData.title} className={inputClass} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Monthly Rent (₹)</label>
                      <input type="number" name="rent" placeholder="25000" required onChange={handleChange} value={formData.rent} className={inputClass} />
                    </div>
                     <div>
                      <label className={labelClass}>Maintenance (Monthly)</label>
                      <input type="number" name="maintenance" placeholder="2000" onChange={handleChange} value={formData.maintenance} className={inputClass} />
                    </div>
                  </div>

                  {/* House Rules */}
                  <div>
                    <label className={labelClass}>House Rules</label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <label className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${formData.bachelorAllowed ? 'bg-brand-50 border-brand-200 shadow-sm' : 'hover:bg-gray-50 border-gray-200 bg-white'}`}>
                        <input
                          type="checkbox"
                          name="bachelorAllowed"
                          checked={formData.bachelorAllowed}
                          onChange={(e) => setFormData({...formData, bachelorAllowed: e.target.checked})}
                          className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 font-medium">Bachelor Friendly</span>
                      </label>

                      <label className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${formData.petsAllowed ? 'bg-brand-50 border-brand-200 shadow-sm' : 'hover:bg-gray-50 border-gray-200 bg-white'}`}>
                        <input
                          type="checkbox"
                          name="petsAllowed"
                          checked={formData.petsAllowed}
                          onChange={(e) => setFormData({...formData, petsAllowed: e.target.checked})}
                          className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 font-medium">Pets Allowed</span>
                      </label>
                    </div>
                  </div>

                  <div>
                     <label className={labelClass}>Full Address</label>
                     <textarea name="address" rows={3} onChange={handleChange} value={formData.address} className={inputClass}></textarea>
                  </div>

                  <div>
                     <label className={labelClass}>Description</label>
                     <textarea name="description" rows={4} onChange={handleChange} value={formData.description} className={inputClass} placeholder="Tell tenants what makes your property special..."></textarea>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button type="button" onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-900 font-medium px-4">Back</button>
                    <button type="submit" className="bg-brand-700 text-white px-8 py-2.5 rounded-lg hover:bg-brand-800 transition font-medium shadow-sm">Next Step</button>
                  </div>
                </div>
              )}

              {/* Step 3: Photos & Contact */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-bold text-gray-900 pb-2 border-b border-gray-100">Photos & Contact</h2>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    multiple
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                  />
                  
                  <div 
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer group ${
                      isDragging 
                        ? 'border-brand-500 bg-brand-50 scale-[1.02] shadow-sm ring-2 ring-brand-200 ring-opacity-50' 
                        : 'border-gray-300 hover:bg-gray-50 hover:border-brand-300'
                    }`}
                  >
                    <div className={`mx-auto h-12 w-12 rounded-full flex items-center justify-center transition ${isDragging ? 'bg-brand-100' : 'bg-gray-100 group-hover:bg-brand-50'}`}>
                      <Upload className={`h-6 w-6 ${isDragging ? 'text-brand-600' : 'text-gray-400 group-hover:text-brand-600'}`} />
                    </div>
                    <p className="mt-4 text-sm font-medium text-gray-900">
                      {isDragging ? 'Drop images here' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Min 3 photos required • JPG, PNG, WebP up to 5MB</p>
                  </div>

                  {uploadError && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg animate-fade-in">
                      <AlertCircle size={16} />
                      {uploadError}
                    </div>
                  )}

                  {/* Image Previews */}
                  {previewImages.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 mb-3">Selected Photos ({previewImages.length}/5)</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {previewImages.map((img, idx) => (
                          <div key={idx} className="relative aspect-video rounded-lg overflow-hidden group border border-gray-200 shadow-sm">
                            <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-red-600"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-600 mb-3">I am listing as:</h3>
                      <div className="flex gap-4 mb-6">
                        <label className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${formData.listedBy === 'Owner' ? 'bg-brand-50 border-brand-500 ring-1 ring-brand-500' : 'hover:bg-gray-50 border-gray-200'}`}>
                            <input 
                                type="radio" 
                                name="listedBy" 
                                value="Owner"
                                checked={formData.listedBy === 'Owner'}
                                onChange={() => setFormData({...formData, listedBy: 'Owner'})}
                                className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                            />
                            <span className="font-medium text-gray-900">Owner</span>
                        </label>
                        <label className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${formData.listedBy === 'Broker' ? 'bg-brand-50 border-brand-500 ring-1 ring-brand-500' : 'hover:bg-gray-50 border-gray-200'}`}>
                            <input 
                                type="radio" 
                                name="listedBy" 
                                value="Broker"
                                checked={formData.listedBy === 'Broker'}
                                onChange={() => setFormData({...formData, listedBy: 'Broker'})}
                                className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                            />
                            <span className="font-medium text-gray-900">Broker</span>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClass}>Your Name</label>
                          <input type="text" name="ownerName" required onChange={handleChange} value={formData.ownerName} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Mobile Number</label>
                          <input type="tel" name="ownerPhone" required onChange={handleChange} value={formData.ownerPhone} className={inputClass} />
                        </div>
                      </div>
                  </div>

                   <div className="flex items-start mt-6">
                    <div className="flex items-center h-5">
                      <input id="terms" type="checkbox" required className="focus:ring-brand-500 h-4 w-4 text-brand-600 border-gray-300 rounded" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-medium text-gray-700">I agree to the Terms & Conditions</label>
                      <p className="text-gray-500">I certify that I am the {formData.listedBy === 'Owner' ? 'owner' : 'authorized broker'} of this property.</p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button type="button" onClick={() => setStep(2)} className="text-gray-500 hover:text-gray-900 font-medium px-4">Back</button>
                    <button type="submit" className="bg-brand-700 text-white px-8 py-3 rounded-lg hover:bg-brand-800 transition font-bold shadow-lg">
                        {isEditMode ? 'Update Listing' : 'Publish Listing'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;