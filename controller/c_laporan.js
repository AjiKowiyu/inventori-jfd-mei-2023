const m_masterbarang = require('../model/m_masterbarang')
const m_laporan = require('../model/m_laporan')

module.exports = {

    stok_riwayat: async function(req,res) {
        let data = {
            req     : req,
            konten  : 'laporan/stok/riwayat',
            listbarang  : await m_masterbarang.get_all(),
        }
        res.render('template', data)
    },


    stok_riwayat_perbarang: async function(req,res) {
        let kode_barang = req.params.kode_barang
        let data = {
            req     : req,
            konten  : 'laporan/stok/riwayat-perbarang',
            listbarang  : await m_masterbarang.get_all(),
            barang  : await m_laporan.get_barang_bykode(kode_barang)
        }
        res.render('template', data)
    },

}