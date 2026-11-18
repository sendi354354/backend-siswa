-- ========================================================
-- Script SQL Database: db_siswa
-- Tabel: siswa
-- Dialect: MySQL (Laragon)
-- ========================================================

CREATE DATABASE IF NOT EXISTS db_siswa
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE db_siswa;

CREATE TABLE IF NOT EXISTS siswa (
    kode_siswa VARCHAR(50) PRIMARY KEY,
    nama_siswa VARCHAR(100) NOT NULL,
    alamat_siswa TEXT NOT NULL,
    tgl_lahir_siswa DATE NOT NULL,
    jurusan_siswa VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tgl_lahir_siswa, jurusan_siswa)
VALUES
    ('SISWA-001', 'Ahmad Dahlan', 'Jl. Malioboro No. 12, Yogyakarta', '2006-05-14', 'Rekayasa Perangkat Lunak'),
    ('SISWA-002', 'Dewi Sartika', 'Jl. Merdeka No. 45, Bandung', '2006-08-21', 'Teknik Komputer dan Jaringan'),
    ('SISWA-003', 'Budi Santoso', 'Jl. Diponegoro No. 88, Surabaya', '2005-11-03', 'Multimedia'),
    ('SISWA-004', 'Siti Rahmawati', 'Jl. Sudirman No. 101, Jakarta Pusat', '2006-02-18', 'Sistem Informasi Jaringan'),
    ('SISWA-005', 'Rian Hidayat', 'Jl. Gajah Mada No. 23, Semarang', '2005-09-30', 'Rekayasa Perangkat Lunak')
ON DUPLICATE KEY UPDATE kode_siswa = VALUES(kode_siswa);
