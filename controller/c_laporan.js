const m_masterbarang = require('../model/m_masterbarang')

module.exports = {

    stok_riwayat: async function(req,res) {
        let data = {
            req     : req,
            konten  : 'laporan/stok/riwayat',
            barang  : await m_masterbarang.get_all(),
        }
        res.render('template', data)
    }

}