# Vaibhav Sanitary Website - Authentication Setup

## 🎉 Features Implemented

- ✅ User Registration with Captcha
- ✅ Separate User & Owner Login
- ✅ Owner Dashboard (view all registered users)
- ✅ Real-time Chat between Users and Owner
- ✅ Bilingual Support (English/Hindi)
- ✅ Secure Authentication with Supabase

## 📋 Initial Setup Instructions

### 1. Connect Supabase

The Supabase project is already connected! Your configuration is stored in `/utils/supabase/info.tsx`.

### 2. Create Owner Account

**IMPORTANT:** You need to create the owner account first before users can chat with the owner.

#### To create the owner account:

1. Click "**Register**" button in the header
2. Fill in the owner's details:
   - Name: Your Name
   - Father's Name: (as required)
   - DOB: Select date
   - Village: Your village
   - City: Chittorgarh
   - Contact: Your phone number
   - Email: **owner@vaibhavsanitary.com** (or your preferred email)
   - Password: Create a strong password
   - Complete the captcha

3. After registration, **update the user role to 'owner'** in Supabase:
   - Go to Supabase Dashboard → Authentication → Users
   - Find the user you just created
   - Click on the user
   - In "User Metadata" section, add/update:
     ```json
     {
       "role": "owner",
       "name": "Owner Name",
       ...other fields
     }
     ```
   - Save changes

4. **Update the OWNER_ID in App.tsx:**
   - Open `/src/app/App.tsx`
   - Find line 20: `const OWNER_ID = 'owner-fixed-id';`
   - Replace `'owner-fixed-id'` with the actual user ID from Supabase
   - The user ID can be found in Supabase Dashboard → Authentication → Users

   Example:
   ```tsx
   const OWNER_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
   ```

### 3. User Flow

Once the owner account is set up:

#### For Customers (Users):
1. Click "**Register**" to create an account
2. Fill in all required details with captcha
3. After registration, login with email/password
4. Once logged in, click "**Chat with Owner**" to start a conversation

#### For Owner:
1. Click "**Owner Login**"
2. Login with owner credentials
3. Click "**Dashboard**" to see all registered users
4. Click "**Chat**" button next to any user to start conversation
5. View user details in the dashboard table

## 🎨 Features Details

### User Registration Form Fields:
- Full Name
- Father's Name
- Date of Birth
- Village
- City
- Contact Number (10-digit validation)
- Email Address
- Password
- Confirm Password
- **Captcha with Refresh Button**

### Owner Dashboard:
- View all registered users in a table
- See user details: Name, Father's Name, Village, City, Contact, Email
- Direct chat button for each user
- Registration date

### Chat System:
- Real-time messaging
- Message history
- Auto-polling every 3 seconds
- Timestamp for each message
- Bilingual interface

## 🔧 Technical Details

### Backend Endpoints (Supabase Functions):
- `/make-server-6111280c/register` - User registration
- `/make-server-6111280c/users` - Get all users (owner only)
- `/make-server-6111280c/send-message` - Send a message
- `/make-server-6111280c/conversation/:userId` - Get conversation history

### Data Storage:
- User authentication: Supabase Auth
- User metadata: KV Store
- Messages: KV Store with conversation threading

## 🌐 Bilingual Support

All components support both English and Hindi:
- Registration forms
- Login modals
- Dashboard
- Chat interface
- Button labels

Toggle language using the "हिंदी/English" button in the header.

## 🎨 Custom Color Scheme

The authentication system uses your custom colors:
- Primary: #0F2854
- Secondary: #1C4D8D
- Accent: #4988C4
- Light: #BDE8F5

## 🔐 Security Features

- Password validation (minimum 6 characters)
- Email validation
- Phone number validation (10 digits)
- Captcha system to prevent bots
- Secure session management
- Role-based access control

## 📱 Responsive Design

All authentication components are fully responsive:
- Mobile-friendly forms
- Tablet-optimized layouts
- Desktop experience

## 🚀 Testing

### Test User Registration:
1. Open the website
2. Click "Register"
3. Fill in test data
4. Complete captcha
5. Submit form

### Test Owner Dashboard:
1. Login as owner
2. Click "Dashboard"
3. Verify user list appears
4. Test chat functionality

### Test User Chat:
1. Login as user
2. Click "Chat with Owner"
3. Send a test message
4. Verify owner receives message

## 📞 Support

For any issues or questions about the authentication system, refer to:
- Supabase Dashboard for user management
- Browser console for error messages
- Network tab for API request debugging

---

**Built with ❤️ for Vaibhav Sanitary, Chittorgarh**
