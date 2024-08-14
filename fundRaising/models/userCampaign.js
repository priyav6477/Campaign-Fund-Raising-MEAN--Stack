const mongoose = require('mongoose');

const userCampaignSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'campaign', required: true },
    registeredAt: { type: Date, default: Date.now },
    donationAmount: { type: Number, default: 0 },
    fee: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 }
});
userCampaignSchema.index({ userId: 1, campaignId: 1 }, { unique: true });
const UserCampaign = mongoose.model('UserCampaign', userCampaignSchema);

module.exports = UserCampaign;