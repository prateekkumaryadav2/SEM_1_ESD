# Google OAuth Setup Guide

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "Select a project" dropdown at the top
3. Click "New Project"
4. Enter project name: "Academic Portal"
5. Click "Create"

## Step 2: Enable Google+ API

1. In the left sidebar, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the consent screen first:
   - Click "Configure Consent Screen"
   - Choose "External" (for testing)
   - Fill in:
     - App name: "Academic Portal"
     - User support email: your email
     - Developer contact: your email
   - Click "Save and Continue"
   - Skip Scopes, click "Save and Continue"
   - Add test users if needed
   - Click "Save and Continue"

4. Back to Create OAuth client ID:
   - Application type: "Web application"
   - Name: "Academic Portal Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:3000`
     - `http://localhost:8080`
   - Authorized redirect URIs:
     - `http://localhost:3000`
   - Click "Create"

5. Copy your **Client ID** (looks like: `xxxxx-xxxxx.apps.googleusercontent.com`)

## Step 4: Update Your Code

### Frontend (Login.js)

Open `/frontend/src/pages/Login.js` and replace:

```javascript
client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
```

With your actual Client ID:

```javascript
client_id: '123456789-abc123.apps.googleusercontent.com',
```

## Step 5: Restart Backend

The backend needs to be restarted to load the new OAuth dependencies:

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

## Step 6: Test Google Login

1. Go to `http://localhost:3000`
2. You should see a "Continue with Google" button below the login form
3. Click it to sign in with your Google account
4. The first time you sign in, a new user will be created in the database

## Database Changes

The User table now has these additional columns:
- `email` - User's email address
- `google_id` - Google user ID
- `auth_provider` - Either "local" or "google"
- `password` - Can be NULL for Google users

## Troubleshooting

### Error: "Invalid Google token"
- Check that your Client ID is correct
- Make sure the domain is authorized in Google Console

### Error: "redirect_uri_mismatch"
- Add `http://localhost:3000` to Authorized redirect URIs in Google Console

### Google button not showing
- Check browser console for errors
- Verify the Google script is loading
- Make sure Client ID is set correctly

## Security Notes

For production:
1. Use environment variables for Client ID
2. Enable HTTPS
3. Configure proper redirect URIs for your production domain
4. Set up proper CORS policies
5. Add rate limiting to prevent abuse
