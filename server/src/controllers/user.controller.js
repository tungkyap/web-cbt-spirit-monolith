const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.registerSuperAdmin = async (req, res) => {
    try {
        const { username, email, password, full_name } = req.body;
        
        // 1. Hash Password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // 2. Buat User baru (CRUD: Create)
        const newUser = await User.create({
            username,
            email,
            password_hash,
            full_name,
            role: 'super_admin', // Tetapkan peran admin awal
            flag_active: true
        });

        res.status(201).json({ 
            message: 'Super Admin berhasil didaftarkan.', 
            user_id: newUser.id 
        });
    } catch (error) {
        console.error('Error saat pendaftaran:', error);
        res.status(500).json({ message: 'Gagal mendaftarkan user.', error: error.message });
    }
};