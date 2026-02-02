import React, { useState, useEffect } from 'react';
import '../styles/adminPortfolioManager.css';
import portfolioData from '../data/portfolio.json';
import allocationsData from '../data/allocations.json';
import securitiesData from '../data/securities.json';
import liquidityData from '../data/liquidity.json';
import tacticalData from '../data/tactical.json';
import performanceData from '../data/performance.json';
import complianceData from '../data/compliance.json';
import type {
  PortfolioAllocation,
  Security,
  RiskMetric,
  LiquidityItem,
  TacticalAdjustment,
  PerformanceMetric,
  ComplianceCheck,
  PortfolioState,
  AssetClass,
  Sector,
  GeographicExposure,
} from '../types/portfolio';

interface AdminProps {
  onSavePortfolio?: (portfolio: PortfolioState) => void;
}

type TabType = 'allocations' | 'securities' | 'risk' | 'liquidity' | 'tactical' | 'performance' | 'compliance';

const ASSET_CLASSES: AssetClass[] = [
  'Fixed Income',
  'Domestic Equities',
  'Regional (EAC/SADC) Equities',
  'Cash & Cash Equivalents',
];

const SECTORS: Sector[] = [
  'Banking',
  'Telecommunications',
  'Consumer Goods',
  'Government',
  'Technology',
  'Energy',
  'Other',
];

const GEOGRAPHIC_EXPOSURES: GeographicExposure[] = [
  'Tanzania',
  'Kenya',
  'Uganda',
  'South Africa',
  'Regional',
];

export const AdminPortfolioManager: React.FC<AdminProps> = ({ onSavePortfolio }) => {
  const [activeTab, setActiveTab] = useState<TabType>('allocations');
  const [portfolio, setPortfolio] = useState<PortfolioState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');
  const [editingSecurityId, setEditingSecurityId] = useState<string | null>(null);

  // Load portfolio data
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        // Merge all data sources into a combined portfolio state
        // Extract allocations from the latest entry in the array
        const latestAllocations = (Array.isArray(allocationsData) ? allocationsData[allocationsData.length - 1] : allocationsData);
        const latestTactical = (Array.isArray(tacticalData) ? tacticalData[tacticalData.length - 1] : tacticalData);
        
        const mergedPortfolio: PortfolioState = {
          date: portfolioData.date,
          allocations: latestAllocations.allocations as PortfolioAllocation[],
          securities: securitiesData.securities as Security[],
          riskMetrics: portfolioData.riskMetrics as RiskMetric[],
          liquidityItems: liquidityData.liquidityItems as LiquidityItem[],
          tacticalAdjustments: latestTactical.tacticalAdjustments,
          performanceMetrics: performanceData.performanceMetrics,
          complianceChecks: complianceData.complianceChecks,
        };
        setPortfolio(mergedPortfolio);
        setLoading(false);
      } catch (error) {
        console.error('Error loading portfolio:', error);
        setSaveStatus('error');
        setSaveMessage('Failed to load portfolio data');
        setLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  const handleSavePortfolio = async () => {
    if (!portfolio) return;

    setSaveStatus('saving');
    try {
      // Save to server (you'll need to implement this endpoint)
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolio),
      });

      if (!response.ok) throw new Error('Failed to save portfolio');

      setSaveStatus('success');
      setSaveMessage('Portfolio saved successfully!');
      onSavePortfolio?.(portfolio);

      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving portfolio:', error);
      setSaveStatus('error');
      setSaveMessage('Failed to save portfolio');
    }
  };

  const handleExportJSON = () => {
    if (!portfolio) return;
    const dataStr = JSON.stringify(portfolio, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-backup-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="admin-loading">Loading portfolio data...</div>;
  }

  if (!portfolio) {
    return <div className="admin-error">Failed to load portfolio</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Portfolio Management Admin</h1>
        <p>Last updated: {portfolio.date}</p>
      </div>

      {/* Status Messages */}
      {saveStatus !== 'idle' && (
        <div className={`admin-status admin-status-${saveStatus}`}>
          {saveMessage}
        </div>
      )}

      {/* Action Buttons */}
      <div className="admin-actions">
        <button className="btn btn-primary" onClick={handleSavePortfolio}>
          💾 Save Portfolio
        </button>
        <button className="btn btn-secondary" onClick={handleExportJSON}>
          ⬇️ Export JSON
        </button>
        <input
          type="file"
          accept=".json"
          aria-label="Import portfolio JSON file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                try {
                  const imported = JSON.parse(event.target?.result as string);
                  setPortfolio(imported);
                  setSaveMessage('Portfolio imported successfully');
                  setSaveStatus('success');
                  setTimeout(() => setSaveStatus('idle'), 3000);
                } catch (error) {
                  setSaveMessage('Failed to import portfolio');
                  setSaveStatus('error');
                }
              };
              reader.readAsText(file);
            }
          }}
          id="import-file"
        />
        <button
          className="btn btn-secondary"
          onClick={() => document.getElementById('import-file')?.click()}
        >
          ⬆️ Import JSON
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'allocations' ? 'active' : ''}`}
          onClick={() => setActiveTab('allocations')}
        >
          📊 Allocations
        </button>
        <button
          className={`tab-btn ${activeTab === 'securities' ? 'active' : ''}`}
          onClick={() => setActiveTab('securities')}
        >
          📈 Securities
        </button>
        <button
          className={`tab-btn ${activeTab === 'risk' ? 'active' : ''}`}
          onClick={() => setActiveTab('risk')}
        >
          ⚠️ Risk Metrics
        </button>
        <button
          className={`tab-btn ${activeTab === 'liquidity' ? 'active' : ''}`}
          onClick={() => setActiveTab('liquidity')}
        >
          💧 Liquidity
        </button>
        <button
          className={`tab-btn ${activeTab === 'tactical' ? 'active' : ''}`}
          onClick={() => setActiveTab('tactical')}
        >
          🎯 Tactical
        </button>
        <button
          className={`tab-btn ${activeTab === 'performance' ? 'active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          📈 Performance
        </button>
        <button
          className={`tab-btn ${activeTab === 'compliance' ? 'active' : ''}`}
          onClick={() => setActiveTab('compliance')}
        >
          ✓ Compliance
        </button>
      </div>

      {/* Tab Content */}
      <div className="admin-content">
        {activeTab === 'allocations' && (
          <AllocationEditor
            allocations={portfolio.allocations}
            onChange={(allocations) => setPortfolio({ ...portfolio, allocations })}
          />
        )}

        {activeTab === 'securities' && (
          <SecuritiesEditor
            securities={portfolio.securities}
            onChange={(securities) => setPortfolio({ ...portfolio, securities })}
          />
        )}

        {activeTab === 'risk' && (
          <RiskMetricsEditor
            metrics={portfolio.riskMetrics}
            onChange={(riskMetrics) => setPortfolio({ ...portfolio, riskMetrics })}
          />
        )}

        {activeTab === 'liquidity' && (
          <LiquidityEditor
            items={portfolio.liquidityItems}
            onChange={(liquidityItems) => setPortfolio({ ...portfolio, liquidityItems })}
          />
        )}

        {activeTab === 'tactical' && (
          <TacticalEditor
            adjustments={portfolio.tacticalAdjustments}
            onChange={(tacticalAdjustments) =>
              setPortfolio({ ...portfolio, tacticalAdjustments })
            }
          />
        )}

        {activeTab === 'performance' && (
          <PerformanceEditor
            metrics={portfolio.performanceMetrics}
            onChange={(performanceMetrics) =>
              setPortfolio({ ...portfolio, performanceMetrics })
            }
          />
        )}

        {activeTab === 'compliance' && (
          <ComplianceEditor
            checks={portfolio.complianceChecks}
            onChange={(complianceChecks) =>
              setPortfolio({ ...portfolio, complianceChecks })
            }
          />
        )}
      </div>
    </div>
  );
};

// ============== ALLOCATION EDITOR ==============
interface AllocationEditorProps {
  allocations: PortfolioAllocation[];
  onChange: (allocations: PortfolioAllocation[]) => void;
}

const AllocationEditor: React.FC<AllocationEditorProps> = ({ allocations, onChange }) => {
  const handleUpdate = (index: number, field: keyof PortfolioAllocation, value: any) => {
    const updated = [...allocations];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="editor-section">
      <h2>Portfolio Allocations</h2>
      <table className="editor-table">
        <thead>
          <tr>
            <th>Asset Class</th>
            <th>Target %</th>
            <th>Current %</th>
            <th>Deviation %</th>
            <th>Rebalancing Required</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {allocations.map((alloc, idx) => (
            <tr key={idx}>
              <td>
                <select
                  aria-label="Asset class"
                  value={alloc.assetClass}
                  onChange={(e) =>
                    handleUpdate(idx, 'assetClass', e.target.value as AssetClass)
                  }
                  disabled
                >
                  {ASSET_CLASSES.map((ac) => (
                    <option key={ac} value={ac}>
                      {ac}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  aria-label="Target allocation percentage"
                  value={alloc.target}
                  onChange={(e) => handleUpdate(idx, 'target', parseFloat(e.target.value))}
                  step="0.1"
                  min="0"
                  max="100"
                />
              </td>
              <td>
                <input
                  type="number"
                  aria-label="Current allocation percentage"
                  value={alloc.current}
                  onChange={(e) => handleUpdate(idx, 'current', parseFloat(e.target.value))}
                  step="0.1"
                  min="0"
                  max="100"
                />
              </td>
              <td>
                <span>{(alloc.current - alloc.target).toFixed(2)}%</span>
              </td>
              <td>
                <input
                  type="checkbox"
                  aria-label="Rebalancing required"
                  checked={alloc.rebalancingRequired}
                  onChange={(e) =>
                    handleUpdate(idx, 'rebalancingRequired', e.target.checked)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  aria-label="Allocation notes"
                  value={alloc.notes}
                  onChange={(e) => handleUpdate(idx, 'notes', e.target.value)}
                  placeholder="Notes"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ============== SECURITIES EDITOR ==============
interface SecuritiesEditorProps {
  securities: Security[];
  onChange: (securities: Security[]) => void;
}

const SecuritiesEditor: React.FC<SecuritiesEditorProps> = ({ securities, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAddSecurity = () => {
    const newSecurity: Security = {
      id: `sec-${Date.now()}`,
      name: 'New Security',
      ticker: '',
      assetClass: 'Domestic Equities',
      currentWeight: 0,
      targetWeight: 0,
      deviation: 0,
      sector: 'Banking',
      geographicExposure: 'Tanzania',
      marketValue: 0,
      quantity: 0,
      purchasePrice: 0,
      currentPrice: 0,
      notes: '',
      ipsCompliant: true,
    };
    onChange([...securities, newSecurity]);
    setExpandedId(newSecurity.id);
  };

  const handleUpdate = (id: string, field: keyof Security, value: any) => {
    const updated = securities.map((sec) =>
      sec.id === id ? { ...sec, [field]: value } : sec
    );
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this security?')) {
      onChange(securities.filter((sec) => sec.id !== id));
    }
  };

  return (
    <div className="editor-section">
      <h2>Securities Holdings</h2>
      <button className="btn btn-primary" onClick={handleAddSecurity}>
        ➕ Add Security
      </button>

      <div className="securities-list">
        {securities.map((security) => (
          <div key={security.id} className="security-card">
            <div className="security-header" onClick={() => setExpandedId(expandedId === security.id ? null : security.id)}>
              <div className="security-title">
                <strong>{security.name}</strong> ({security.ticker})
              </div>
              <span className="expand-icon">{expandedId === security.id ? '▼' : '▶'}</span>
            </div>

            {expandedId === security.id && (
              <div className="security-details">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      aria-label="Security name"
                      value={security.name}
                      onChange={(e) => handleUpdate(security.id, 'name', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Ticker</label>
                    <input
                      type="text"
                      aria-label="Security ticker symbol"
                      value={security.ticker}
                      onChange={(e) => handleUpdate(security.id, 'ticker', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Asset Class</label>
                    <select
                      aria-label="Security asset class"
                      value={security.assetClass}
                      onChange={(e) =>
                        handleUpdate(security.id, 'assetClass', e.target.value as AssetClass)
                      }
                    >
                      {ASSET_CLASSES.map((ac) => (
                        <option key={ac} value={ac}>
                          {ac}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Sector</label>
                    <select
                      aria-label="Security sector"
                      value={security.sector}
                      onChange={(e) =>
                        handleUpdate(security.id, 'sector', e.target.value as Sector)
                      }
                    >
                      {SECTORS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Geographic Exposure</label>
                    <select
                      aria-label="Geographic exposure region"
                      value={security.geographicExposure}
                      onChange={(e) =>
                        handleUpdate(security.id, 'geographicExposure', e.target.value as GeographicExposure)
                      }
                    >
                      {GEOGRAPHIC_EXPOSURES.map((ge) => (
                        <option key={ge} value={ge}>
                          {ge}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      aria-label="Security quantity"
                      value={security.quantity}
                      onChange={(e) =>
                        handleUpdate(security.id, 'quantity', parseFloat(e.target.value))
                      }
                      step="0.01"
                    />
                  </div>

                  <div className="form-group">
                    <label>Purchase Price (TZS)</label>
                    <input
                      type="number"
                      aria-label="Purchase price in TZS"
                      value={security.purchasePrice}
                      onChange={(e) =>
                        handleUpdate(security.id, 'purchasePrice', parseFloat(e.target.value))
                      }
                      step="0.01"
                    />
                  </div>

                  <div className="form-group">
                    <label>Current Price (TZS)</label>
                    <input
                      type="number"
                      aria-label="Current price in TZS"
                      value={security.currentPrice}
                      onChange={(e) =>
                        handleUpdate(security.id, 'currentPrice', parseFloat(e.target.value))
                      }
                      step="0.01"
                    />
                  </div>

                  <div className="form-group">
                    <label>Current Weight %</label>
                    <input
                      type="number"
                      aria-label="Current weight percentage"
                      value={security.currentWeight}
                      onChange={(e) =>
                        handleUpdate(security.id, 'currentWeight', parseFloat(e.target.value))
                      }
                      step="0.1"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="form-group">
                    <label>Target Weight %</label>
                    <input
                      type="number"
                      aria-label="Target weight percentage"
                      value={security.targetWeight}
                      onChange={(e) =>
                        handleUpdate(security.id, 'targetWeight', parseFloat(e.target.value))
                      }
                      step="0.1"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="form-group">
                    <label>IPS Compliant</label>
                    <input
                      type="checkbox"
                      aria-label="IPS compliant status"
                      checked={security.ipsCompliant}
                      onChange={(e) =>
                        handleUpdate(security.id, 'ipsCompliant', e.target.checked)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Notes</label>
                    <textarea
                      aria-label="Security notes"
                      value={security.notes}
                      onChange={(e) => handleUpdate(security.id, 'notes', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(security.id)}
                >
                  🗑️ Delete Security
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============== RISK METRICS EDITOR ==============
interface RiskMetricsEditorProps {
  metrics: RiskMetric[];
  onChange: (metrics: RiskMetric[]) => void;
}

const RiskMetricsEditor: React.FC<RiskMetricsEditorProps> = ({ metrics, onChange }) => {
  const handleUpdate = (index: number, field: keyof RiskMetric, value: any) => {
    const updated = [...metrics];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([
      ...metrics,
      {
        metric: 'New Metric',
        ipsLimit: '',
        currentValue: '',
        status: 'Compliant' as const,
        actionRequired: '',
      },
    ]);
  };

  const handleDelete = (index: number) => {
    onChange(metrics.filter((_, i) => i !== index));
  };

  return (
    <div className="editor-section">
      <h2>Risk Metrics</h2>
      <button className="btn btn-primary" onClick={handleAdd}>
        ➕ Add Metric
      </button>

      <table className="editor-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>IPS Limit</th>
            <th>Current Value</th>
            <th>Status</th>
            <th>Action Required</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, idx) => (
            <tr key={idx}>
              <td>
                <input
                  type="text"
                  aria-label="Risk metric name"
                  value={metric.metric}
                  onChange={(e) => handleUpdate(idx, 'metric', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  aria-label="IPS limit"
                  value={metric.ipsLimit}
                  onChange={(e) => handleUpdate(idx, 'ipsLimit', e.target.value)}
                  placeholder="e.g., ≤10%"
                />
              </td>
              <td>
                <input
                  type="text"
                  aria-label="Current metric value"
                  value={metric.currentValue}
                  onChange={(e) => handleUpdate(idx, 'currentValue', e.target.value)}
                />
              </td>
              <td>
                <select
                  aria-label="Compliance status"
                  value={metric.status}
                  onChange={(e) =>
                    handleUpdate(idx, 'status', e.target.value as 'Compliant' | 'Warning' | 'Breach')
                  }
                >
                  <option value="Compliant">Compliant</option>
                  <option value="Warning">Warning</option>
                  <option value="Breach">Breach</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  aria-label="Action required for metric"
                  value={metric.actionRequired}
                  onChange={(e) => handleUpdate(idx, 'actionRequired', e.target.value)}
                  placeholder="Action needed"
                />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(idx)}
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ============== LIQUIDITY EDITOR ==============
interface LiquidityEditorProps {
  items: LiquidityItem[];
  onChange: (items: LiquidityItem[]) => void;
}

const LiquidityEditor: React.FC<LiquidityEditorProps> = ({ items, onChange }) => {
  const handleUpdate = (index: number, field: keyof LiquidityItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([
      ...items,
      {
        item: 'New Item',
        minimum: 0,
        maximum: 0,
        current: 0,
        status: 'Adequate' as const,
        actionNeeded: '',
      },
    ]);
  };

  const handleDelete = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="editor-section">
      <h2>Liquidity Management</h2>
      <button className="btn btn-primary" onClick={handleAdd}>
        ➕ Add Liquidity Item
      </button>

      <table className="editor-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Minimum %</th>
            <th>Maximum %</th>
            <th>Current %</th>
            <th>Status</th>
            <th>Action Needed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>
                <input
                  type="text"
                  aria-label="Liquidity item name"
                  value={item.item}
                  onChange={(e) => handleUpdate(idx, 'item', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  aria-label="Minimum percentage"
                  value={item.minimum}
                  onChange={(e) => handleUpdate(idx, 'minimum', parseFloat(e.target.value))}
                  step="0.1"
                />
              </td>
              <td>
                <input
                  type="number"
                  aria-label="Maximum percentage"
                  value={item.maximum}
                  onChange={(e) => handleUpdate(idx, 'maximum', parseFloat(e.target.value))}
                  step="0.1"
                />
              </td>
              <td>
                <input
                  type="number"
                  aria-label="Current percentage"
                  value={item.current}
                  onChange={(e) => handleUpdate(idx, 'current', parseFloat(e.target.value))}
                  step="0.1"
                />
              </td>
              <td>
                <select
                  aria-label="Liquidity status"
                  value={item.status}
                  onChange={(e) => handleUpdate(idx, 'status', e.target.value as 'Adequate' | 'Warning' | 'Critical')}
                >
                  <option value="Adequate">Adequate</option>
                  <option value="Warning">Warning</option>
                  <option value="Critical">Critical</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  aria-label="Action needed for liquidity"
                  value={item.actionNeeded}
                  onChange={(e) => handleUpdate(idx, 'actionNeeded', e.target.value)}
                  placeholder="Action needed"
                />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(idx)}
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ============== TACTICAL EDITOR ==============
interface TacticalEditorProps {
  adjustments: TacticalAdjustment[];
  onChange: (adjustments: TacticalAdjustment[]) => void;
}

const TacticalEditor: React.FC<TacticalEditorProps> = ({ adjustments, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    const newAdjustment: TacticalAdjustment = {
      id: `tac-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      tacticalMove: 'New Tactical Adjustment',
      deviationPercent: 0,
      marketSignal: '',
      duration: '',
      approvedBy: '',
      notes: '',
    };
    onChange([...adjustments, newAdjustment]);
    setExpandedId(newAdjustment.id);
  };

  const handleUpdate = (id: string, field: keyof TacticalAdjustment, value: any) => {
    const updated = adjustments.map((adj) =>
      adj.id === id ? { ...adj, [field]: value } : adj
    );
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this tactical adjustment?')) {
      onChange(adjustments.filter((adj) => adj.id !== id));
    }
  };

  return (
    <div className="editor-section">
      <h2>Tactical Adjustments</h2>
      <button className="btn btn-primary" onClick={handleAdd}>
        ➕ Add Tactical Adjustment
      </button>

      <div className="adjustments-list">
        {adjustments.map((adj) => (
          <div key={adj.id} className="adjustment-card">
            <div
              className="adjustment-header"
              onClick={() => setExpandedId(expandedId === adj.id ? null : adj.id)}
            >
              <div className="adjustment-title">
                <strong>{adj.tacticalMove}</strong> - {adj.date}
              </div>
              <span className="expand-icon">{expandedId === adj.id ? '▼' : '▶'}</span>
            </div>

            {expandedId === adj.id && (
              <div className="adjustment-details">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      aria-label="Adjustment date"
                      value={adj.date}
                      onChange={(e) => handleUpdate(adj.id, 'date', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Tactical Move</label>
                    <input
                      type="text"
                      aria-label="Tactical move description"
                      value={adj.tacticalMove}
                      onChange={(e) => handleUpdate(adj.id, 'tacticalMove', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Deviation %</label>
                    <input
                      type="number"
                      aria-label="Deviation percentage"
                      value={adj.deviationPercent}
                      onChange={(e) =>
                        handleUpdate(adj.id, 'deviationPercent', parseFloat(e.target.value))
                      }
                      step="0.1"
                    />
                  </div>

                  <div className="form-group">
                    <label>Market Signal</label>
                    <input
                      type="text"
                      aria-label="Market signal"
                      value={adj.marketSignal}
                      onChange={(e) => handleUpdate(adj.id, 'marketSignal', e.target.value)}
                      placeholder="e.g., Rising interest rates"
                    />
                  </div>

                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      aria-label="Adjustment duration"
                      value={adj.duration}
                      onChange={(e) => handleUpdate(adj.id, 'duration', e.target.value)}
                      placeholder="e.g., 2 weeks"
                    />
                  </div>

                  <div className="form-group">
                    <label>Approved By (Initials)</label>
                    <input
                      type="text"
                      aria-label="Approved by initials"
                      value={adj.approvedBy}
                      onChange={(e) => handleUpdate(adj.id, 'approvedBy', e.target.value)}
                      placeholder="IC / PM initials"
                      maxLength={5}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Notes</label>
                    <textarea
                      aria-label="Adjustment notes"
                      value={adj.notes}
                      onChange={(e) => handleUpdate(adj.id, 'notes', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(adj.id)}
                >
                  🗑️ Delete Adjustment
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============== PERFORMANCE EDITOR ==============
interface PerformanceEditorProps {
  metrics: PerformanceMetric[];
  onChange: (metrics: PerformanceMetric[]) => void;
}

const PerformanceEditor: React.FC<PerformanceEditorProps> = ({ metrics, onChange }) => {
  const handleUpdate = (index: number, field: keyof PerformanceMetric, value: any) => {
    const updated = [...metrics];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([
      ...metrics,
      {
        metric: 'New Performance Metric',
        target: '',
        current: '',
        deviation: '',
        notes: '',
      },
    ]);
  };

  const handleDelete = (index: number) => {
    onChange(metrics.filter((_, i) => i !== index));
  };

  return (
    <div className="editor-section">
      <h2>Performance Metrics</h2>
      <button className="btn btn-primary" onClick={handleAdd}>
        ➕ Add Performance Metric
      </button>

      <table className="editor-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Target / Benchmark</th>
            <th>Current Value</th>
            <th>Deviation</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, idx) => (
            <tr key={idx}>
              <td>
                <input
                  type="text"
                  aria-label="Performance metric name"
                  value={metric.metric}
                  onChange={(e) => handleUpdate(idx, 'metric', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  aria-label="Target or benchmark value"
                  value={metric.target}
                  onChange={(e) => handleUpdate(idx, 'target', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  aria-label="Current metric value"
                  value={metric.current}
                  onChange={(e) => handleUpdate(idx, 'current', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  aria-label="Deviation from target"
                  value={metric.deviation}
                  onChange={(e) => handleUpdate(idx, 'deviation', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  aria-label="Performance metric notes"
                  value={metric.notes}
                  onChange={(e) => handleUpdate(idx, 'notes', e.target.value)}
                  placeholder="Notes"
                />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(idx)}
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ============== COMPLIANCE EDITOR ==============
interface ComplianceEditorProps {
  checks: ComplianceCheck[];
  onChange: (checks: ComplianceCheck[]) => void;
}

const ComplianceEditor: React.FC<ComplianceEditorProps> = ({ checks, onChange }) => {
  const handleUpdate = (index: number, field: keyof ComplianceCheck, value: any) => {
    const updated = [...checks];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([
      ...checks,
      {
        area: 'New Compliance Area',
        ipsLimit: '',
        currentStatus: 'Compliant',
        breach: false,
        actionRequired: '',
      },
    ]);
  };

  const handleDelete = (index: number) => {
    onChange(checks.filter((_, i) => i !== index));
  };

  return (
    <div className="editor-section">
      <h2>Compliance Checks</h2>
      <button className="btn btn-primary" onClick={handleAdd}>
        ➕ Add Compliance Check
      </button>

      <table className="editor-table">
        <thead>
          <tr>
            <th>Compliance Area</th>
            <th>IPS Limit / Rule</th>
            <th>Current Status</th>
            <th>Breach</th>
            <th>Action Required</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {checks.map((check, idx) => (
            <tr key={idx} className={check.breach ? 'breach-row' : ''}>
              <td>
                <input
                  type="text"
                  aria-label="Compliance area"
                  value={check.area}
                  onChange={(e) => handleUpdate(idx, 'area', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  aria-label="IPS limit or rule"
                  value={check.ipsLimit}
                  onChange={(e) => handleUpdate(idx, 'ipsLimit', e.target.value)}
                  placeholder="e.g., ≤10%"
                />
              </td>
              <td>
                <input
                  type="text"
                  aria-label="Current compliance status"
                  value={check.currentStatus}
                  onChange={(e) => handleUpdate(idx, 'currentStatus', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  aria-label="Breach indicator"
                  checked={check.breach}
                  onChange={(e) => handleUpdate(idx, 'breach', e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="text"
                  aria-label="Action required for compliance"
                  value={check.actionRequired}
                  onChange={(e) => handleUpdate(idx, 'actionRequired', e.target.value)}
                  placeholder="Action needed"
                />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(idx)}
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPortfolioManager;
