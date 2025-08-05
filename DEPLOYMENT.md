# Deployment Guide

This guide will help you deploy the BrandMate application with the frontend on Netlify and the backend on Render.com with MongoDB database.

## Prerequisites: MongoDB Database Setup

Before deploying the backend, you need to set up a MongoDB database. We recommend using MongoDB Atlas (free tier available).

### MongoDB Atlas Setup (Recommended)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new project

2. **Create a Database Cluster**
   - Click "Build a Database"
   - Choose "M0 Sandbox" (Free tier)
   - Select your preferred cloud provider and region
   - Name your cluster (e.g., "brandmate-cluster")
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for Render.com deployment)
   - Or add specific IP: `0.0.0.0/0`
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/brandmate?retryWrites=true&w=majority`)
   - Replace `<password>` with your actual password
   - Replace `brandmate` with your preferred database name

## Backend Deployment (Render.com)

### Step 1: Prepare Your Repository

1. Push your code to GitHub, GitLab, or Bitbucket
2. Make sure the `brandmatebackend` folder is in your repository

### Step 2: Deploy on Render.com

1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" and select "Web Service"
3. Connect your repository
4. Configure the service:
   - **Name**: `brandmate-backend`
   - **Root Directory**: `brandmatebackend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 3: Set Environment Variables

In the Render dashboard, add these environment variables:

- `NODE_ENV`: `production`
- `PORT`: (leave empty, Render will set this automatically)
- `MONGODB_URI`: Your MongoDB Atlas connection string from the setup above

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your backend URL: `https://brandmatebackend.onrender.com` ✅ **COMPLETED**

## Frontend Deployment (Netlify)

### Step 1: Update API Configuration

1. Open `brandmate-frontend/config/api.ts`
2. Replace `https://your-app-name.onrender.com` with your actual Render.com URL:

```typescript
const API_CONFIG = {
  development: "http://localhost:3000",
  production: "https://your-actual-render-url.onrender.com", // Update this!
};
```

### Step 2: Build the Project Locally (Optional Test)

```bash
cd brandmate-frontend
npm run build
```

### Step 3: Deploy on Netlify

#### Option A: Drag and Drop (Quick)

1. Run `npm run build` in the frontend directory
2. Go to [netlify.com](https://netlify.com) and login
3. Drag the `dist` folder to the deploy area
4. Your site will be deployed instantly

#### Option B: Git Integration (Recommended)

1. Push your updated code to your repository
2. Go to [netlify.com](https://netlify.com) and login
3. Click "New site from Git"
4. Connect your repository
5. Configure build settings:
   - **Base directory**: `brandmate-frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `brandmate-frontend/dist`
6. Click "Deploy site"

### Step 4: Configure Custom Domain (Optional)

1. In Netlify dashboard, go to "Domain settings"
2. Add your custom domain or use the provided netlify.app subdomain

## Testing the Deployment

### Backend Testing

1. Visit your Render.com URL
2. Test the health endpoint: `https://your-backend-url.onrender.com/api/health`
3. Should return: `{"status":"healthy","timestamp":"..."}`

### Frontend Testing

1. Visit your Netlify URL
2. Try submitting a name through the form
3. Check that it saves successfully

### Full Integration Test

1. Open your Netlify frontend
2. Submit a name through the form
3. Verify it's saved by checking the backend logs or testing the GET endpoint

## Troubleshooting

### Common Backend Issues

- **Build fails**: Check that all dependencies are in `package.json`
- **App crashes**: Check Render logs for error messages
- **CORS errors**: Ensure CORS is properly configured in `server.js`
- **MongoDB connection fails**: Verify `MONGODB_URI` environment variable is set correctly
- **Database authentication errors**: Check MongoDB Atlas user credentials and network access

### Common Frontend Issues

- **API calls fail**: Verify the backend URL in `config/api.ts`
- **Build fails**: Check that all dependencies are installed
- **Blank page**: Check browser console for JavaScript errors

### Environment-Specific Issues

- **Local works, production doesn't**: Check environment variables and API URLs
- **CORS errors in production**: Ensure backend CORS allows your frontend domain

## Environment Variables Summary

### Backend (Render.com)

- `NODE_ENV`: `production`
- `PORT`: (auto-set by Render)
- `MONGODB_URI`: Your MongoDB Atlas connection string

### Frontend (Netlify)

- No environment variables needed (configuration is in `config/api.ts`)

## URLs to Update

After deployment, update these URLs in your documentation:

1. Backend API URL in `brandmate-frontend/config/api.ts`
2. Any hardcoded URLs in documentation
3. CORS origins in backend if needed for production domain

## Monitoring

### Backend Monitoring

- Check Render.com dashboard for service health
- Monitor logs for errors
- Set up uptime monitoring if needed

### Frontend Monitoring

- Check Netlify dashboard for build status
- Monitor site analytics
- Test form functionality regularly
