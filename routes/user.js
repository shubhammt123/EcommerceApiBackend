const express = require('express');
const router = express.Router();
const userController = require('../controller/user');


router.post('/', userController.createUser);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.post('/login', userController.loginUser);

module.exports = router;
