const express = require('express');
const authRoute = require('../../controllers/Auth/auth.route');
const roomRoute = require('../../controllers/Room/room.route');
const messageRoute = require('../../controllers/Message/message.route');
const userRoute = require('../../controllers/User/user.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/rooms', roomRoute);
router.use('/messages', messageRoute);
router.use('/users', userRoute);

module.exports = router;
