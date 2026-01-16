import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="p-6 md:p-8">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 p-6 md:p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Contact</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This application is a course project for <strong>Security Analysis and Portfolio Management</strong>. For questions related to the project or collaboration, use the contact information below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Project Team</h2>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
              <li>• Email: <strong>project@example.com</strong> (placeholder)</li>
              <li>• Phone (Tanzania): <strong>+255 123 456 789</strong> (placeholder — you will edit)</li>
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Course Context</h2>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
              <li>• Educational, not production use</li>
              <li>• Simulated portfolio data</li>
              <li>• Internal collaborators only</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quick Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
              <input type="text" className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2" rows={4} placeholder="Write your message (no backend submission)"></textarea>
            </div>
            <button type="button" className="inline-flex items-center px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-700">
              Save (Mock)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
