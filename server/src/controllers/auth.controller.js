// server/src/controllers/auth.controller.js
const User = require('../models/user.model'); 
// const bcrypt = require('bcrypt'); // (Anda akan membutuhkan ini untuk hash password)

exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // MENCARI data user di tabel 'user' berdasarkan username
        const user = await User.findOne({ 
            where: { username: username } 
        });

        if (!user) {
            return res.status(401).json({ message: 'User tidak ditemukan.' });
        }

        // --- Logika Verifikasi Password ---
        // const isMatch = await bcrypt.compare(password, user.password_hash);
        // if (!isMatch) {
        //     return res.status(401).json({ message: 'Password salah.' });
        // }

        // Jika berhasil, kirimkan respons (misalnya, token JWT)
        res.status(200).json({ 
            message: 'Login berhasil!', 
            role: user.role 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};