# 🔧 Troubleshooting Guide - Vaibhav Sanitary Website

## Registration Not Working? Follow These Steps:

### Step 1: Use the Diagnostic Panel

1. Look at the **bottom-left corner** of your website
2. You'll see a "🔧 Diagnostic Panel" box
3. Click the **refresh button** (circle icon)
4. Wait for it to test the system

### Step 2: Read the Diagnostic Results

The panel will show:
- ✓ Configuration status
- ✓ Server health status
- ✓ Registration endpoint status

---

## Common Issues & Solutions

### ❌ Issue 1: "Cannot reach server"

**Possible Cause:** The Supabase Edge Function isn't deployed or running.

**Solutions:**

1. **Check if the server is deployed:**
   - Go to your Supabase Dashboard
   - Navigate to "Edge Functions"
   - Look for `make-server-6111280c`
   - Make sure it's deployed and running

2. **If not deployed, deploy it:**
   ```bash
   # The server code is in /supabase/functions/server/
   # Deploy using Supabase CLI or dashboard
   ```

3. **Verify environment variables in Supabase:**
   - Go to Supabase Dashboard → Edge Functions → Settings
   - Check these variables exist:
     - `SUPABASE_URL`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `SUPABASE_ANON_KEY`

---

### ❌ Issue 2: "Registration failed" or "400/500 Error"

**Check the browser console:**
1. Press `F12` (Windows) or `Cmd+Option+I` (Mac)
2. Click "Console" tab
3. Look for red error messages
4. The errors will tell you exactly what's wrong

**Common causes:**

1. **Duplicate email:** User already exists with that email
   - Solution: Use a different email address

2. **Password too short:** Password must be at least 6 characters
   - Solution: Use a longer password

3. **Invalid phone number:** Must be exactly 10 digits
   - Solution: Enter a valid 10-digit phone number

4. **Missing fields:** All fields are required
   - Solution: Fill in all form fields

---

### ❌ Issue 3: Form Opens But Shows "Undefined" or Blank Captcha

**This was fixed!** The issue was in `/src/app/components/UserRegister.tsx`:
- Changed line 74 from `useState(() => {})` to `useEffect(() => {}, [])`
- Captcha should now display properly

**If still not working:**
- Hard refresh the page: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache

---

### ❌ Issue 4: "Auto-login failed after registration"

**Cause:** Registration succeeds but login fails

**Solution:**
1. Close the registration modal
2. Manually click "User Login"
3. Enter the email and password you just registered with
4. Click Login

---

### ❌ Issue 5: CORS Errors

**Symptoms:** Browser console shows "CORS policy" errors

**Solution:**
- The server already has CORS enabled
- This usually means the server isn't running
- Follow Step 1 solutions above

---

## Test Registration Step-by-Step

### 1. Open the Registration Form
- Click "Register" button in header
- Form should open with all fields

### 2. Fill All Fields (Example):
```
Full Name: Test User
Father's Name: Test Father
Date of Birth: 2000-01-01
Village: Test Village
City: Chittorgarh
Contact Number: 9876543210 (exactly 10 digits!)
Email Address: test@example.com
Password: Test123456 (at least 6 chars)
Confirm Password: Test123456 (must match)
```

### 3. Complete Captcha
- You'll see a code like "Abc123"
- Type it exactly as shown (case-sensitive!)
- If you make a mistake, click the refresh button

### 4. Click Register
- Button will say "Registering..." while processing
- You should see:
  - Success alert: "Registration successful!"
  - Auto-login happens
  - Modal closes
  - You're now logged in

---

## Debug Checklist

✅ **Before reporting an issue, check:**

1. [ ] Diagnostic Panel shows green checkmarks
2. [ ] All form fields are filled correctly
3. [ ] Phone number is exactly 10 digits
4. [ ] Email format is valid (example@domain.com)
5. [ ] Passwords match and are at least 6 characters
6. [ ] Captcha is entered correctly (case-sensitive!)
7. [ ] Browser console shows no red errors
8. [ ] Internet connection is working
9. [ ] Used a unique email (not already registered)
10. [ ] Hard refreshed the page (Ctrl+Shift+R)

---

## Check Server Logs

If registration still fails:

1. Go to **Supabase Dashboard**
2. Navigate to **Edge Functions** → `make-server-6111280c`
3. Click **"Logs"**
4. Look for error messages when you try to register
5. The logs will show the exact error

---

## Manual Database Check

To verify if a user was actually created:

1. Go to **Supabase Dashboard**
2. Navigate to **Authentication** → **Users**
3. Look for the email you tried to register
4. If it exists:
   - User was created successfully
   - Issue is with auto-login
   - Try manual login instead

---

## Testing with Diagnostic Panel Results

### ✓ Good Result Example:
```
Configuration:
  Project ID: ✓
  Public Key: ✓

Server Health:
  ✓ Server is running
  {"status":"ok"}

Registration:
  ✓ Registration works
  {"success":true,"user":{...}}
```

**Meaning:** Everything works! Registration should succeed.

---

### ✗ Bad Result Example:
```
Configuration:
  Project ID: ✓
  Public Key: ✓

Server Health:
  ✗ Cannot reach server
  Failed to fetch

Registration:
  ✗ Registration error
  Failed to fetch
```

**Meaning:** Server is not deployed or not running.

**Fix:**
1. Go to Supabase Dashboard
2. Deploy the Edge Function
3. Check environment variables

---

## Still Having Issues?

### Collect This Information:

1. **Diagnostic Panel output** (copy all text)
2. **Browser console errors** (screenshot red errors)
3. **Exact steps you took** (what buttons you clicked)
4. **What error message you saw** (exact text)
5. **Supabase Edge Function logs** (from dashboard)

### Quick Test Without Backend:

If you want to test the UI only, you can temporarily modify `/src/app/contexts/AuthContext.tsx`:

```typescript
// TEMPORARY TEST VERSION - Comment out the real register function
const register = async (userData: any) => {
  // Just do a console.log instead of calling the server
  console.log('Would register:', userData);
  alert('TEST MODE: Registration UI works! Data logged to console.');
  
  // Don't actually try to login
  // This tests if the form and validation work
};
```

---

## Error Code Reference

| Error | Meaning | Solution |
|-------|---------|----------|
| `Failed to fetch` | Server unreachable | Deploy Edge Function |
| `400 Bad Request` | Invalid data sent | Check all fields |
| `401 Unauthorized` | Auth token issue | Check API keys |
| `409 Conflict` | Email already exists | Use different email |
| `500 Internal Server Error` | Server crashed | Check server logs |
| `CORS error` | Cross-origin blocked | Server not configured |

---

## Prevention Tips

1. **Always test with Diagnostic Panel first**
2. **Check browser console before submitting**
3. **Use strong passwords (6+ characters)**
4. **Double-check email format**
5. **Ensure phone number is 10 digits**
6. **Don't use special characters in names**
7. **Refresh page if form looks broken**

---

## Success Indicators

You'll know registration worked when:

1. ✅ Alert says "Registration successful!" or "पंजीकरण सफल!"
2. ✅ Modal closes automatically
3. ✅ User Info badge (bottom-right) shows your name
4. ✅ Header shows "Logout" button instead of "Login"
5. ✅ You can click "Chat with Owner" button
6. ✅ Console shows "Registration successful, logging in..."

---

## Emergency Fallback

If nothing works, you can:

1. **Create account directly in Supabase:**
   - Go to Supabase Dashboard → Authentication → Users
   - Click "Add User"
   - Fill in email and password
   - Add user_metadata with your details

2. **Then login normally:**
   - Use the Login button on website
   - Enter your email and password
   - Should work immediately

---

**Remember:** The Diagnostic Panel is your best friend! Always check it first.

**Most common issue:** Server not deployed. Check Supabase Edge Functions!
