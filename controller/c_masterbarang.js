module.exports = {


    index: function(req,res) {
        let data = {
            konten: 'masterbarang/index',
            req: req,
        }
        res.render('template', data)
    },


}