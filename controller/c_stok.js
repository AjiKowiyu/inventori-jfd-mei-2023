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


    proses_input: function(req,res) {
        let dataForm = {
            kode        : req.body.form_kode_barang,
            stock_in    : req.body.form_stock_in,
        }
        if (dataForm.stock_in < 1) {
            res.redirect('/stok/masuk?msg=stok-minimal-1')
        }
        res.send(dataForm)
    }


}