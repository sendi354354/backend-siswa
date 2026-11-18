const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`,
    data: null
  });
};

const errorHandler = (err, req, res, next) => {
  console.error('[Error Handler]', err);

  // Sequelize Unique Constraint Error (misal kode_siswa duplikat)
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      success: false,
      message: 'Kode siswa sudah digunakan, gunakan kode yang berbeda',
      errors: err.errors ? err.errors.map(e => ({ field: e.path, message: e.message })) : []
    });
  }

  // Sequelize Validation Error
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Data tidak valid menurut skema database',
      errors: err.errors ? err.errors.map(e => ({ field: e.path, message: e.message })) : []
    });
  }

  // Database Connection Error
  if (err.name === 'SequelizeConnectionError' || err.name === 'SequelizeConnectionRefusedError') {
    return res.status(503).json({
      success: false,
      message: 'Gagal terhubung ke database PostgreSQL. Pastikan service PostgreSQL sudah berjalan.',
      data: null
    });
  }

  // Default server error
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Terjadi kesalahan internal pada server',
    data: null
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
