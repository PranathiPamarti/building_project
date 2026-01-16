# ⚡ QUICK DEPLOY - 3 Minutes

## 🎯 Problem
Your Diagnostic Panel shows:
```
✗ Cannot reach server
Failed to fetch
```

## ✅ Solution
Deploy the Supabase Edge Function!

---

## 🚀 FASTEST METHOD (Copy-Paste in Terminal)

```bash
# 1. Install CLI (if not already installed)
npm install -g supabase

# 2. Login
supabase login

# 3. Link project
supabase link --project-ref naopwnzwjeotklkalkls

# 4. Deploy
supabase functions deploy make-server-6111280c
```

---

## 🔑 Then Add These Secrets

**Go to:** https://supabase.com/dashboard/project/naopwnzwjeotklkalkls/settings/functions

**Add 3 secrets:**

1. **SUPABASE_URL**
   ```
   https://naopwnzwjeotklkalkls.supabase.co
   ```

2. **SUPABASE_ANON_KEY**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hb3B3bnp3amVvdGtsa2Fsa2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5ODMzNjAsImV4cCI6MjA4MjU1OTM2MH0.rHP95AvDCdvlWcXZKzUkBKAmEiaotPGusI7SdvMJ1LA
   ```

3. **SUPABASE_SERVICE_ROLE_KEY**
   - Get from: https://supabase.com/dashboard/project/naopwnzwjeotklkalkls/settings/api
   - Copy the **service_role** key (long token starting with `eyJ...`)

---

## ✅ Test It Worked

**Open this URL:**
```
https://naopwnzwjeotklkalkls.supabase.co/functions/v1/make-server-6111280c/health
```

**Should see:**
```json
{"status":"ok"}
```

**Then refresh your Diagnostic Panel → Should show green checkmarks!** ✓

---

## 📋 Full Guides

- **Detailed Steps:** See `DEPLOY_SERVER_NOW.md`
- **Visual Guide:** See `DEPLOY_VISUAL_GUIDE.md`
- **Troubleshooting:** See `TROUBLESHOOTING.md`

---

## 🆘 Quick Help

| Issue | Fix |
|-------|-----|
| "Function exists" | It's already deployed! Update instead |
| "Missing vars" | Add the 3 secrets in dashboard |
| "Permission denied" | Check you're in correct account |
| Still failing | Check logs in Supabase Dashboard |

---

**That's it! Should take 3 minutes total.** ⚡
