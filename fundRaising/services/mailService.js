const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Helper function to load and compile HTML templates
const loadTemplate = (templateName, data) => {
  const filePath = path.join(__dirname, '../templates', `${templateName}.html`);
  const templateSource = fs.readFileSync(filePath, 'utf8');
  const template = handlebars.compile(templateSource);
  return template(data);
};

const sendEmail = (to, subject, templateName, data) => {
  const html = loadTemplate(templateName, data);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error sending email: ${error.message}`);
      console.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

const userRegistrationEmail = (userEmail, firstName) => {
  const data = {
    firstName,
    companyName: 'Fund Raising',
    supportEmail: 'support@fundRaising.com'
  };

  sendEmail(
    userEmail,
    'Registration Successful',
    'registration',
    data
  );
};

const campaignRegistrationEmail = (userEmail, firstName, campaignDetails) => {
  const data = {
    firstName,
    // ...campaignDetails,
    title:campaignDetails.title,
    startDate:campaignDetails.startDate,
    endDate:campaignDetails.endDate,
    location:campaignDetails.location
  };
  sendEmail(
    userEmail,
    `You're In! Registration for ${campaignDetails.title} successful`,
    'campaign-register',
    data
  );
};

module.exports = { sendEmail, userRegistrationEmail, campaignRegistrationEmail };
