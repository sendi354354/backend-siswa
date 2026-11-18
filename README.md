# Backend API - CRUD Data Siswa (Express.js 5 + MySQL Sequelize)

Proyek Backend RESTful API untuk pengelolaan Data Siswa yang dibangun menggunakan Express.js 5.x, Sequelize ORM dengan PostgreSQL, arsitektur MVC (Model-View-Controller), OOP class-based controller, validasi terpusat dengan express-validator, serta penanganan error global.

## 🛠️ Stack Teknologi

- **Runtime:** Node.js (v24 LTS / v26 LTS)
- **Framework:** Express.js 5.x (Native async error handling)
- **Database:** MySQL/MariaDB melalui Laragon (db_siswa)
- **ORM:** Sequelize 6.x (dialect mysql)
- **Driver Database:** `mysql2`
- **Validasi Input:** `express-validator`
- **Utility:** `cors`, `morgan`, `dotenv`, `nodemon`

---

## 📁 Struktur Direktori

```text
backend/
├── src/
│   ├── config/
│   │   └── database.js         # Konfigurasi koneksi Sequelize ke PostgreSQL
│   ├── models/
│   │   └── Siswa.js            # Model entitas Siswa
│   ├── controllers/
│   │   └── SiswaController.js  # Class controller OOP untuk logika bisnis CRUD
│   ├── routes/
│   │   └── siswaRoutes.js      # Definisi routing endpoint API
│   ├── middlewares/
│   │   ├── errorHandler.js     # Middleware error handling terpusat (404 & server error)
│   │   └── validateSiswa.js    # Validasi input express-validator
│   └── app.js                  # Inisialisasi Express & konfigurasi middleware
├── schema.sql                  # Script SQL pembuatan database, tabel & data dummy
├── .env.example                # Template variabel environment
├── .gitignore
├── package.json
├── README.md
└── server.js                   # Entry point aplikasi & sinkronisasi database
```

---

## 📋 Skema Entitas Siswa

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `kode_siswa` | VARCHAR(50) | **Primary Key**, unik, wajib diisi |
| `nama_siswa` | VARCHAR(100) | Wajib diisi |
| `alamat_siswa` | TEXT | Wajib diisi |
| `tgl_lahir_siswa` | DATE | Format `YYYY-MM-DD`, wajib diisi |
| `jurusan_siswa` | VARCHAR(100) | Wajib diisi |
| `created_at` | TIMESTAMP | Timestamp otomatis saat dibuat |
| `updated_at` | TIMESTAMP | Timestamp otomatis saat diperbarui |

---

## 🚀 Panduan Instalasi & Menjalankan Server

### 1. Prasyarat
- Pastikan **Node.js** (v24+) sudah terinstall.
- Pastikan Laragon aktif dan service **MySQL** sudah berjalan.
- Database client seperti **HeidiSQL** atau **DBeaver** dapat digunakan untuk menjalankan skrip SQL.

### 2. Setup Database di DBeaver
1. Jalankan Laragon dan klik **Start All** agar MySQL aktif pada port `3306`.
2. Buka HeidiSQL atau DBeaver, buat koneksi MySQL (Host: `localhost`, Port: `3306`, User: `root`, Password kosong secara bawaan Laragon).
3. Jalankan seluruh isi file `backend/schema.sql` untuk membuat database `db_siswa`, tabel `siswa`, dan data dummy.

### 3. Konfigurasi Environment
Salin file `.env.example` menjadi `.env` lalu sesuaikan kredensial database Anda:
```bash
cp .env.example .env
```
Isi file `.env`:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=db_siswa
```

### 4. Install Dependensi
```bash
npm install
```

### 5. Jalankan Server
- Mode Pengembangan (Hot Reload dengan Nodemon):
  ```bash
  npm run dev
  ```
- Mode Produksi:
  ```bash
  npm start
  ```
Server akan aktif di: `http://localhost:5000`

---

## 📡 Dokumentasi Endpoint REST API

Semua respons API menggunakan format konsisten:
```json
{
  "success": true,
  "message": "Pesan deskriptif",
  "data": ...
}
```

### 1. Ambil Semua Data Siswa
- **URL:** `GET /api/siswa`
- **Query Parameter (Opsional):**
  - `search`: kata kunci pencarian berdasarkan kode, nama, alamat, atau jurusan.
  - `page`: nomor halaman (contoh: `1`).
  - `limit`: jumlah data per halaman (contoh: `10`).
- **Contoh Request:** `GET http://localhost:5000/api/siswa?search=Ahmad`
- **Contoh Response (200 OK):**
```json
{
  "success": true,
  "message": "Data siswa berhasil diambil",
  "data": [
    {
      "kode_siswa": "SISWA-001",
      "nama_siswa": "Ahmad Dahlan",
      "alamat_siswa": "Jl. Malioboro No. 12, Yogyakarta",
      "tgl_lahir_siswa": "2006-05-14",
      "jurusan_siswa": "Rekayasa Perangkat Lunak",
      "created_at": "2026-11-18T03:00:00.000Z",
      "updated_at": "2026-11-18T03:00:00.000Z"
    }
  ]
}
```

---

### 2. Ambil Detail Siswa Berdasarkan Kode
- **URL:** `GET /api/siswa/:kode`
- **Contoh Request:** `GET http://localhost:5000/api/siswa/SISWA-001`
- **Contoh Response (200 OK):**
```json
{
  "success": true,
  "message": "Detail data siswa berhasil diambil",
  "data": {
    "kode_siswa": "SISWA-001",
    "nama_siswa": "Ahmad Dahlan",
    "alamat_siswa": "Jl. Malioboro No. 12, Yogyakarta",
    "tgl_lahir_siswa": "2006-05-14",
    "jurusan_siswa": "Rekayasa Perangkat Lunak",
    "created_at": "2026-11-18T03:00:00.000Z",
    "updated_at": "2026-11-18T03:00:00.000Z"
  }
}
```

---

### 3. Tambah Siswa Baru
- **URL:** `POST /api/siswa`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "kode_siswa": "SISWA-006",
  "nama_siswa": "Khadijah Al-Kubro",
  "alamat_siswa": "Jl. Teuku Umar No. 15",
  "tgl_lahir_siswa": "2006-09-10",
  "jurusan_siswa": "Rekayasa Perangkat Lunak"
}
```
- **Contoh Response (201 Created):**
```json
{
  "success": true,
  "message": "Data siswa berhasil ditambahkan",
  "data": {
    "kode_siswa": "SISWA-006",
    "nama_siswa": "Khadijah Al-Kubro",
    "alamat_siswa": "Jl. Teuku Umar No. 15",
    "tgl_lahir_siswa": "2006-09-10",
    "jurusan_siswa": "Rekayasa Perangkat Lunak",
    "created_at": "2026-11-18T03:50:00.000Z",
    "updated_at": "2026-11-18T03:50:00.000Z"
  }
}
```

---

### 4. Perbarui Data Siswa
- **URL:** `PUT /api/siswa/:kode`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "nama_siswa": "Khadijah Al-Kubro Update",
  "alamat_siswa": "Jl. Teuku Umar No. 20",
  "tgl_lahir_siswa": "2006-09-10",
  "jurusan_siswa": "Teknik Komputer dan Jaringan"
}
```
- **Contoh Response (200 OK):**
```json
{
  "success": true,
  "message": "Data siswa berhasil diperbarui",
  "data": {
    "kode_siswa": "SISWA-006",
    "nama_siswa": "Khadijah Al-Kubro Update",
    "alamat_siswa": "Jl. Teuku Umar No. 20",
    "tgl_lahir_siswa": "2006-09-10",
    "jurusan_siswa": "Teknik Komputer dan Jaringan",
    "updated_at": "2026-11-18T03:55:00.000Z"
  }
}
```

---

### 5. Hapus Data Siswa
- **URL:** `DELETE /api/siswa/:kode`
- **Contoh Request:** `DELETE http://localhost:5000/api/siswa/SISWA-006`
- **Contoh Response (200 OK):**
```json
{
  "success": true,
  "message": "Data siswa dengan kode 'SISWA-006' berhasil dihapus",
  "data": {
    "kode_siswa": "SISWA-006"
  }
}
```

---

## 🛡️ Response Error Terpusat

Jika terjadi kegagalan validasi (400 Bad Request):
```json
{
  "success": false,
  "message": "Validasi input gagal",
  "errors": [
    {
      "field": "tgl_lahir_siswa",
      "message": "Format tanggal lahir harus YYYY-MM-DD"
    }
  ]
}
```

Jika data tidak ditemukan (404 Not Found):
```json
{
  "success": false,
  "message": "Data siswa dengan kode 'SISWA-999' tidak ditemukan",
  "data": null
}
```
