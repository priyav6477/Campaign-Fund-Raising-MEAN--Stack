const { default: mongoose } = require('mongoose');
const UserCampaign = require('../models/userCampaign');
const Campaign = require('../models/campaign');
const User = require('../models/User');
const { campaignRegistrationEmail } = require('../services/mailService');


exports.campaignRegister = async (req, res) => {
    try {
        const { userId, campaignId } = req.body;
        const user = await User.findById(userId);
        const campaign = await Campaign.findById(campaignId);

        // Check if user is already registered for the campaign
        const existingRegistration = await UserCampaign.findOne({ userId, campaignId });
        if (existingRegistration) {
            return res.status(400).json({ status: false, responseCode: 400, message: 'User is already registered for this campaign' });
        }

        // Create a new registration
        const newUserCampaign = new UserCampaign({ userId, campaignId });
        await newUserCampaign.save();
        campaignRegistrationEmail(user.email,user.name,campaign);
        res.status(200).json({ status: true, responseCode: 200, message: 'Registered successfully', result: newUserCampaign });
    } catch (error) {
        res.status(500).json({ status: false, responseCode: 500, message: 'Interal server error' });
    }
}

exports.getCampaignsByUsers = async (req, res) => {
    try {
        const userCampaigns = await UserCampaign.find({ userId: req.params.userId }).populate('campaignId');
        res.status(200).json({ status: true, responseCode: 200, message: 'Campaigns retrieved successfully', result: userCampaigns });
    } catch (error) {
        res.status(500).json({ status: false, responseCode: 500, message: 'Interal server error' });
    }
}

exports.getUsersByCampaign = async (req, res) => {
    try {
        const userCampaigns = await UserCampaign.find({ campaignId: req.params.campaignId }).populate('userId');
        res.status(200).json({ status: true, responseCode: 200, message: 'Users retrieved successfully', result: userCampaigns });

    } catch (error) {
        res.status(500).json({ status: false, responseCode: 500, message: 'Interal server error' });
    }
}

exports.donate = async (req, res) => {
    try {
        const { userId, campaignId, donationAmount } = req.body;
        const fee = donationAmount * 0.03;
        const totalAmount = donationAmount - fee;

        const userCampaign = await UserCampaign.findOne({ userId, campaignId });
        if (userCampaign) {
            userCampaign.donationAmount += donationAmount;
            userCampaign.fee += fee;
            userCampaign.totalAmount += totalAmount;
            await userCampaign.save();
            res.status(200).json({ status: true, responseCode: 200, message: 'Donation successful', result: userCampaign });
        } else {
            const newUserCampaign = new UserCampaign({
                userId,
                campaignId,
                donationAmount,
                fee,
                totalAmount
            });
            await newUserCampaign.save();
            res.status(200).json({ status: true, responseCode: 200, message: 'Donation successful', result: newUserCampaign });
        }
    } catch (error) {
        res.status(500).json({ status: false, responseCode: 500, message: 'Interal server error' });
    }
}

exports.getTotalDonations = async (req, res) => {
    try {
        const totalDonations = await UserCampaign.aggregate([
            {
                $group: {
                    _id: null,
                    totalDonationAmount: { $sum: "$donationAmount" },
                    totalFee: { $sum: "$fee" },
                    totalAmount: { $sum: "$totalAmount" }
                }
            }
        ]);
        res.status(200).json({ status: true, responseCode: 200, message: 'Total donation fetched successfully', result: totalDonations[0] || { totalDonationAmount: 0, totalFee: 0, totalAmount: 0 } });
    } catch (error) {
        res.status(500).json({ status: false, responseCode: 500, message: 'Interal server error' });
    }
};

exports.getUserTotalDonations = async (req, res) => {
    try {
        const userId = req.params.userId;

        const userTotalDonations = await UserCampaign.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: "$userId",
                    totalDonationAmount: { $sum: "$donationAmount" },
                    totalFee: { $sum: "$fee" },
                    totalAmount: { $sum: "$totalAmount" }
                }
            }
        ]);

        res.status(200).json({ status: true, responseCode: 200, message: 'User donation fetched successfully', result: userTotalDonations[0] || { totalDonationAmount: 0, totalFee: 0, totalAmount: 0 } });
    } catch (error) {
        res.status(500).json({ status: false, responseCode: 500, message: 'Interal server error' });
    }
};



