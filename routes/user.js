const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const { createUserValidator } = require('../validators/user');

router.post('/create', createUserValidator, userController.createUser);
router.get('/all', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;