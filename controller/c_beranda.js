module.exports = {

    index: function(req,res) {
        let data = {
            konten: 'beranda/index',
        }
        res.render('template', data)
    },


    login: function(req,res) {
        let data = {
            konten: 'auth/login',
        }
        res.render('template', data)
    },

}