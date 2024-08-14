const Campaign = require('../models/campaign');

exports.createCampaign = async (req, res) => {
    try {
        const campaign = new Campaign(req.body);
        await campaign.save();
        res.status(201).json({ status: true, responseCode: 200, message: 'Campaign created successfully', result: campaign });
    } catch (error) {
        res.status(500).send({ status: false, responseCode: 500, message: 'Internal server error' });
    }
}

exports.getAllCampaign = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ active: true });
        res.status(200).json({ status: true, responseCode: 200, message: 'Campaigns fetched successfully', result: campaigns });
    } catch (error) {
        res.status(500).send({ status: false, responseCode: 500, message: 'Internal server error' });

    }
}

exports.getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (campaign && campaign.active) {
            res.status(200).json({ status: true, responseCode: 200, message: 'Campaign fetched successfully', result: campaign });
        } else {
            res.status(404).json({ status: false, responseCode: 404, message: 'Campaign not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, responseCode: 500, message: 'Internal server error' });
    }
}

exports.updateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (campaign && campaign.active) {
            res.status(200).json({ status: true, responseCode: 200, message: 'Campaign updated successfully', result: campaign });
        } else {
            res.status(404).json({ status: false, responseCode: 404, message: 'Campaign not found' });
        }
    } catch (error) {
        res.status(500).send({ status: false, responseCode: 500, message: 'Internal server error' });
    }
}

exports.deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (campaign && campaign.active) {
            campaign.active = false;
            await campaign.save();
            res.status(200).json({ status: true, responseCode: 200, message: 'Campaign deleted successfully', result: campaign });
        } else {
            res.status(404).json({ status: false, responseCode: 404, message: 'Campaign not found' });
        }
    } catch (error) {
        res.status(500).send({ status: false, responseCode: 500, message: 'Internal server error' });
    }
}
exports.getValidCampaigns = async (req, res) => {
    try {
        const currentDate = new Date();
        const campaigns = await Campaign.find({
            active: true,
            endDate: { $gte: currentDate }
        });
        res.status(200).json({ status: true, responseCode: 200, message: 'Campaign fetched successfully', result: campaigns });
    } catch (error) {
        res.status(500).send({ status: false, responseCode: 500, message: 'Internal server error' });
    }
}