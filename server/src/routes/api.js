// server/src/routes/api.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

// --- AUTH ROUTES ---
router.post('/login', authController.loginAdmin);
router.post('/logout', authController.logoutAdmin);

// Rute untuk mendaftarkan Admin awal
router.post('/register-admin', userController.registerSuperAdmin);

module.exports = router;