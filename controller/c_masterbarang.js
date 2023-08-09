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


}