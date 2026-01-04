# EmailJS Gmail API Fix

## Error: "Invalid grant. Please reconnect your Gmail account"

This happens when EmailJS loses connection to your Gmail account.

## Quick Fix Steps:

1. **Go to EmailJS Dashboard**: https://dashboard.emailjs.com/
2. **Login** with your account
3. **Click "Email Services"** in the left menu
4. **Find your Gmail service** (service_c7amqha)
5. **Click "Reconnect"** or "Connect Service"
6. **Re-authorize Gmail** when prompted
7. **Test the connection**

## Alternative Solution:

If reconnection fails, create a new Gmail service:

1. **Delete old service** in EmailJS dashboard
2. **Add new Gmail service**
3. **Update service ID** in Contact.jsx:
   ```javascript
   const serviceId = 'YOUR_NEW_SERVICE_ID'
   ```

## Current Contact Info:
- **Email**: alesoncirag@gmail.com
- **Facebook**: Aleson420

## Backup Contact Method:
The contact form now shows direct contact info when EmailJS fails, so users can still reach you.