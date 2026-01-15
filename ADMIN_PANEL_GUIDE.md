# Portfolio Management Admin Interface

## Overview

The Admin Panel provides comprehensive controls for editing all important tables in the Vertex Capital Portfolio system. This allows portfolio managers and administrators to maintain, update, and validate portfolio data according to security analysis and portfolio management best practices.

## Features

### 1. **Portfolio Allocations Editor** 📊
Edit asset class allocations and targets:
- **Asset Classes**: Fixed Income, Domestic Equities, Regional Equities, Cash & Equivalents
- **Fields**:
  - Target % - Desired allocation percentage
  - Current % - Actual current allocation
  - Deviation % - Auto-calculated difference
  - Rebalancing Required - Flag for rebalancing needs
  - Notes - Context and rationale

### 2. **Securities Holdings Manager** 📈
Complete management of individual securities:
- **Add/Edit/Delete** individual security holdings
- **Fields**:
  - Name & Ticker
  - Asset Class & Sector
  - Geographic Exposure (Tanzania, Kenya, Uganda, South Africa, Regional)
  - Quantity & Price (Purchase & Current)
  - Weight Management (Current & Target)
  - IPS Compliance Flag
  - Notes & Documentation

### 3. **Risk Metrics Editor** ⚠️
Monitor and update risk compliance metrics:
- **Metrics Include**:
  - Single Security Exposure (≤10%)
  - Single Sector Exposure (≤25%)
  - Regional Allocation Limit (≤10%)
  - Portfolio Volatility (5-7% ann.)
  - Drawdown Limit (≤5%)
  - Credit Rating Compliance
  - Weighted Portfolio Duration

- **Tracking Fields**:
  - IPS Limit - Regulatory constraint
  - Current Value - Actual metric value
  - Status - Compliant / Warning / Breach
  - Action Required - Remediation steps

### 4. **Liquidity Management** 💧
Track and manage portfolio liquidity:
- **Items**:
  - Cash & Equivalents (10-15%)
  - Time to Liquidate (≤30 days)
  - Bid-Ask Spread / Daily Volume
  - Custom liquidity items

- **Fields**:
  - Minimum/Maximum %
  - Current %
  - Status - Adequate / Warning / Critical
  - Action Needed - Required steps

### 5. **Tactical Adjustments** 🎯
Log and manage tactical portfolio moves:
- **Fields**:
  - Date - When adjustment made
  - Tactical Move - Description of action
  - Deviation % - Size of adjustment
  - Market Signal - Reason/trigger
  - Duration - Expected length
  - Approved By - IC/PM initials
  - Notes - Detailed rationale

### 6. **Performance Metrics** 📈
Monitor portfolio performance:
- **Metrics**:
  - Total Portfolio Return
  - Asset Class Returns
  - Benchmark-relative Return
  - Risk-adjusted Metrics (Sharpe/Sortino)

- **Fields**:
  - Metric Name
  - Target/Benchmark
  - Current Value
  - Deviation
  - Notes

### 7. **Compliance Checks** ✓
Track regulatory and IPS compliance:
- **Areas**:
  - Single Security Limit
  - Single Sector Limit
  - Regional Allocation Limit
  - Drawdown Limit
  - Prohibited Instruments
  - Credit Rating Compliance

- **Fields**:
  - Compliance Area
  - IPS Limit/Rule
  - Current Status
  - Breach Flag
  - Action Required

## Access

### URL
```
http://localhost:5173/admin
```

### Navigation
Click on the **⚙️ Admin Panel** link in the Sidebar

## Data Management

### Saving Portfolio Data
- Click the **💾 Save Portfolio** button
- Data will be saved to the backend
- Success notification confirms save

### Exporting Data
- Click **⬇️ Export JSON**
- Generates backup with timestamp
- File: `portfolio-backup-YYYY-MM-DDTHH:mm:ss.sssZ.json`

### Importing Data
- Click **⬆️ Import JSON**
- Select previously exported file
- Portfolio data will be restored

## Tab Navigation

| Tab | Icon | Purpose |
|-----|------|---------|
| Allocations | 📊 | Manage asset class targets |
| Securities | 📈 | Manage individual holdings |
| Risk Metrics | ⚠️ | Track IPS compliance |
| Liquidity | 💧 | Monitor liquidity positions |
| Tactical | 🎯 | Log tactical adjustments |
| Performance | 📈 | Track performance metrics |
| Compliance | ✓ | Verify regulatory compliance |

## Workflow Examples

### Example 1: Rebalancing Portfolio
1. Go to **Allocations** tab
2. Update **Current %** for each asset class
3. Check **Rebalancing Required** flags
4. Update notes with rationale
5. Click **Save Portfolio**

### Example 2: Adding New Security
1. Go to **Securities** tab
2. Click **➕ Add Security**
3. Fill in all fields:
   - Ticker & Name
   - Asset Class & Sector
   - Quantity & Price
   - Weight allocation
4. Click **Save Portfolio**

### Example 3: Recording Tactical Adjustment
1. Go to **Tactical** tab
2. Click **➕ Add Tactical Adjustment**
3. Fill in:
   - Date of adjustment
   - Description of move
   - Market signal/reason
   - Expected duration
   - Approval initials
4. Click **Save Portfolio**

### Example 4: Monitoring Risk Compliance
1. Go to **Risk Metrics** tab
2. Review all metrics
3. For any **Breach** or **Warning** status:
   - Update Current Value
   - Specify Action Required
4. Click **Save Portfolio**

## Data Format

### Portfolio JSON Structure
```json
{
  "date": "2026-01-15",
  "allocations": [
    {
      "assetClass": "Fixed Income",
      "targetPercent": 50,
      "currentPercent": 48,
      "deviationPercent": -2,
      "rebalancingRequired": false,
      "notes": "Government bonds"
    }
  ],
  "securities": [
    {
      "id": "sec-123456",
      "name": "Company Name",
      "ticker": "TICK",
      "assetClass": "Domestic Equities",
      "currentWeight": 5.2,
      "targetWeight": 5.0,
      "deviation": 0.2,
      "sector": "Banking",
      "geographicExposure": "Tanzania",
      "marketValue": 1000000,
      "quantity": 100,
      "purchasePrice": 9500,
      "currentPrice": 10000,
      "notes": "DSE-listed bank",
      "ipsCompliant": true
    }
  ],
  "riskMetrics": [
    {
      "metric": "Single Security Exposure",
      "ipsLimit": "≤10%",
      "currentValue": "8.5%",
      "status": "Compliant",
      "actionRequired": ""
    }
  ],
  "liquidityItems": [
    {
      "item": "Cash & Equivalents",
      "minimum": 10,
      "maximum": 15,
      "current": 12,
      "status": "Adequate",
      "actionNeeded": "Monitor weekly"
    }
  ],
  "tacticalAdjustments": [
    {
      "id": "tac-123456",
      "date": "2026-01-15",
      "tacticalMove": "Increased equity exposure",
      "deviationPercent": 2.5,
      "marketSignal": "Market recovery signal",
      "duration": "2 weeks",
      "approvedBy": "PM",
      "notes": "Response to rising market"
    }
  ],
  "performanceMetrics": [
    {
      "metric": "Total Portfolio Return",
      "target": "8-12% annualized",
      "current": "2.1%",
      "deviation": "-5.9 to -9.9%",
      "notes": "Q1 target: 2-3%"
    }
  ],
  "complianceChecks": [
    {
      "area": "Single Security Limit",
      "ipsLimit": "≤10%",
      "currentStatus": "Compliant",
      "breach": false,
      "actionRequired": ""
    }
  ]
}
```

## Validation Rules

### Portfolio Allocations
- Target % must be 0-100
- Current % must be 0-100
- Deviation auto-calculated as (Current - Target)

### Securities
- All price fields must be positive
- Quantity must be non-negative
- Current + Target weights should reasonably align with asset class

### Risk Metrics
- Status: Compliant / Warning / Breach only
- Breach status requires actionRequired field

### Liquidity
- Status: Adequate / Warning / Critical only
- Critical status should have actionNeeded specified

## API Endpoints

### Save Portfolio
```
POST /api/portfolio
Content-Type: application/json

Body: {PortfolioState}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Portfolio data saved successfully",
  "data": {
    "date": "2026-01-15",
    "timestamp": "2026-01-15T14:30:00.000Z"
  }
}
```

### Error Responses
```json
{
  "error": "Invalid portfolio data",
  "message": "Error description"
}
```

## Best Practices

1. **Regular Updates**: Update portfolio data daily during trading hours
2. **Audit Trail**: Use Notes fields to maintain audit trail
3. **Compliance First**: Monitor Risk Metrics tab daily
4. **Backup**: Export JSON before major changes
5. **Approval**: Ensure tactical moves are properly approved
6. **Documentation**: Add detailed notes for all changes
7. **Review**: Weekly compliance review of all metrics

## Security Considerations

- Admin panel should be protected by authentication in production
- Portfolio data should be encrypted in transit
- Implement role-based access control (RBAC)
- Maintain audit logs of all changes
- Regular backups of portfolio data

## Troubleshooting

### Save Failed
- Check network connection
- Verify portfolio data is valid
- Check browser console for errors
- Export data as backup

### Import Failed
- Ensure JSON file is valid
- Check file format matches export format
- File should be previously exported from admin panel

### Display Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh page (Ctrl+R)
- Try different browser
- Check browser console for errors

## Future Enhancements

- [ ] Authentication & authorization
- [ ] Role-based access (Manager, Analyst, etc.)
- [ ] Change history & audit trail
- [ ] Real-time collaboration
- [ ] Advanced validation rules
- [ ] Data import from Bloomberg/Reuters
- [ ] Automated compliance alerts
- [ ] Historical snapshots
- [ ] Performance attribution analysis
- [ ] Stress testing integration

## Support

For issues or questions about the Admin Panel, contact:
- Portfolio Management Team
- IT Support
- Check logs in browser console (F12)
