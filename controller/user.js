const user = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, mobileNumber, role } = req.body;     

        const hpass = await bcrypt.hash(password, 10);

        const newUser = await user.create({
            name,
            email,
            password: hpass,
            mobileNumber,
            role,
        });

        return res.status(201).json({
            message: "User created",
            data: newUser,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({   
            message: "Server error",
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await user.find().select('-password');
        res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await user.findById(id).select('-password');
        
        if (!userData) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User fetched successfully",
            data: userData,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, mobileNumber, role, password } = req.body;

        const updateData = { name, email, mobileNumber, role };
        
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await user.findByIdAndUpdate(id, updateData, { new: true }).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await user.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Server error",
        });
    }
};