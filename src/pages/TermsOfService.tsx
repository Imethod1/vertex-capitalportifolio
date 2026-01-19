import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="p-6 md:p-8">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 p-6 md:p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          These terms apply to the internal academic use of this application for the <strong>Security Analysis and Portfolio Management</strong> course project. By using this system, you agree to the following:
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Academic Use Only</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6 space-y-2">
          <li>The application is for learning and simulation purposes only.</li>
          <li>No production trading or external client usage is permitted.</li>
          <li>Access is limited to course participants and collaborators.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Data & Compliance</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6 space-y-2">
          <li>Data represents assumed or non-sensitive portfolio information.</li>
          <li>Compliance checks follow an educational IPS framework.</li>
          <li>Users must not upload personal or sensitive data to the system.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Authentication & Access</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6 space-y-2">
          <li>Admin access requires collaborator authentication (e.g., via GitHub OAuth).</li>
          <li>Public users cannot modify data; the app is read-only to viewers.</li>
          <li>All changes are versioned for audit and educational review.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Liability</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          The project team and institution are not responsible for any decisions made based on the information presented. This is a learning tool only and not investment advice.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Contact</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Questions about these terms can be directed to the course project team.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Email: <strong>ibrahimndarifanye0025@gmail.com</strong>
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Phone (Tanzania): <strong>+255620400025</strong>
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
