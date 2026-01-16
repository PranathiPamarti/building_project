#!/bin/bash

# 🚀 SUPABASE EDGE FUNCTION DEPLOYMENT SCRIPT
# For Vaibhav Sanitary Website
# Project: naopwnzwjeotklkalkls

echo "========================================="
echo "🚀 Deploying Supabase Edge Function"
echo "========================================="
echo ""

# Step 1: Install Supabase CLI (if not already installed)
echo "📦 Step 1: Installing Supabase CLI..."
echo "Running: npm install -g supabase"
npm install -g supabase

# Step 2: Login to Supabase
echo ""
echo "🔐 Step 2: Login to Supabase"
echo "This will open a browser window for authentication"
supabase login

# Step 3: Link to your project
echo ""
echo "🔗 Step 3: Linking to your Supabase project"
echo "Project Reference: naopwnzwjeotklkalkls"
supabase link --project-ref naopwnzwjeotklkalkls

# Step 4: Deploy the function
echo ""
echo "🚀 Step 4: Deploying Edge Function"
echo "Function name: make-server-6111280c"
supabase functions deploy make-server-6111280c

echo ""
echo "========================================="
echo "✅ Deployment Complete!"
echo "========================================="
echo ""
echo "⚠️  IMPORTANT: Don't forget to set environment variables!"
echo ""
echo "Go to Supabase Dashboard → Edge Functions → Settings"
echo "Add these secrets:"
echo ""
echo "1. SUPABASE_URL=https://naopwnzwjeotklkalkls.supabase.co"
echo "2. SUPABASE_SERVICE_ROLE_KEY=(get from API settings)"
echo "3. SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hb3B3bnp3amVvdGtsa2Fsa2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5ODMzNjAsImV4cCI6MjA4MjU1OTM2MH0.rHP95AvDCdvlWcXZKzUkBKAmEiaotPGusI7SdvMJ1LA"
echo ""
echo "Get your service_role key from:"
echo "https://supabase.com/dashboard/project/naopwnzwjeotklkalkls/settings/api"
echo ""
echo "Then test the deployment:"
echo "https://naopwnzwjeotklkalkls.supabase.co/functions/v1/make-server-6111280c/health"
echo ""
echo "Should return: {\"status\":\"ok\"}"
echo ""
