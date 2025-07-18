const express = require('express');
const middleware = require('../middlewares/middleware');
const { getUserProfile,Update,getAllStudents } = require('../controllers/user');
const router = express.Router();

router.get('/me',middleware,getUserProfile );
router.put('/update',middleware,Update );
router.get('/all',middleware,getAllStudents );
module.exports = router;