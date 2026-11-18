const express = require('express');
const router = express.Router();
const SiswaController = require('../controllers/SiswaController');
const { validateCreateSiswa, validateUpdateSiswa } = require('../middlewares/validateSiswa');

// GET /api/siswa - list seluruh siswa (support ?search= & pagination)
router.get('/', SiswaController.getAll);

// GET /api/siswa/:kode - detail satu siswa
router.get('/:kode', SiswaController.getByKode);

// POST /api/siswa - tambah data siswa baru
router.post('/', validateCreateSiswa, SiswaController.create);

// PUT /api/siswa/:kode - update data siswa
router.put('/:kode', validateUpdateSiswa, SiswaController.update);

// DELETE /api/siswa/:kode - hapus data siswa
router.delete('/:kode', SiswaController.delete);

module.exports = router;
