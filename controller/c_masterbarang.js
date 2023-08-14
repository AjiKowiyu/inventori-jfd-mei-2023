const m_masterbarang = require('../model/m_masterbarang')

module.exports = {


    index: async function(req,res) {
        let data = {
            konten: 'masterbarang/index',
            req: req,
            barang: await m_masterbarang.get_all(),
        }
        res.render('template', data)
    },


    tambah: function(req,res) {
        let data = {
            konten: 'masterbarang/tambah',
            req: req,
        }
        res.render('template', data)
    },


    proses_tambah: async function(req,res) {
        let sql = await m_masterbarang.simpan(req)
        try {
            if (sql.insertId) {
                res.redirect('/master/barang?status=insert-success')
            }
        } catch (error) {
            throw err
        }
    },


}