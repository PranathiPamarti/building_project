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
      email_confirm: true, // Auto-confirm email since we haven't configured email server
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

    // Verify user is owner
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user || user.user_metadata?.role !== 'owner') {
      return c.json({ error: 'Unauthorized - Owner access required' }, 401);
    }

    // Get all users from KV store
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

    // Store message in KV store
    await kv.set(`message:${messageData.id}`, messageData);
    
    // Also store in conversation thread
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