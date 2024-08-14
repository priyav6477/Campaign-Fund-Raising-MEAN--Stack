// testEmail.js

const { sendEmail } = require('./services/mailService');

// Replace with the email address you want to send the test email to
const recipientEmail = 'user@gmail.com';
const subject = 'Test Email Subject';
const message = 'This is a test email message.';

sendEmail(recipientEmail, subject, message);
