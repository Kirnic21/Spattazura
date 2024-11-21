const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/', userController.userList);

router.get('/create', userController.userCreateGet);


router.post('/create', userController.userCreatePost);


router.get('/search', userController.userSearchGet);

router.get('/:id/update', userController.userUpdateGet);


router.post('/:id/update', userController.userUpdatePost);

router.post('/:id/delete', userController.userDelete);


module.exports = router;
