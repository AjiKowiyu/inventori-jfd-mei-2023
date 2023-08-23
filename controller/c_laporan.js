module.exports = {

    stok_riwayat: function(req,res) {
        let data = {
            req     : req,
            konten  : 'laporan/stok/riwayat',
        }
        res.render('template', data)
    }

}