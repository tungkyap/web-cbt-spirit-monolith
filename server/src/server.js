// Muat variabel lingkungan dari .env SEBELUM kode lainnya
const path = require('path');
const express = require('express');
const app = express();
require('dotenv').config({ path: path.join(__dirname, '..', '.env') }); 

// Definisikan lokasi file statis (hasil build Angular)
const clientPath = path.join(__dirname, '..', '..' ,'client', 'dist', 'client', 'browser'); 

// Beri tahu Express untuk menyajikan file statis dari lokasi tersebut
app.use(express.static(clientPath));

// ... (Definisi API routes, e.g., app.use('/api', apiRoutes)) ...
// --- Middleware Global ---
// Diperlukan untuk parsing body JSON dari permintaan POST
app.use(express.json()); 

// --- Impor Router API ---
const apiRouter = require('./routes/api'); 

// --- DAFTARKAN ROUTER API DI SINI ---
// Semua request yang dimulai dengan '/api' akan diteruskan ke apiRouter
app.use('/api', apiRouter); 

// Tangani rute yang tidak dikenal (harus selalu paling akhir)
//    Ini penting untuk Single Page Application (SPA) Angular
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

const sequelize = require('./config/db.config'); // Import koneksi

// Fungsi untuk menguji koneksi database
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Koneksi MariaDB berhasil.');

    // AKTIFKAN SINKRONISASI UNTUK UJI COBA:
    // PENTING: Import semua Model Anda di sini atau di tempat lain sebelum sync
    require('./models/user.model'); 
    
    // Sinkronisasi model (hanya jalankan saat dibutuhkan, misal pada awal pengembangan)
    await sequelize.sync({ alter: true }); 
    console.log("✅ Semua model sudah disinkronkan.");

    // Setelah koneksi berhasil, baru jalankan server Express
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server berjalan di port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Gagal koneksi MariaDB:', error);
    process.exit(1); // Keluar dari aplikasi jika koneksi gagal
  }
}

connectDB(); // Panggil fungsi koneksi