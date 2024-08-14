
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime:{ type: String, required: true },
    location: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    image: { type: String, required: true },
    active: { type: Boolean, default: true }
});

const Campaign = mongoose.model('campaign', campaignSchema);

module.exports = Campaign;