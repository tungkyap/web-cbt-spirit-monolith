// server/src/controllers/auth.controller.js

const User = require('../models/user.model'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    // 1. Validasi Input Dasar
    if (!username || !password) {
        return res.status(400).json({ message: 'Username dan password wajib diisi.' });
    }

    try {
        // 2. Mencari User berdasarkan Username
        const user = await User.findOne({ 
            where: { username: username } 
        });

        if (!user) {
            return res.status(401).json({ message: 'Kombinasi username/password salah.' });
        }
        
        // 3. Verifikasi Status Akun
        if (!user.flag_active) {
            return res.status(403).json({ message: 'Akun Anda dinonaktifkan.' });
        }

        // 4. Verifikasi Password
        // Membandingkan password yang dimasukkan dengan hash di DB
        const isMatch = await bcrypt.compare(password, user.password_hash);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Kombinasi username/password salah.' });
        }

        // 5. Membuat JSON Web Token (JWT)
        const payload = {
            id: user.id,
            role: user.role
        };
        
        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, // Mengambil secret dari .env
            { expiresIn: '1h' }     // Token kedaluwarsa dalam 1 jam
        );

        // 6. Kirim Token dan Detail User ke Frontend
        res.status(200).json({ 
            message: 'Login berhasil!',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                full_name: user.full_name
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat login.' });
    }
};

exports.logoutAdmin = async (req, res) => {
  res.status(200).json({
    message: 'Logout berhasil.'
  });
}