const express = require('express');
const { validateCampaignId, validate, validateUserCampaign, validateDonation, validateUserId } = require('../utils/validate');
const { getUsersByCampaign, getCampaignsByUsers, campaignRegister, donate, getTotalDonations, getUserTotalDonations } = require('../controllers/userCampaignController');
const router = express.Router();

router.get('/getUsersOfCampaign/:campaignId',validateCampaignId,validate,getUsersByCampaign);
router.get('/getCampaignsOfUser/:userId',validateUserId,validate,getCampaignsByUsers);
router.get('/totalDonations',getTotalDonations);
router.get('/userDonations/:userId',validateUserId,validate,getUserTotalDonations);

router.post('/register',validateUserCampaign,validate,campaignRegister);
router.post('/donate',validateDonation,donate);

module.exports = router;