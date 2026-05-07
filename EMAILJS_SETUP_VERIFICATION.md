# EmailJS Setup Verification Guide

## ✅ Email Address Updated

Your portfolio now uses: **iragaleson@gmail.com**

All email references have been updated in:
- ✅ About section (social links)
- ✅ Contact section (contact methods)
- ✅ Contact form (mailto fallback)
- ✅ Footer section (social links)

## 🔧 EmailJS Configuration

Your current EmailJS credentials:
```javascript
serviceId: 'service_xlx9vc9'
templateId: 'template_rftrovp'
publicKey: 'ppyPHgFmLUTmk8A0v'
```

## ⚠️ IMPORTANT: Verify EmailJS Template

To ensure you receive emails at **iragaleson@gmail.com**, follow these steps:

### Step 1: Login to EmailJS
1. Go to https://dashboard.emailjs.com/
2. Login with your account

### Step 2: Check Email Service
1. Click on **"Email Services"** in the left menu
2. Verify your email service is connected
3. Make sure it's using **iragaleson@gmail.com**

### Step 3: Update Email Template
1. Click on **"Email Templates"** in the left menu
2. Find template: **template_rftrovp**
3. Click **"Edit"** on that template
4. In the template settings, verify:
   - **To Email**: Should be `iragaleson@gmail.com` or `{{to_email}}`
   - **From Name**: `{{from_name}}`
   - **From Email**: `{{from_email}}`
   - **Subject**: Something like "New Contact from Portfolio"

### Step 4: Template Content Should Look Like:
```
Hello Aleson,

You have a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

### Step 5: Save Template Settings
Make sure the **"To Email"** field is set to: **iragaleson@gmail.com**

### Step 6: Test the Form
1. Go to your portfolio website
2. Fill out the contact form
3. Submit it
4. Check your **iragaleson@gmail.com** inbox (and spam folder!)

## 🔄 Alternative: Update Template Parameters

If you want to set the recipient email in the code instead of the template, update Contact.jsx:

```javascript
const templateParams = {
  from_name: formData.name,
  from_email: formData.email,
  message: formData.message,
  to_name: 'Aleson Irag',
  to_email: 'iragaleson@gmail.com'  // Add this line
}
```

Then in your EmailJS template, use `{{to_email}}` as the recipient.

## 📧 Gmail Settings (Important!)

### Allow EmailJS to Send Emails:
1. Go to your Gmail settings
2. Check **"Filters and Blocked Addresses"**
3. Make sure EmailJS is not blocked
4. Check your **Spam folder** for test emails

### Add EmailJS to Safe Senders:
1. When you receive your first test email
2. Mark it as **"Not Spam"**
3. Add the sender to your contacts

## 🧪 Testing Checklist

- [ ] EmailJS dashboard shows correct email (iragaleson@gmail.com)
- [ ] Email template is configured correctly
- [ ] Test email sent from portfolio
- [ ] Email received in inbox (check spam too!)
- [ ] Reply-to address works correctly
- [ ] All form fields appear in the email

## 🚨 Troubleshooting

### Not Receiving Emails?

1. **Check EmailJS Dashboard**
   - Go to "Logs" section
   - See if emails are being sent successfully

2. **Check Spam Folder**
   - EmailJS emails often go to spam initially
   - Mark as "Not Spam" to train Gmail

3. **Verify Template**
   - Make sure "To Email" is set correctly
   - Test the template in EmailJS dashboard

4. **Check Service Status**
   - Verify your EmailJS service is active
   - Check if you've exceeded free tier limits (200 emails/month)

5. **Test with Different Email**
   - Try sending to another email address
   - This helps identify if it's a Gmail-specific issue

## 📊 EmailJS Free Tier Limits

- ✅ 200 emails per month
- ✅ 2 email services
- ✅ 2 email templates
- ✅ Basic support

If you need more, consider upgrading or using a different service.

## 🔐 Security Note

Your EmailJS public key is visible in the code. This is normal and safe because:
- It's a public key (not a secret)
- EmailJS has rate limiting
- You can restrict domains in EmailJS dashboard

### Recommended: Restrict Domains
1. Go to EmailJS dashboard
2. Click on your service
3. Add your domain to "Allowed Domains"
4. This prevents others from using your key

## ✅ Current Status

- ✅ Email updated to: **iragaleson@gmail.com**
- ✅ Contact form configured
- ✅ Mailto fallback working
- ⚠️ **Action Required**: Verify EmailJS template settings

## 📝 Next Steps

1. Login to EmailJS dashboard
2. Verify template sends to **iragaleson@gmail.com**
3. Test the contact form
4. Check your inbox (and spam!)
5. Mark test email as "Not Spam"

Once verified, your contact form will work perfectly! 🎉
