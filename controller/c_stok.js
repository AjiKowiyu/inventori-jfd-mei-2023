const m_masterbarang = require('../model/m_masterbarang')

module.exports = {


    masuk: async function(req,res) {
        let data = {
            req     : req,
            konten  : 'stok/masuk',
            barang  : await m_masterbarang.get_all(),
        }
        res.render('template', data)
    },


}