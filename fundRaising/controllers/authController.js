const User=require('../models/User')
const bcrypt = require('bcryptjs');
const { userRegistrationEmail } = require('../services/mailService');
// Register User
exports.registerUser = async (req, res) => {
  const { role, name, email, password, dob, age, mobileNumber, gender, authorityName,guardianEmail,guardianNumber, authorityPhone,authorityDOB } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: false, responseCode: 400, message: 'Email and password are required' });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ status: false, responseCode: 400, message: 'User already exists' });
    }
    user = new User({
      role,
      name,
      email,
      password,
      guardianNumber,
      guardianEmail,
      dob,
      age,
      gender,
      mobileNumber,
      authorityName,
      authorityPhone,
      authorityDOB
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    userRegistrationEmail(email,name)
    res.status(201).json({ status: true, responseCode: 201, message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, responseCode: 500, message: 'Internal server error' });
  }
};
// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({status:false,responseCode:400,message: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({status:false,responseCode:400,message: 'Invalid Credentials' });
    }
    res.status(201).json({ status:true,responseCode:200,message: 'Login successful',result:user });
  } catch (err) {
    res.status(500).send({status:false,responseCode:500,message:'Internal server error'});
  }
};
