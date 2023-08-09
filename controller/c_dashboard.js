module.exports = {


    index: function(req,res) {
        let data = {
            konten: 'dashboard/index',
            req: req,
        }
        res.render('template', data)
    },


}