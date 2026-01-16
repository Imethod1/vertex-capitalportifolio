import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import SecurityExposure from '../components/SecurityExposure';
import { Security, Sector, GeographicExposure, AssetClass } from '../types/portfolio';
import { checkSecurityCompliance, calculateTotalWeight, loadPortfolioData } from '../utils/loadPortfolio';

const Page2SecurityExposure: React.FC = () => {
  const [securities, setSecurities] = useState<Security[]>([
    {
      id: '1',
      name: 'Tanzania Government Bond 2026',
      ticker: 'TGB-26',
      assetClass: 'Fixed Income',
      currentWeight: 25,
      targetWeight: 25,
      deviation: 0,
      sector: 'Government',
      geographicExposure: 'Tanzania',
      marketValue: 25000000,
      quantity: 250,
      purchasePrice: 100000,
      currentPrice: 100000,
      notes: 'Government bond, investment grade',
      ipsCompliant: true,
    },
  ]);

  const [complianceData, setComplianceData] = useState(() => checkSecurityCompliance(securities));

  useEffect(() => {
    // Load securities data from JSON file managed by Decap CMS
    loadPortfolioData().then((data) => {
      if (data.securities && data.securities.length > 0) {
        setSecurities(data.securities);
        setComplianceData(checkSecurityCompliance(data.securities));
      }
    });
  }, []);

  const totalWeight = calculateTotalWeight(securities);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        pageNumber={2}
        pageTitle="Individual Security Exposure"
        pageDescription="Track individual security positions, weights, and IPS compliance"
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Securities</h3>
            <p className="text-3xl font-bold text-gray-900">{securities.length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Weight</h3>
            <p className="text-3xl font-bold text-gray-900">{totalWeight.toFixed(2)}%</p>
          </div>
          <div className={`rounded-lg p-6 border-2 ${complianceData.isCompliant ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h3 className={`text-sm font-semibold ${complianceData.isCompliant ? 'text-green-700' : 'text-red-700'}`}>
              {complianceData.isCompliant ? '✓ Compliant' : '✕ Breaches Detected'}
            </h3>
            <p className="text-xs text-gray-600 mt-1">{complianceData.breaches.length} issues</p>
          </div>
        </div>

        {/* Compliance Alerts */}
        {!complianceData.isCompliant && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-red-900 mb-3">⚠️ Compliance Issues Detected</h3>
            <ul className="text-sm text-red-800 space-y-2">
              {complianceData.breaches.map((breach, idx) => (
                <li key={idx}>• {breach}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Security Exposure Table */}
        <SecurityExposure securities={securities} />
      </div>
    </div>
  );
};

export default Page2SecurityExposure;
