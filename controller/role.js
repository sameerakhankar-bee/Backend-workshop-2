const Role = require("../models/role");

exports.createRole = async (req, res) => {
    try {
        const { name, description } = req.body;

        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({
                message: "Role with this name already exists"
            });
        }

        const newRole = await Role.create({ name, description });

        res.status(201).json({
            message: "Role created successfully",
            role: newRole
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json({
            message: "Roles fetched successfully",
            roles
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching roles",
            error: error.message
        });
    }
};

exports.getRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findById(id);

        if (!role) {
            return res.status(404).json({
                message: "Role not found"
            });
        }

        res.status(200).json({
            message: "Role fetched successfully",
            role
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching role",
            error: error.message
        });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const existingRole = await Role.findOne({ name, _id: { $ne: id } });
        if (existingRole) {
            return res.status(400).json({
                message: "Role with this name already exists"
            });
        }

        const updatedRole = await Role.findByIdAndUpdate(id, { name, description }, { new: true });

        if (!updatedRole) {
            return res.status(404).json({
                message: "Role not found"
            });
        }

        res.status(200).json({
            message: "Role updated successfully",
            role: updatedRole
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating role",
            error: error.message
        });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRole = await Role.findByIdAndDelete(id);

        if (!deletedRole) {
            return res.status(404).json({
                message: "Role not found"
            });
        }

        res.status(200).json({
            message: "Role deleted successfully",
            role: deletedRole
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting role",
            error: error.message
        });
    }
};