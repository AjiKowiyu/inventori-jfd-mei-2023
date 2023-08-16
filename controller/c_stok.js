const m_masterbarang = require('../model/m_masterbarang')
const m_stok = require('../model/m_stok')

module.exports = {


    masuk: async function(req,res) {
        let data = {
            req     : req,
            konten  : 'stok/masuk',
            barang  : await m_masterbarang.get_all(),
        }
        res.render('template', data)
    },


    proses_input: async function(req,res) {
        let balance             = 0
        let cekstok             = await m_stok.get_stockbalance_terakhir(req)
        let form_kode_barang    = req.body.form_kode_barang
        let form_stock_in       = req.body.form_stock_in

        //jika jumlah stok masuk yang diinput adalah 0 atau minus
        if (form_stock_in < 1) {
            res.redirect('/stok/masuk?msg=stok-minimal-1')
        }
        //selain itu
        else {
            //jika masih ada stok balance yang tersimpan di gudang (ada datanya di tabel)
            if (cekstok.length > 0) {
                //stok balance = input jumlah masuk + jumlah di gudang
                balance = Number(form_stock_in) + Number(cekstok[0].stock_balance)
            }
            //jika tidak ada stok balance
            else {
                //stok balance = input jumlah masuk
                balance = form_stock_in
            }

            //proses insert ke db
            let dataForm = {
                kode            : form_kode_barang,
                stock_in        : form_stock_in,
                stock_out       : 0,
                stock_balance   : balance,
                created_at      : null,
                created_by      : req.session.user.id
            }
            try {
                let sql = await m_stok.simpan_stokmasuk(dataForm)
                let pesanSukses = `berhasil-input-barang-masuk:-${form_kode_barang}-sejumlah:-${form_stock_in}pcs`
                if (sql.insertId) {
                    res.redirect(`/stok/masuk?msg=${pesanSukses}`)
                }
            } catch (error) {
                throw err
            }
        }
    }


}