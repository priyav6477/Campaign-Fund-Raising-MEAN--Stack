const { check, validationResult, body, param } = require('express-validator');

const registerValidation = [
  check('role', 'Role is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  // check('confirmPassword', 'Passwords do not match').custom((value, { req }) => value === req.body.password),
  check('name').optional({ checkFalsy: true }).if(check('role').equals('Individual')).not().isEmpty().withMessage('Name is required'),
  check('dob').optional({ checkFalsy: true }).if(check('role').equals('Individual')).not().isEmpty().withMessage('DOB is required'),
  check('age').optional({ checkFalsy: true }).if(check('role').equals('Individual')).not().isEmpty().withMessage('Age is required'),
  check('gender').optional({ checkFalsy: true }).if(check('role').equals('Individual')).not().isEmpty().withMessage('Gender is required'),
  check('mobileNumber').optional({ checkFalsy: true }).if(check('role').equals('Individual')).not().isEmpty().withMessage('Mobile number is required for users'),
  check('authorityName').optional({ checkFalsy: true }).if(check('role').equals('Organization')).not().isEmpty().withMessage('Authority name is required'),
  check('authorityPhone').optional({ checkFalsy: true }).if(check('role').equals('Organization')).not().isEmpty().withMessage('Authority phone number is required'),
  check('authorityDOB').optional({ checkFalsy: true }).if(check('role').equals('Organization')).not().isEmpty().withMessage('Authority DOB is required')
];

const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];
const validateCampaign = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('startDate').isISO8601().toDate().withMessage('Start date must be a valid date'),
  body('endDate').isISO8601().toDate().withMessage('End date must be a valid date'),
  body('startTime').notEmpty().withMessage('Start time is required'),
  body('endTime').notEmpty().withMessage('End time is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('createdBy').notEmpty().withMessage('Created by is required'),
  body('image').notEmpty().withMessage('Image is required'),
]

const validateId = [
  param('id').isMongoId().withMessage('Invalid ID'),
]

const validateUserCampaign = [
  body('userId').isMongoId().withMessage('Invalid user ID'),
  body('campaignId').isMongoId().withMessage('Invalid campaign ID'),
]

const validateDonation = [
  body('userId').isMongoId().withMessage('Invalid user ID'),
  body('campaignId').isMongoId().withMessage('Invalid campaign ID'),
  body('donationAmount').isFloat({ gt: 0 }).withMessage('Donation amount must be greater than 0'),
]

const validateUserId = [
  param('userId').isMongoId().withMessage('Invalid user ID'),
]

const validateCampaignId = [
  param('campaignId').isMongoId().withMessage('Invalid campaign ID'),

]

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, responseCode: 400, message: errors.array()[0].msg });
  }
  next();
};

module.exports = { registerValidation, loginValidation, validateUserCampaign, validateDonation, validateUserId, validateCampaignId, validateId, validate, validateCampaign };
