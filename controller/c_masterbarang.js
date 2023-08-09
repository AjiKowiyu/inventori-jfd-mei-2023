module.exports = {


    index: function(req,res) {
        let data = {
            konten: 'masterbarang/index',
        }
        res.render('template', data)
    },


}