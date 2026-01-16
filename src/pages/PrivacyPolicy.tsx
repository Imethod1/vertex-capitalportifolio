import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="p-6 md:p-8">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 p-6 md:p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This application is an academic course project for <strong>Security Analysis and Portfolio Management</strong>. It is intended solely for internal use by project participants to manage and analyze a simulated investment portfolio.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Data We Use</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6 space-y-2">
          <li>Portfolio positions, allocations, liquidity, and performance metrics (simulated or non-sensitive).</li>
          <li>Risk metrics and compliance checks aligned with an educational IPS framework.</li>
          <li>No collection of personal data from public users; only collaborators may authenticate via GitHub for admin access.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Authentication</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Admin access is restricted to collaborators for educational purposes. GitHub OAuth may be used to verify collaborator identity. No public user registration is available.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Storage & Security</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6 space-y-2">
          <li>Portfolio data is stored in project files under version control for auditability.</li>
          <li>No sensitive personal information is stored by this application.</li>
          <li>Access is limited to course participants and collaborators; deployments are for demonstration only.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Use of Information</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Information displayed is for learning and analysis. It should not be used for real trading decisions or investment advice.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Contact</h2>
        <p className="text-gray-700 dark:text-gray-300">
          For questions about this course project, please contact the project team.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Phone (Tanzania): <strong>+255 123 456 789</strong> (placeholder — you will edit)
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
