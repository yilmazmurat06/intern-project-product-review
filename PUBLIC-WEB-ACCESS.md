# 🌐 Public Web Access Guide

## Problem
When accessing the web app from a public URL (tunnel), it can't connect to `localhost:8080` backend.

## Solution Options

### Option 1: Access Locally (Simplest)
If you and testers are on the **same WiFi network**:

1. Start backend (already running)
2. Start web app:
   ```bash
   cd mobile
   npm run web
   ```
3. Share your local URL: `http://10.2.131.45:8081`
4. Others on same WiFi can access it!

**API will use:** `http://10.2.131.45:8080/api`

---

### Option 2: Public Tunnel for Both (For Remote Access)

#### Step 1: Make Backend Public
```bash
# In a new terminal
npx localtunnel --port 8080
```

This will give you a URL like: `https://xyz.loca.lt`

#### Step 2: Update API Configuration
Edit `mobile/src/services/api.js` and update the web section:

```javascript
if (Platform.OS === 'web') {
  backendHost = 'xyz.loca.lt'; // Replace with your tunnel URL (without https://)
}
```

#### Step 3: Make Web App Public
```bash
cd mobile
npx expo start --web --tunnel
```

This gives you a public URL like: `https://abc.exp.direct`

Now anyone can access your app from anywhere!

---

### Option 3: Deploy to Production

For permanent public access, deploy:

**Backend:**
- Azure App Service
- Heroku
- AWS Elastic Beanstalk

**Frontend:**
- Vercel
- Netlify  
- GitHub Pages

Then update `api.js` production URL.

---

## Quick Fix for Current Session

Since you already have the web app running with tunnel, just do this:

1. **Start backend tunnel in a new terminal:**
   ```bash
   npx localtunnel --port 8080
   ```

2. **Copy the tunnel URL** (e.g., `https://funny-turtles-dance.loca.lt`)

3. **Update the API config** in `mobile/src/services/api.js`:
   ```javascript
   if (Platform.OS === 'web') {
     // TEMPORARY: Replace with your backend tunnel URL
     backendHost = 'funny-turtles-dance.loca.lt';
   }
   ```

4. **Reload the web app** - it should now work!

---

## Current Configuration

- **Backend**: `http://localhost:8080` (not publicly accessible)
- **Web App**: Public tunnel URL
- **Problem**: Web app (public) can't reach backend (local)

**You need both to be either:**
- Both local (same network)
- Both public (tunnels)
- Or deployed to production

---

## Testing Right Now

**Easiest way:**
1. Open a new terminal
2. Run: `npx localtunnel --port 8080`
3. Copy the URL it gives you
4. Update `api.js` (web section) with that URL
5. Refresh your web browser

Let me know the tunnel URL and I can update the code for you!
