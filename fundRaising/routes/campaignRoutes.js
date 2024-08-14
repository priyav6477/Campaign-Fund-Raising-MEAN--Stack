const express = require('express');
const { validateCampaign, validate, validateId } = require('../utils/validate');
const { createCampaign, getCampaignById, getAllCampaign, updateCampaign, deleteCampaign, getValidCampaigns } = require('../controllers/campaignController');
const router = express.Router();

router.post('/create', validateCampaign, validate,createCampaign);
router.get('/get/:id',validateId,validate,getCampaignById);
router.get('/getAll',getAllCampaign);
router.put('/update/:id',validateId,validate,updateCampaign);
router.delete('/delete/:id',validateId,validate,deleteCampaign);
router.get('/get-valid-events',getValidCampaigns);



module.exports = router;