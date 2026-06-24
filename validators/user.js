const { body } = require('express-validator');

const createUserValidator = [
    body('email').isEmail().withMessage('Please provide a valid email')  
    .notEmpty().withMessage('Email is required'),

    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .notEmpty().withMessage('Password is required'),

    body('name').notEmpty().withMessage('Name is required'),

    body('mobileNumber').isMobilePhone().withMessage('Please provide a valid mobile number')
    .notEmpty().withMessage('Mobile number is required'),

    body('role').isIn(['admin', 'user']).withMessage('Role must be either admin or user')
    .notEmpty().withMessage('Role is required'),
];

module.exports = {
    createUserValidator,
}