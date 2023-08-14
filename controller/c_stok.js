
module.exports = {


    masuk: function(req,res) {
        let data = {
            konten: 'stok/masuk',
            req: req,
        }
        res.render('template', data)
    },


}