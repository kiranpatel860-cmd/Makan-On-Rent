import React from 'react';
import { FileText, Download, CheckCircle, AlertTriangle } from 'lucide-react';

const RentalAgreement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Rental Agreement Guide</h1>
          <p className="mt-4 text-xl text-gray-600">Everything you need to know about rental contracts in India.</p>
        </div>

        {/* Download Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8 text-center animate-fade-in">
            <div className="w-16 h-16 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Standard Rental Agreement Template</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Download our legally vetted rental agreement draft suitable for most residential rentals in India. 
                Customizable for 11-month lease terms.
            </p>
            <button 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-700 hover:bg-brand-800 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500" 
              onClick={() => alert("This would trigger the download of a .docx file in a real application.")}
            >
                <Download className="mr-2" size={20} />
                Download Template (Word Format)
            </button>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="text-green-500 mr-2" size={20} />
                    Key Clauses to Include
                </h3>
                <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start"><span className="mr-2 font-bold text-brand-500">•</span> Security deposit amount and refund conditions.</li>
                    <li className="flex items-start"><span className="mr-2 font-bold text-brand-500">•</span> Monthly rent and maintenance charges.</li>
                    <li className="flex items-start"><span className="mr-2 font-bold text-brand-500">•</span> Notice period for vacating (usually 1 month).</li>
                    <li className="flex items-start"><span className="mr-2 font-bold text-brand-500">•</span> Annual rent escalation clause (usually 5-10%).</li>
                    <li className="flex items-start"><span className="mr-2 font-bold text-brand-500">•</span> List of fittings and fixtures provided.</li>
                </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                 <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <AlertTriangle className="text-orange-500 mr-2" size={20} />
                    Important Legal Notes
                </h3>
                <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start"><span className="mr-2 text-gray-400">•</span> Agreements over 11 months must be registered.</li>
                    <li className="flex items-start"><span className="mr-2 text-gray-400">•</span> 11-month agreements can be notarized.</li>
                    <li className="flex items-start"><span className="mr-2 text-gray-400">•</span> Police verification of tenants is mandatory in many cities.</li>
                    <li className="flex items-start"><span className="mr-2 text-gray-400">•</span> PAN card of landlord is required if rent exceeds ₹1 lakh/year.</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RentalAgreement;