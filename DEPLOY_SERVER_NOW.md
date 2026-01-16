# 🚀 DEPLOY SUPABASE EDGE FUNCTION - Step by Step

## ✅ Your Supabase Details:
- **Project Ref:** `naopwnzwjeotklkalkls`
- **URL:** `https://naopwnzwjeotklkalkls.supabase.co`
- **Status:** ❌ Server NOT deployed (that's why registration fails)

---

## 🎯 Method 1: Deploy via Supabase Dashboard (EASIEST - 2 Minutes)

### Step 1: Go to Supabase Dashboard
Open: https://supabase.com/dashboard/project/naopwnzwjeotklkalkls

### Step 2: Navigate to Edge Functions
1. Click on **"Edge Functions"** in the left sidebar
2. Click **"Create a new function"** or **"Deploy"**

### Step 3: Create the Function
**Option A: If you see "Deploy new function":**
1. Click **"Deploy new function"**
2. Name it: `make-server-6111280c`
3. Copy and paste the code from `/supabase/functions/server/index.tsx`
4. Click **"Deploy function"**

**Option B: If you need to use CLI:**
Follow Method 2 below

---

## 🎯 Method 2: Deploy via Supabase CLI (More Reliable)

### Step 1: Install Supabase CLI

**On Mac/Linux:**
```bash
brew install supabase/tap/supabase
```

**On Windows:**
```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

**Alternative (npm):**
```bash
npm install -g supabase
```

### Step 2: Login to Supabase
```bash
supabase login
```
- This will open a browser
- Authorize the CLI

### Step 3: Link Your Project
```bash
cd /path/to/your/project
supabase link --project-ref naopwnzwjeotklkalkls
```

### Step 4: Deploy the Function
```bash
supabase functions deploy make-server-6111280c
```

### Step 5: Set Environment Variables
```bash
supabase secrets set SUPABASE_URL=https://naopwnzwjeotklkalkls.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
supabase secrets set SUPABASE_ANON_KEY=your-anon-key-here
```

**To get your service role key:**
1. Go to: https://supabase.com/dashboard/project/naopwnzwjeotklkalkls/settings/api
2. Copy the **service_role** key (not the anon key!)

---

## 🎯 Method 3: Manual Dashboard Deployment (Copy-Paste)

### Step 1: Go to Edge Functions
https://supabase.com/dashboard/project/naopwnzwjeotklkalkls/functions

### Step 2: Create New Function
1. Click **"Create a new function"**
2. Name: `make-server-6111280c`

### Step 3: Copy Server Code

**Main File (index.ts):**
```typescript
import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-6111280c/health", (c) => {
  return c.json({ status: "ok" });
});

// Register User
app.post("/make-server-6111280c/register", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, fatherName, dob, village, city, contactNo } = body;

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name,
        fatherName,
        dob,
        village,
        city,
        contactNo,
        role: 'user',
      },
    });

    if (authError) {
      console.log('Registration error:', authError);
      return c.json({ error: authError.message }, 400);
    }

    // Store additional user data in KV store
    await kv.set(`user:${authData.user.id}`, {
      id: authData.user.id,
      email,
      name,
      fatherName,
      dob,
      village,
      city,
      contactNo,
      role: 'user',
      createdAt: new Date().toISOString(),
    });

    return c.json({ success: true, user: authData.user });
  } catch (error: any) {
    console.log('Registration error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get all users (for owner dashboard)
app.get("/make-server-6111280c/users", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user || user.user_metadata?.role !== 'owner') {
      return c.json({ error: 'Unauthorized - Owner access required' }, 401);
    }

    const users = await kv.getByPrefix('user:');
    return c.json({ users });
  } catch (error: any) {
    console.log('Get users error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Send message
app.post("/make-server-6111280c/send-message", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { message, recipientId } = body;

    const messageData = {
      id: crypto.randomUUID(),
      senderId: user.id,
      senderName: user.user_metadata?.name || user.email,
      recipientId,
      message,
      timestamp: new Date().toISOString(),
    };

    await kv.set(`message:${messageData.id}`, messageData);
    
    const conversationKey = [user.id, recipientId].sort().join(':');
    const existingMessages = await kv.get(`conversation:${conversationKey}`) || [];
    existingMessages.push(messageData);
    await kv.set(`conversation:${conversationKey}`, existingMessages);

    return c.json({ success: true, message: messageData });
  } catch (error: any) {
    console.log('Send message error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get conversation
app.get("/make-server-6111280c/conversation/:userId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const otherUserId = c.req.param('userId');
    const conversationKey = [user.id, otherUserId].sort().join(':');
    
    const messages = await kv.get(`conversation:${conversationKey}`) || [];

    return c.json({ messages });
  } catch (error: any) {
    console.log('Get conversation error:', error);
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);
```

**KV Store File (kv_store.tsx):**
```typescript
const kv = await Deno.openKv();

export async function get(key: string) {
  const result = await kv.get([key]);
  return result.value;
}

export async function set(key: string, value: any) {
  await kv.set([key], value);
}

export async function getByPrefix(prefix: string) {
  const entries = kv.list({ prefix: [prefix] });
  const results = [];
  
  for await (const entry of entries) {
    results.push(entry.value);
  }
  
  return results;
}
```

### Step 4: Set Environment Variables in Dashboard
1. Go to: https://supabase.com/dashboard/project/naopwnzwjeotklkalkls/settings/functions
2. Add these secrets:
   - `SUPABASE_URL` = `https://naopwnzwjeotklkalkls.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = (get from API settings)
   - `SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hb3B3bnp3amVvdGtsa2Fsa2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5ODMzNjAsImV4cCI6MjA4MjU1OTM2MH0.rHP95AvDCdvlWcXZKzUkBKAmEiaotPGusI7SdvMJ1LA`

### Step 5: Deploy
Click **"Deploy"** button

---

## 🔑 Get Your Service Role Key

1. Go to: https://supabase.com/dashboard/project/naopwnzwjeotklkalkls/settings/api
2. Scroll to **"Project API keys"**
3. Copy the **"service_role"** key (NOT the anon key!)
4. It should start with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## ✅ Verify Deployment

### Test 1: Health Check
Open in browser:
```
https://naopwnzwjeotklkalkls.supabase.co/functions/v1/make-server-6111280c/health
```

**Expected Response:**
```json
{"status":"ok"}
```

### Test 2: Use Diagnostic Panel
1. Go to your website
2. Look at bottom-left corner
3. Click refresh button
4. Should now show **green checkmarks** ✓

---

## 🚨 Common Deployment Errors

### Error: "Function name already exists"
**Solution:** The function is already deployed! Just update it instead of creating new.

### Error: "Missing environment variables"
**Solution:** Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in function settings

### Error: "Permission denied"
**Solution:** Make sure you're logged into the correct Supabase account

### Error: "Invalid service role key"
**Solution:** Copy the key again from API settings, make sure it's the service_role key

---

## 📞 Where to Get Help

### Supabase Dashboard Links:
- **Project Home:** https://supabase.com/dashboard/project/naopwnzwjeotklkalkls
- **Edge Functions:** https://supabase.com/dashboard/project/naopwnzwjeotklkalkls/functions
- **API Settings:** https://supabase.com/dashboard/project/naopwnzwjeotklkalkls/settings/api
- **Logs:** https://supabase.com/dashboard/project/naopwnzwjeotklkalkls/logs/edge-functions

### Supabase Docs:
- **Edge Functions Guide:** https://supabase.com/docs/guides/functions
- **CLI Reference:** https://supabase.com/docs/reference/cli/introduction

---

## 🎉 After Successful Deployment

Once deployed, you should see:

1. ✅ In Diagnostic Panel: All green checkmarks
2. ✅ Health endpoint returns: `{"status":"ok"}`
3. ✅ Registration works perfectly
4. ✅ No "Failed to fetch" errors

**Then you can:**
- ✅ Register users
- ✅ Login successfully
- ✅ Use chat system
- ✅ Access owner dashboard

---

## 💡 Pro Tip

**Fastest way to deploy:**
1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Go to project folder: `cd /path/to/project`
4. Link project: `supabase link --project-ref naopwnzwjeotklkalkls`
5. Deploy: `supabase functions deploy make-server-6111280c`
6. Set secrets in dashboard
7. Done! ✅

---

## 🔧 Troubleshooting After Deployment

If deployment succeeds but still doesn't work:

1. **Check Environment Variables:**
   - Go to Function Settings
   - Verify SUPABASE_URL is set
   - Verify SUPABASE_SERVICE_ROLE_KEY is set

2. **Check Function Logs:**
   - Go to Edge Functions → Logs
   - Look for errors when you try to register

3. **Test Health Endpoint:**
   - Visit the health URL
   - Should return `{"status":"ok"}`

4. **Re-run Diagnostic Panel:**
   - Should show all green now

---

**Ready to deploy? Choose your method and follow the steps above!** 🚀
