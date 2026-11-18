require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Tes koneksi database
    await sequelize.authenticate();
    console.log('✅ [DB] Terhubung ke database MySQL via Sequelize.');

    // 3. Sinkronisasi model Sequelize (tanpa menghapus data yang ada)
    await sequelize.sync();
    console.log('✅ [DB] Model Siswa berhasil disinkronisasi.');

    app.listen(PORT, () => {
      console.log(`🚀 [Server] Berjalan di http://localhost:${PORT}`);
      console.log(`📋 [Endpoint] GET/POST/PUT/DELETE http://localhost:${PORT}/api/siswa`);
    });
  } catch (err) {
    console.error('❌ [DB Error] Gagal terhubung ke database:', err.message);
    console.warn('⚠️ Server tetap dijalankan agar endpoint dapat merespons pesan error koneksi.');
    
    app.listen(PORT, () => {
      console.log(`🚀 [Server] Berjalan di http://localhost:${PORT} (Database belum terhubung)`);
    });
  }
};

startServer();
