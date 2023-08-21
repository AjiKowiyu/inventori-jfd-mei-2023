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


    proses_input_masuk: async function(req,res) {
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
                throw error
            }
        }
    },


    keluar: async function(req,res) {
        let data = {
            req     : req,
            konten  : 'stok/keluar',
            barang  : await m_masterbarang.get_all(),
        }
        res.render('template', data)
    },


    proses_input_keluar: async function(req,res) {
        let cekstok             = await m_stok.get_stockbalance_terakhir(req)
        let form_kode_barang    = req.body.form_kode_barang
        let form_stock_out      = req.body.form_stock_out
        
        //jika jumlah stok keluar yang diinput adalah 0 atau minus
        if (form_stock_out < 1) {
            res.redirect('/stok/keluar?msg=stok-yang-ingin-dikeluarkan-minimal-1')
        }
        //jika jumlah stok keluar yang diinput adalah 1 dst
        else {
            //cek dulu, apakah barangnya ada di gudang ?
            if (cekstok.length > 0) {
                //cek dulu, jumlah barang yg ada di gudang, ada berapa stoknya ?
                //jika stok yang ingin dikeluarkan lebih besar dari stok gudang
                if (form_stock_out > cekstok[0].stock_balance) {
                    res.redirect('/stok/keluar?msg=stok-keluar-melebihi-stok-balance:-'+cekstok[0].stock_balance)
                }
                //jika stok yang ingin dikeluarkan tidak melebihi stok gudang
                else {
                    //proses input ke database
                }
            }
            // ketika barangnya tidak ada di gudang
            else {
                res.redirect('/stok/keluar?msg=barang-tidak-ada-di-gudang')
            }
        }

    }


}