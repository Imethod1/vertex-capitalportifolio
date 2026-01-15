# Admin Panel Quick Reference

## Quick Start (30 seconds)

1. Click **⚙️ Admin Panel** in sidebar
2. Use tabs to navigate different portfolio sections
3. Edit data directly in forms and tables
4. Click **💾 Save Portfolio** when done

## Tab Functions at a Glance

### 📊 Allocations
Edit target vs current percentages for 4 asset classes
```
Fixed Income, Domestic Equities, Regional Equities, Cash
```

### 📈 Securities
Manage individual holdings with full details
```
Add/Edit/Delete securities with prices, weights, compliance
```

### ⚠️ Risk Metrics
Track 6+ IPS risk constraints
```
Status: ✓ Compliant | ⚠️ Warning | ❌ Breach
```

### 💧 Liquidity
Monitor cash positions and liquidation capability
```
Items: Cash, Liquidation Time, Bid-Ask Spread
```

### 🎯 Tactical
Log portfolio adjustments with approval
```
Date | Move | Signal | Duration | Approved By
```

### 📈 Performance
Track return vs benchmark
```
Return, Asset Class Returns, Risk-adjusted Metrics
```

### ✓ Compliance
Verify regulatory compliance
```
7 compliance areas - check for breaches
```

## Common Tasks

### Add New Security
1. Go to **Securities** tab
2. Click **➕ Add Security**
3. Fill required fields
4. Click **Save Portfolio**

### Log Tactical Adjustment
1. Go to **Tactical** tab
2. Click **➕ Add Tactical Adjustment**
3. Fill date, move, market signal, approval
4. Click **Save Portfolio**

### Check Compliance Status
1. Go to **Compliance** tab
2. Look for red rows (breach = true)
3. Add actionRequired text
4. Click **Save Portfolio**

### Rebalance Allocation
1. Go to **Allocations** tab
2. Update "Current %" values
3. Check "Rebalancing Required" if needed
4. Click **Save Portfolio**

### Backup Portfolio
1. Click **⬇️ Export JSON**
2. Save file safely
3. Auto-named with timestamp

### Restore Portfolio
1. Click **⬆️ Import JSON**
2. Select backup file
3. Review changes
4. Click **Save Portfolio**

## IPS Compliance Limits

| Metric | Limit |
|--------|-------|
| Single Security | ≤10% |
| Single Sector | ≤25% |
| Regional Allocation | ≤10% |
| Portfolio Volatility | 5-7% ann. |
| Maximum Drawdown | ≤5% |
| Credit Rating | ≥Investment Grade |
| Portfolio Duration | ≤2 years |

## Data Entry Tips

✅ **Do:**
- Use clear notes explaining changes
- Validate data before saving
- Export backups before major changes
- Update tactical log with approvals
- Keep compliance flags current

❌ **Don't:**
- Leave mandatory fields empty
- Use percentages > 100%
- Forget approval initials on tactics
- Ignore breach warnings
- Skip compliance review

## Status Meanings

### Risk/Compliance Status
- **✓ Compliant** - Within IPS limits
- **⚠️ Warning** - Approaching limits
- **❌ Breach** - Exceeds limits

### Liquidity Status
- **✓ Adequate** - Sufficient liquidity
- **⚠️ Warning** - Monitor closely
- **❌ Critical** - Immediate action needed

## Keyboard Shortcuts

| Action | Keys |
|--------|------|
| Save | Ctrl+S (custom handler) |
| Export | Click button |
| Import | Click button |
| Tab navigation | Tab key |
| Expand security | Click row |

## Field Definitions

### Allocations
- **Target %** = Desired allocation
- **Current %** = Actual holdings
- **Deviation %** = Difference (auto-calculated)
- **Rebalancing Required** = Needs rebalancing

### Securities
- **currentWeight %** = Weight in portfolio
- **targetWeight %** = Target weight
- **marketValue** = TZS value (calc: quantity × currentPrice)
- **ipsCompliant** = Meets IPS constraints

### Risk Metrics
- **ipsLimit** = Regulatory maximum
- **currentValue** = Actual metric value
- **status** = Compliance status
- **actionRequired** = Steps if not compliant

### Liquidity
- **minimum/maximum** = Target range %
- **current** = Current value %
- **status** = Liquidity condition
- **actionNeeded** = Required steps

## API Integration

Auto-saves to: `/api/portfolio`

Backup format: `portfolio-backup-{timestamp}.json`

## Browser Compatibility

✅ Tested on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

❌ Not supported:
- Internet Explorer
- Older mobile browsers

## Need Help?

1. Check **ADMIN_PANEL_GUIDE.md** for details
2. Review JSON structure
3. Check browser console (F12)
4. Export current state as backup
5. Try in different browser

---
**Last Updated**: 2026-01-15
**Version**: 1.0.0
