# EmailJS Setup Guide

Follow these steps to enable email receiving through your contact form:

## Step 1: Create EmailJS Account (2 minutes)

1. Go to https://www.emailjs.com/
2. Click **"Sign Up"** (Free - 200 emails/month)
3. Sign up with your email or Google account

## Step 2: Add Email Service (Connect Gmail)

1. After logging in, go to **"Email Services"** in the left menu
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**
5. Sign in with your Gmail: **iragaleson@gmail.com**
6. Allow EmailJS to send emails on your behalf
7. Copy your **Service ID** (looks like: `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **"Email Templates"** in the left menu
2. Click **"Create New Template"**
3. Set up the template:

**Template Name:** Portfolio Contact

**Subject:**
```
New message from {{from_name}}
```

**Content (Body):**
```
You have received a new message from your portfolio!

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. Click **"Save"**
5. Copy your **Template ID** (looks like: `template_xxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"** in the left menu
2. Find your **Public Key** (a long string of characters)
3. Copy it

## Step 5: Update Your Code

Open `src/components/Contact.jsx` and find these lines (around line 24-26):

```javascript
const serviceId = 'YOUR_SERVICE_ID'
const templateId = 'YOUR_TEMPLATE_ID'
const publicKey = 'YOUR_PUBLIC_KEY'
```

Replace with your actual values:

```javascript
const serviceId = 'service_abc123'      // Your Service ID
const templateId = 'template_xyz789'    // Your Template ID
const publicKey = 'your_public_key_here' // Your Public Key
```

## Step 6: Test It!

1. Go to your portfolio
2. Fill out the contact form
3. Click "Send Message"
4. Check your Gmail inbox - you should receive the email!

## Example Configuration

If your values are:
- Service ID: `service_portfolio`
- Template ID: `template_contact`
- Public Key: `abc123xyz789`

Your code should look like:
```javascript
const serviceId = 'service_portfolio'
const templateId = 'template_contact'
const publicKey = 'abc123xyz789'
```

## Features

✅ Free: 200 emails/month
✅ Direct to Gmail
✅ Spam protection
✅ Email tracking
✅ Works on all devices

## Troubleshooting

**Email not received?**
- Check spam folder
- Verify Service ID, Template ID, and Public Key are correct
- Make sure Gmail service is connected in EmailJS dashboard

**Error message?**
- Check browser console for error details
- Verify all three IDs are correctly entered
- Make sure you're using the Public Key, not Private Key

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- Support: https://www.emailjs.com/support/

---

**Once configured, visitors can send you messages directly to iragaleson@gmail.com!** 📧
