import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { TacticalAdjustment } from '../types/portfolio';

const Page5TacticalLog: React.FC = () => {
  const [tactics, setTactics] = useState<TacticalAdjustment[]>([
    {
      id: '1',
      date: '2026-01-15',
      tacticalMove: 'Increased Fixed Income by 3%',
      deviationPercent: 3,
      marketSignal: 'Rising interest rates expected, locking in bond yields',
      duration: '2 weeks',
      approvedBy: 'IC',
      notes: 'Opportunistic position based on economic forecasts',
    },
  ]);

  const totalDeviations = tactics.reduce((sum, t) => sum + Math.abs(t.deviationPercent), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        pageNumber={5}
        pageTitle="Tactical Adjustment Log"
        pageDescription="Document all short-term deviations from strategic allocation with audit trail (read-only, managed via Decap CMS)"
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Adjustments</h3>
            <p className="text-3xl font-bold text-gray-900">{tactics.length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Deviations</h3>
            <p className="text-3xl font-bold text-blue-600">{totalDeviations.toFixed(2)}%</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Max Deviation</h3>
            <p className="text-3xl font-bold text-gray-900">
              {tactics.length > 0 ? Math.max(...tactics.map((t) => Math.abs(t.deviationPercent))).toFixed(2) : 0}%
            </p>
          </div>
        </div>

        {/* Deviation Warnings */}
        {totalDeviations > 5 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-yellow-900 mb-3">⚠️ Deviation Limit Warning</h3>
            <p className="text-sm text-yellow-800">
              Total tactical deviations ({totalDeviations.toFixed(2)}%) are exceeding the ±5% maximum threshold.
              Consider reverting completed tactics to strategic allocation.
            </p>
          </div>
        )}

        {/* Read-Only Tactical Log Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tactical Move</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Deviation %</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Market Signal</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Approved By</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tactics.map((tactic) => (
                <tr key={tactic.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{tactic.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{tactic.tacticalMove}</td>
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">{tactic.deviationPercent}%</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{tactic.marketSignal}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{tactic.duration}</td>
                  <td className="px-6 py-4 text-sm"><span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">{tactic.approvedBy}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-700">{tactic.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



        {/* Decision Workflow Info */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">🔄 Decision Workflow</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-2">
                1
              </div>
              <p className="text-sm font-medium">Proposed</p>
              <p className="text-xs text-gray-600">Tactic logged</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-2">
                2
              </div>
              <p className="text-sm font-medium">Approved</p>
              <p className="text-xs text-gray-600">IC sign-off</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-2">
                3
              </div>
              <p className="text-sm font-medium">Active</p>
              <p className="text-xs text-gray-600">Executed</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-2">
                4
              </div>
              <p className="text-sm font-medium">Completed</p>
              <p className="text-xs text-gray-600">Reverted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page5TacticalLog;
