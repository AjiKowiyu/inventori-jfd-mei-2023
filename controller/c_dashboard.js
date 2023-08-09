module.exports = {


    index: function(req,res) {
        let data = {
            konten: 'dashboard/index',
        }
        res.render('template', data)
    },


}