# Firebase Realtime Database Rules Setup

## Quick Fix (For Testing Only)

Go to Firebase Console → Realtime Database → Rules and replace with:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

⚠️ **WARNING**: This allows anyone to read/write your database. Only use for testing!

## Secure Rules (Recommended)

For production, use these rules that allow writes only to the portfolio section:

```json
{
  "rules": {
    "portfolio": {
      ".read": true,
      ".write": true
    }
  }
}
```

## Steps to Fix:

1. Go to https://console.firebase.google.com/
2. Select your project: `portfolio-aleson`
3. Click "Realtime Database" in the left menu
4. Click the "Rules" tab
5. Replace the rules with one of the options above
6. Click "Publish"

## Current Error:
Your current rules probably look like:
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

This requires authentication, which your portfolio doesn't have yet.