const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    dob: { type: Date }, 
    age: { type: Number }, 
    guardianEmail:{type: String},
    guardianNumber:{type: String},
    
    mobileNumber: { type: String }, 
    authorityName: { type: String },
    authorityPhone: { type: String }, 
    authorityDOB: { type: Date },
    active:{type:Boolean,default:true},
    gender: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
