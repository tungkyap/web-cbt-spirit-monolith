// server/src/models/user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Pastikan path ini benar

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('super_admin', 'admin_soal', 'editor'),
        allowNull: true
    },
    full_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    flag_active: {
        type: DataTypes.BOOLEAN, // Sequelize akan mengubah ke TINYINT(1)
        allowNull: false,
        defaultValue: true
    },
    // Sequelize secara default menangani createdAt dan updatedAt
}, {
    tableName: 'user', // Nama tabel di MariaDB Anda
    timestamps: true,  // Mengaktifkan createdAt (created_at) dan updatedAt (updated_at)
    underscored: true // Menggunakan snake_case untuk nama kolom (created_at, updated_at)
});

module.exports = User;