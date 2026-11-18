const { body, validationResult } = require('express-validator');

const validateSiswaRules = [
  body('kode_siswa')
    .trim()
    .notEmpty().withMessage('Kode siswa wajib diisi')
    .isLength({ max: 50 }).withMessage('Kode siswa maksimal 50 karakter'),
  body('nama_siswa')
    .trim()
    .notEmpty().withMessage('Nama siswa wajib diisi')
    .isLength({ max: 100 }).withMessage('Nama siswa maksimal 100 karakter'),
  body('alamat_siswa')
    .trim()
    .notEmpty().withMessage('Alamat siswa wajib diisi'),
  body('tgl_lahir_siswa')
    .custom((value, { req }) => {
      const val = value || req.body.tgl_siswa;
      if (!val || val.toString().trim() === '') {
        throw new Error('Tanggal lahir siswa wajib diisi');
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(val) && isNaN(Date.parse(val))) {
        throw new Error('Format tanggal lahir harus YYYY-MM-DD');
      }
      return true;
    }),
  body('jurusan_siswa')
    .trim()
    .notEmpty().withMessage('Jurusan siswa wajib diisi')
    .isLength({ max: 100 }).withMessage('Jurusan siswa maksimal 100 karakter')
];

const validateUpdateSiswaRules = [
  body('nama_siswa')
    .trim()
    .notEmpty().withMessage('Nama siswa wajib diisi')
    .isLength({ max: 100 }).withMessage('Nama siswa maksimal 100 karakter'),
  body('alamat_siswa')
    .trim()
    .notEmpty().withMessage('Alamat siswa wajib diisi'),
  body('tgl_lahir_siswa')
    .custom((value, { req }) => {
      const val = value || req.body.tgl_siswa;
      if (!val || val.toString().trim() === '') {
        throw new Error('Tanggal lahir siswa wajib diisi');
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(val) && isNaN(Date.parse(val))) {
        throw new Error('Format tanggal lahir harus YYYY-MM-DD');
      }
      return true;
    }),
  body('jurusan_siswa')
    .trim()
    .notEmpty().withMessage('Jurusan siswa wajib diisi')
    .isLength({ max: 100 }).withMessage('Jurusan siswa maksimal 100 karakter')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validasi input gagal',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

module.exports = {
  validateCreateSiswa: [...validateSiswaRules, handleValidationErrors],
  validateUpdateSiswa: [...validateUpdateSiswaRules, handleValidationErrors]
};
