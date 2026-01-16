# 🚀 Quick Start Guide - Vaibhav Sanitary Authentication

## ✅ Everything Is Ready!

Your website now has a complete authentication and chat system. Here's how to use it:

## 📝 **IMPORTANT FIRST STEPS**

### Step 1: Create Owner Account

1. **Open your website**
2. Click the **"Register"** button (top right)
3. Fill in your details:
   - Name: Your business owner name
   - Father's Name: As required
   - DOB: Your date of birth
   - Village: Your village name
   - City: Chittorgarh
   - Contact: Your 10-digit phone number
   - Email: **owner@vaibhavsanitary.com** (or any email)
   - Password: Create a strong password
   - **Complete the captcha** (it will show a random code - enter it and click refresh if needed)

4. Click "Register"

### Step 2: Set User Role to Owner

1. Go to your **Supabase Dashboard**: https://supabase.com/dashboard
2. Click on your project
3. Go to **Authentication** → **Users**
4. Find the user you just created
5. Click on the user
6. Scroll to **"User Metadata"** section
7. Click **"Edit"** or add this JSON:
   ```json
   {
     "role": "owner"
   }
   ```
8. **Save** the changes

### Step 3: Update Owner ID in Code

After creating the owner account, you'll see a floating info badge at the bottom-right corner showing:
- 👑 Logged in as Owner
- Your Owner ID

**Copy that ID and:**
1. Open `/src/app/App.tsx`
2. Find line 20: `const OWNER_ID = 'owner-fixed-id';`
3. Replace `'owner-fixed-id'` with your actual owner ID

Example:
```tsx
const OWNER_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
```

## 🎉 You're All Set!

### For Customers (Users):

1. **Register**: Click "Register" → Fill details → Complete captcha → Submit
2. **Login**: Click "User Login" → Enter email/password
3. **Chat**: After login → Click "Chat with Owner"

### For Owner (You):

1. **Login**: Click "Owner Login" → Enter your credentials
2. **Dashboard**: Click "Dashboard" to see all registered users
3. **Chat**: Click "Chat" button next to any user to start conversation

## 🔍 What You'll See:

- **Auth Buttons**: Top right corner (User Login, Register, Owner Login)
- **User Info Badge**: Bottom right corner (shows when logged in)
- **Owner ID**: Displayed in the badge for easy copy

## 💬 Chat Features:

- Real-time messaging
- Auto-updates every 3 seconds
- Message history
- Timestamp for each message
- Works in both English and Hindi

## 🌐 Language Toggle:

Click the "हिंदी/English" button to switch languages

## 🎨 Visual Features:

- Custom color scheme (#0F2854, #1C4D8D, #4988C4, #BDE8F5)
- Gradient backgrounds
- Smooth animations
- Responsive design
- Bilingual support

## ⚠️ Troubleshooting:

1. **Can't see chat messages?**
   - Make sure OWNER_ID is updated in App.tsx
   - Check if you're logged in

2. **Registration fails?**
   - Verify captcha is correct
   - Check password is at least 6 characters
   - Ensure phone number is 10 digits

3. **Owner Dashboard is empty?**
   - Make sure users have registered
   - Check your role is set to "owner" in Supabase

## 📖 Full Documentation:

See `/AUTH_SETUP.md` for complete details

---

**Your website is now production-ready with full authentication! 🎊**
