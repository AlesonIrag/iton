# Firebase Setup Guide

Follow these steps to enable real-time content updates for your portfolio.

## Step 1: Create Firebase Project (5 minutes)

1. Go to https://console.firebase.google.com/
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `portfolio-aleson` (or any name you like)
4. Click **Continue**
5. Disable Google Analytics (optional, not needed for this project)
6. Click **Create project**
7. Wait for it to finish, then click **Continue**

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** `</>`
2. Enter app nickname: `Portfolio Website`
3. **Check** the box for "Also set up Firebase Hosting" (optional)
4. Click **Register app**
5. You'll see your Firebase configuration - **COPY THIS!**

It looks like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

6. Click **Continue to console**

## Step 3: Enable Firestore Database

1. In the left sidebar, click **"Build"** → **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in test mode"** (we'll secure it later)
4. Click **Next**
5. Choose your location (closest to you): `us-central` or your region
6. Click **Enable**

## Step 4: Enable Storage (for profile pictures)

1. In the left sidebar, click **"Build"** → **"Storage"**
2. Click **"Get started"**
3. Select **"Start in test mode"**
4. Click **Next**
5. Keep the default location
6. Click **Done**

## Step 5: Update Your Code

1. Open `src/firebase.js`
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
  projectId: "YOUR_ACTUAL_PROJECT_ID",
  storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
  messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
}
```

## Step 6: Set Up Security Rules (Important!)

### Firestore Rules:
1. Go to **Firestore Database** → **Rules** tab
2. Replace the rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

### Storage Rules:
1. Go to **Storage** → **Rules** tab
2. Replace the rules with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profile/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

## Step 7: Test It!

1. Save all your files
2. Restart your dev server: `npm run dev`
3. Open your portfolio
4. Enter admin mode (triple-click your name)
5. Change your profile picture or footer quote
6. Open your portfolio in a different browser or incognito mode
7. You should see the changes! 🎉

## What This Does

✅ Profile pictures are stored in Firebase Storage
✅ Footer quotes are stored in Firestore Database
✅ Changes you make in admin mode are visible to all visitors
✅ Data persists across devices and browsers
✅ Free tier: 1GB storage, 50K reads/day, 20K writes/day

## Troubleshooting

**"Permission denied" error?**
- Make sure you've set up the security rules correctly
- Check that you're in admin mode when making changes

**Changes not showing?**
- Check browser console for errors
- Verify your Firebase config is correct
- Make sure Firestore and Storage are enabled

**Need help?**
- Firebase Documentation: https://firebase.google.com/docs
- Firebase Console: https://console.firebase.google.com/

---

**Once configured, your portfolio will have real-time content management!** 🚀
