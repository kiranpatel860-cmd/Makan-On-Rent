import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p>Welcome to MakanOnRental ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This policy outlines our practices regarding the collection, use, and disclosure of your information.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Personal Information:</strong> When you sign up, list a property, or show interest, we collect information such as your name, mobile number, email address, and property details.</li>
              <li><strong>Usage Data:</strong> We may collect information about how you interact with our services, such as pages visited, time spent, and search queries.</li>
              <li><strong>Device Information:</strong> We may collect information about the device you use to access the platform, including IP address and browser type.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p>We use your data to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Facilitate connections between property owners and prospective tenants.</li>
              <li>Verify your identity and prevent fraud (e.g., OTP verification).</li>
              <li>Improve our website functionality, search algorithms, and user experience.</li>
              <li>Send you notifications regarding your listings, leads, or account security.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal data to third-party advertisers. However, we share contact details in the following specific scenario:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Connecting Parties:</strong> When a renter expresses interest in a listing by filling out the "Show Interest" form, their contact details are shared with the property owner, and the owner's details are revealed to the renter to facilitate direct communication.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in the good faith belief that such action is necessary to comply with legal obligations or protect the safety of our users.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Security</h2>
            <p>We implement appropriate technical and organizational security measures to protect your personal data from unauthorized access, loss, or misuse. This includes encryption of sensitive data and secure server infrastructure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information stored with us. You can manage most of your data directly through your dashboard or contact support for assistance.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2">
              <strong>Email:</strong> kiranpatel860@gmail.com<br/>
              <strong>Phone:</strong> +91 9909563256
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;