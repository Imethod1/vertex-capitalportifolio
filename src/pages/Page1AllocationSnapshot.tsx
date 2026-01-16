import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import AllocationSnapshot from '../components/AllocationSnapshot';
import { PortfolioAllocation } from '../types/portfolio';
import { loadPortfolioData } from '../utils/loadPortfolio';

const Page1AllocationSnapshot: React.FC = () => {
  const [allocations, setAllocations] = useState<PortfolioAllocation[]>([
    {
      assetClass: 'Fixed Income',
      target: 50,
      current: 50,
      deviation: 0,
      rebalancingRequired: false,
      notes: 'Government Bonds and T-Bills',
    },
    {
      assetClass: 'Domestic Equities',
      target: 35,
      current: 35,
      deviation: 0,
      rebalancingRequired: false,
      notes: 'DSE listed companies',
    },
    {
      assetClass: 'Regional (EAC/SADC) Equities',
      target: 5,
      current: 5,
      deviation: 0,
      rebalancingRequired: false,
      notes: 'EAC and SADC equities',
    },
    {
      assetClass: 'Cash & Cash Equivalents',
      target: 10,
      current: 10,
      deviation: 0,
      rebalancingRequired: false,
      notes: 'Money market instruments',
    },
  ]);

  useEffect(() => {
    // Load data from JSON file managed by Decap CMS
    loadPortfolioData().then((data) => {
      if (data.allocations && data.allocations.length > 0) {
        setAllocations(data.allocations);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        pageNumber={1}
        pageTitle="Portfolio Allocation Snapshot"
        pageDescription="Track strategic vs actual asset allocations (read-only, managed via Decap CMS)"
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Allocation</h3>
            <p className="text-3xl font-bold text-gray-900">
              {allocations.reduce((sum, a) => sum + a.current, 0).toFixed(1)}%
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Rebalancing Required</h3>
            <p className="text-3xl font-bold text-orange-600">
              {allocations.filter((a) => a.rebalancingRequired).length}
            </p>
          </div>
        </div>

        {/* Allocation Table */}
        <AllocationSnapshot allocations={allocations} />
      </div>
    </div>
  );
};

export default Page1AllocationSnapshot;
