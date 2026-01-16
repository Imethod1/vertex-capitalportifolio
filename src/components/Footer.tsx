import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-semibold mb-3">Portfolio Management</h3>
            <p className="text-sm text-gray-400">
              Comprehensive portfolio analysis, security exposure tracking, and compliance monitoring for strategic asset management.
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-white font-semibold mb-3">Core Features</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Strategic Allocation Monitoring</li>
              <li>• Security & Sector Analysis</li>
              <li>• Risk Metrics & IPS Compliance</li>
              <li>• Liquidity & Cash Management</li>
              <li>• Performance Tracking</li>
            </ul>
          </div>

          {/* Compliance Info */}
          <div>
            <h3 className="text-white font-semibold mb-3">Compliance & Standards</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Investment Policy Statement (IPS)</li>
              <li>• Risk-Adjusted Performance Metrics</li>
              <li>• Audit Trail & Decision Logging</li>
              <li>• Real-time Compliance Monitoring</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              &copy; {currentYear} Vertex Capital. Portfolio Management System. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>
            This system provides real-time monitoring of portfolio allocations, security exposure, risk metrics, 
            and compliance with institutional investment policies. All data is securely managed and regularly audited.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
