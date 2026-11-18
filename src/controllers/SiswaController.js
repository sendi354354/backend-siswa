const { Op } = require('sequelize');
const Siswa = require('../models/Siswa');

class SiswaController {
  /**
   * Helper untuk menambahkan alias tgl_siswa agar kompatibel ke frontend
   */
  static formatSiswa(siswa) {
    if (!siswa) return null;
    const json = typeof siswa.toJSON === 'function' ? siswa.toJSON() : siswa;
    return {
      ...json,
      tgl_siswa: json.tgl_lahir_siswa || json.tgl_siswa || null
    };
  }

  /**
   * GET /api/siswa
   * List data siswa dengan dukungan query search dan pagination opsional
   */
  static async getAll(req, res, next) {
    try {
      const { search, page, limit } = req.query;

      const whereClause = {};
      if (search && search.trim() !== '') {
        const keyword = `%${search.trim()}%`;
        whereClause[Op.or] = [
          { kode_siswa: { [Op.iLike]: keyword } },
          { nama_siswa: { [Op.iLike]: keyword } },
          { alamat_siswa: { [Op.iLike]: keyword } },
          { jurusan_siswa: { [Op.iLike]: keyword } }
        ];
      }

      // Pagination opsional
      const isPaginated = page !== undefined || limit !== undefined;
      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const limitNum = Math.max(1, parseInt(limit, 10) || 10);
      const offset = (pageNum - 1) * limitNum;

      const queryOptions = {
        where: whereClause,
        order: [['created_at', 'DESC']]
      };

      if (isPaginated) {
        queryOptions.limit = limitNum;
        queryOptions.offset = offset;

        const { count, rows } = await Siswa.findAndCountAll(queryOptions);
        return res.status(200).json({
          success: true,
          message: 'Data siswa berhasil diambil',
          data: rows.map(r => SiswaController.formatSiswa(r)),
          pagination: {
            totalData: count,
            currentPage: pageNum,
            totalPages: Math.ceil(count / limitNum),
            limit: limitNum
          }
        });
      }

      const siswaList = await Siswa.findAll(queryOptions);
      return res.status(200).json({
        success: true,
        message: 'Data siswa berhasil diambil',
        data: siswaList.map(r => SiswaController.formatSiswa(r))
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/siswa/:kode
   * Detail satu siswa berdasarkan kode_siswa
   */
  static async getByKode(req, res, next) {
    try {
      const { kode } = req.params;
      const siswa = await Siswa.findByPk(kode);

      if (!siswa) {
        return res.status(404).json({
          success: false,
          message: `Data siswa dengan kode '${kode}' tidak ditemukan`,
          data: null
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Detail data siswa berhasil diambil',
        data: SiswaController.formatSiswa(siswa)
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/siswa
   * Tambah data siswa baru
   */
  static async create(req, res, next) {
    try {
      const { kode_siswa, nama_siswa, alamat_siswa, tgl_lahir_siswa, tgl_siswa, jurusan_siswa } = req.body;
      const tanggalLahir = tgl_lahir_siswa || tgl_siswa;

      // Periksa apakah kode_siswa sudah ada
      const existing = await Siswa.findByPk(kode_siswa);
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `Kode siswa '${kode_siswa}' sudah terdaftar, gunakan kode lain`,
          data: null
        });
      }

      const newSiswa = await Siswa.create({
        kode_siswa,
        nama_siswa,
        alamat_siswa,
        tgl_lahir_siswa: tanggalLahir,
        jurusan_siswa
      });

      return res.status(201).json({
        success: true,
        message: 'Data siswa berhasil ditambahkan',
        data: SiswaController.formatSiswa(newSiswa)
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * PUT /api/siswa/:kode
   * Update data siswa berdasarkan kode_siswa
   */
  static async update(req, res, next) {
    try {
      const { kode } = req.params;
      const { nama_siswa, alamat_siswa, tgl_lahir_siswa, tgl_siswa, jurusan_siswa } = req.body;
      const tanggalLahir = tgl_lahir_siswa || tgl_siswa;

      const siswa = await Siswa.findByPk(kode);
      if (!siswa) {
        return res.status(404).json({
          success: false,
          message: `Data siswa dengan kode '${kode}' tidak ditemukan`,
          data: null
        });
      }

      await siswa.update({
        nama_siswa,
        alamat_siswa,
        tgl_lahir_siswa: tanggalLahir,
        jurusan_siswa
      });

      return res.status(200).json({
        success: true,
        message: 'Data siswa berhasil diperbarui',
        data: SiswaController.formatSiswa(siswa)
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * DELETE /api/siswa/:kode
   * Hapus data siswa berdasarkan kode_siswa
   */
  static async delete(req, res, next) {
    try {
      const { kode } = req.params;

      const siswa = await Siswa.findByPk(kode);
      if (!siswa) {
        return res.status(404).json({
          success: false,
          message: `Data siswa dengan kode '${kode}' tidak ditemukan`,
          data: null
        });
      }

      await siswa.destroy();

      return res.status(200).json({
        success: true,
        message: `Data siswa dengan kode '${kode}' berhasil dihapus`,
        data: { kode_siswa: kode }
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SiswaController;
