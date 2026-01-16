import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Vertex Capital Portfolio Management System, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use this application. This is a course project for the Security Analysis 
              and Portfolio Management program.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
            <p>
              Permission is granted to access this application solely for authorized users (collaborators on the GitHub repository). 
              Unauthorized use of this system is prohibited. Users must not:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Modify or copy the application code without authorization</li>
              <li>Use the system for purposes other than portfolio management</li>
              <li>Attempt to gain unauthorized access to restricted areas</li>
              <li>Transmit any harmful or malicious code</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>You are responsible for maintaining the confidentiality of your GitHub credentials</li>
              <li>You agree to provide accurate information about your portfolio and investments</li>
              <li>You are responsible for all activities that occur under your account</li>
              <li>You must immediately notify us of any unauthorized access to your account</li>
              <li>You agree to comply with all applicable investment regulations and policies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Accuracy and Compliance</h2>
            <p>
              You acknowledge that portfolio data must be accurate and comply with the Investment Policy Statement (IPS). 
              The system provides compliance monitoring tools, but you are ultimately responsible for ensuring all data is accurate 
              and compliant with institutional policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Audit Trails and Governance</h2>
            <p>
              This system maintains comprehensive audit trails of all changes to portfolio data. All decision logs and tactical adjustments 
              must include appropriate documentation and approvals. Users agree to maintain proper governance and decision-making processes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Disclaimer of Warranties</h2>
            <p>
              This application is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding 
              the application's fitness for a particular purpose, accuracy, or non-infringement. While we strive for data accuracy, we 
              do not guarantee that all information will be error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p>
              In no event shall Vertex Capital or its developers be liable for any indirect, incidental, special, consequential, or punitive 
              damages resulting from your use of or inability to use the application, even if advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
            <p>
              All content, features, and functionality (including but not limited to all information, software, text, displays, images, 
              video, and audio) are owned by Vertex Capital, its licensors, or other providers of such material and are protected by copyright, 
              trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Termination</h2>
            <p>
              Access to this application may be terminated at any time by authorized administrators. Upon termination, all rights granted 
              to you will immediately cease, and you must discontinue use of the application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to 
              the application. Your continued use of the application following any such changes constitutes your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws applicable to educational institutions 
              and are subject to any course regulations provided by the instructor.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact</h2>
            <p>
              If you have questions about these Terms of Service, please contact us using the information provided in our Contact page.
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

export default TermsOfService;
