# Vercel CMS Migration Guide

## Status: ✅ Ready to Configure

Your admin/CMS backend is now configured to use **Vercel** instead of Netlify.

---

## What Changed

**Before (Netlify):**
- ❌ Used Netlify Functions (limited free tier: 300 credits/month)
- ❌ Hit usage limits → Site paused
- ❌ Required separate Netlify Git Gateway setup

**Now (Vercel):**
- ✅ Uses Vercel Functions (4 hours CPU/month free, no pause)
- ✅ Direct GitHub OAuth via `/api/auth` endpoint
- ✅ Single platform for frontend + admin backend
- ✅ Same domain: `vertex-capital-portfolio.vercel.app`

---

## Required Setup Steps (5 minutes)

### Step 1: Add Environment Variable to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select project **`vertex-capital-portfolio`**
3. Click **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `DECAP_CMS_GITHUB_APP_SECRET`
   - **Value:** *(Your GitHub app secret)*
   - **Environments:** Production, Preview, Development
5. Click **Save**

**Don't have the secret?**
- Go to [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)
- Select your app: `Vertex Capital Portfolio`
- Copy the **Client Secret** value
- Paste into Vercel environment variable

### Step 2: Redeploy on Vercel

1. In Vercel Dashboard, go to **Deployments**
2. Click the three dots on the latest deployment
3. Select **Redeploy**
4. Wait for deployment to complete (~2-3 minutes)

### Step 3: Test the Admin Panel

1. Open: `https://vertex-capital-portfolio.vercel.app/admin`
2. Click **"Login with GitHub"**
3. Authorize the app
4. You should see the portfolio editor ✅

---

## Files Updated

- **`public/admin/config.yml`**
  - Changed `auth_endpoint` from `/api/auth` → full URL
  - Changed `base_url` to use static Vercel URL
  - Removed environment variable placeholder from `base_url`

- **`api/auth.js`** (No changes needed)
  - Already configured correctly
  - Uses `DECAP_CMS_GITHUB_APP_SECRET` from environment

---

## API Endpoint Details

**Auth Endpoint:** `https://vertex-capital-portfolio.vercel.app/api/auth`

This endpoint:
1. Receives GitHub OAuth code from Decap CMS
2. Exchanges code for GitHub access token
3. Returns token to CMS for authentication

Vercel automatically handles:
- SSL/TLS encryption
- Global CDN distribution
- Cold start optimization

---

## Troubleshooting

### "Admin page shows blank"
- Clear browser cache: `Ctrl+Shift+Delete`
- Check console (F12) for CORS or auth errors
- Verify `DECAP_CMS_GITHUB_APP_SECRET` is set in Vercel

### "Login with GitHub fails"
- Confirm GitHub app OAuth secret matches in Vercel
- Check that app is authorized for your repo
- Verify GitHub app redirect URL is set to `https://vertex-capital-portfolio.vercel.app/admin`

### "Changes not syncing to GitHub"
- Ensure Git Gateway is still enabled in GitHub (app settings)
- Check GitHub token permissions include `repo` and `user:email`

---

## Benefits

| Feature | Before (Netlify) | After (Vercel) |
|---------|------------------|-----------------|
| Free tier limit | 300 credits/mo | Unlimited |
| Function runtime | Limited | 4 hrs/month CPU |
| Pause risk | ⚠️ High | ✅ None |
| Setup complexity | Multiple services | Single platform |
| Cost at scale | $9-20+ | $20/mo |

---

## Next Steps

1. ✅ Set environment variable on Vercel
2. ✅ Redeploy on Vercel
3. ✅ Test admin login
4. Delete old Netlify site to avoid confusion

Need help? Check [Vercel Docs](https://vercel.com/docs) or [Decap CMS Docs](https://decapcms.org/docs/).
