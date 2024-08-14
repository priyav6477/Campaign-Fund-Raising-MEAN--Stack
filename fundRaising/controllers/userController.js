
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ active: true, role: { $ne: 'Admin' } });
        res.status(200).json({
            status: true,
            responseCode: 200,
            message: 'Users retrieved successfully',
            result: users
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            responseCode: 500,
            message: 'Internal server error'
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user && user.active) {
            res.status(200).json({ status: true, responseCode: 200, message: 'User retrieved successfully', result: user });
        } else {
            res.status(404).json({ status: false, responseCode: 404, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ status: false, responseCode: 500, message: 'Interal server error' });
    }
}

exports.getUsersByRole = async (req, res) => {
    try {
        const users = await User.find({ role: req.params.role, active: true });
        res.status(200).json({ status: true, responseCode: 200, message: 'Users retrieved successfully', result: users });
    } catch (error) {
        res.status(500).json({ status: false, responseCode: 500, message: 'Interal server error' });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedUser && updatedUser.active) {
            res.status(200).json({ status: true, responseCode: 200, message: 'User details updated', result: updatedUser });
        } else {
            res.status(404).json({ status: false, responseCode: 404, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ status: false, responseCode: 500, message: 'Interal server error' });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user && user.active) {
            user.active = false;
            await user.save();
            res.status(200).json({ status: true, responseCode: 200, message: 'User deleted successfully' });
        } else {
            res.status(404).json({ status: false, responseCode: 404, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ status: false, responseCode: 500, message: 'Interal server error' });
    }
}