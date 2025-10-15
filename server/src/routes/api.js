// server/src/routes/api.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Rute untuk mendaftarkan Admin awal
router.post('/register-admin', userController.registerSuperAdmin);

module.exports = router;