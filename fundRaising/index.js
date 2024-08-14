const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { connectToDatabase } = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');

// ...

// Middleware
app.use(cors());
app.use(express.json({limit: '50mb'}));
// Load environment variables
dotenv.config();

// Connect to the database
 connectToDatabase();
// Middleware to parse JSON bodies

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({limit: '50mb', extended: true}));

// Define routes
const authRoutes = require('./routes/auth');
const campaignRoutes = require('./routes/campaignRoutes');
const userRoutes = require('./routes/userRoutes');
const userCampaignRoutes = require('./routes/userCampaignRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/campaign', campaignRoutes);
app.use('/api/user', userRoutes);
app.use('/api/userCampaign', userCampaignRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
