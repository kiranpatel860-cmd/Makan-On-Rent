import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
           <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using MakanOnRental.com, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description of Service</h2>
            <p>MakanOnRental is an online platform that connects property owners with prospective tenants. We act solely as a marketplace and do not own, manage, or inspect the properties listed. We are not a real estate broker or agent and do not charge brokerage fees.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. User Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account login credentials and OTPs.</li>
              <li><strong>Accurate Information:</strong> You agree to provide accurate, current, and complete information during registration and listing. False information may result in account suspension.</li>
              <li><strong>Prohibited Conduct:</strong> You may not use the platform for any illegal purpose, spamming, posting fraudulent listings, or harassing other users.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Property Listings</h2>
            <p>Property owners warrant that they have the legal right to rent out the property listed. Listings must include accurate photos and descriptions. We reserve the right to remove any listing that violates our policies, contains offensive content, or is reported as fraudulent.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Fees and Payments</h2>
            <p>Basic listings on MakanOnRental are currently free. We reserve the right to introduce premium paid features or listing fees in the future, which will be clearly communicated before any charge is incurred.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
            <p>MakanOnRental shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service, or from any disputes, financial loss, or damages arising between owners and tenants.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Vadodara, Gujarat.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;