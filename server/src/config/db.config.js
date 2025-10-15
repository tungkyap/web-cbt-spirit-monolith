// server/src/config/db.config.js

const { Sequelize } = require('sequelize');

// Konfigurasi koneksi MariaDB
const sequelize = new Sequelize('web_cbt_spirit', 'root', '', {
  host: 'localhost', // Atau alamat IP server DB Anda
  dialect: 'mariadb',
  // Nonaktifkan logging SQL agar konsol tidak terlalu ramai saat pengembangan
  logging: false, 
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;