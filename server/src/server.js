const path = require('path');
const express = require('express');
const app = express();

// 1. Definisikan lokasi file statis (hasil build Angular)
const clientPath = path.join(__dirname, '..', 'client', 'dist', 'client'); 

// 2. Beri tahu Express untuk menyajikan file statis dari lokasi tersebut
app.use(express.static(clientPath));

// ... (Definisi API routes, e.g., app.use('/api', apiRoutes)) ...

// 3. Tangani rute yang tidak dikenal (harus selalu paling akhir)
//    Ini penting untuk Single Page Application (SPA) Angular
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// Mulai server...
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});