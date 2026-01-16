import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              This Privacy Policy describes how Vertex Capital Portfolio Management System ("we", "us", "our") collects, uses, 
              and protects your personal information when you use our portfolio management application. This is a course project 
              for the Security Analysis and Portfolio Management program.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Authentication Data:</strong> When you log in via GitHub OAuth, we collect your GitHub username and authentication token</li>
              <li><strong>Portfolio Data:</strong> Information about securities, allocations, and risk metrics you manage</li>
              <li><strong>Audit Logs:</strong> Records of changes made to portfolio data, including timestamps and user information</li>
              <li><strong>Usage Data:</strong> Information about how you interact with the application</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide and maintain the portfolio management system</li>
              <li>To authenticate users and manage access control</li>
              <li>To maintain audit trails and compliance records</li>
              <li>To improve and optimize the application</li>
              <li>To ensure security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information from unauthorized access, 
              alteration, disclosure, or destruction. Data is encrypted in transit and at rest. Access to sensitive data is 
              restricted to authorized personnel only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Retention</h2>
            <p>
              Portfolio data and audit logs are retained for as long as necessary to maintain system functionality and comply 
              with institutional policies. Historical data may be archived but will be securely maintained.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Third-Party Services</h2>
            <p>
              We use GitHub OAuth for authentication. Please refer to GitHub's Privacy Policy for information about how GitHub 
              handles your data. We also use Vercel for hosting and Decap CMS for content management.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
            <p>
              You have the right to access, modify, or delete your personal information. To exercise these rights, please contact 
              us using the information provided in the Contact section.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy 
              on this page and updating the effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at the information provided in our Contact page.
            </p>
          </section>

          <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-500">
            <p>Effective Date: January 2026</p>
            <p>Last Updated: January 16, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
