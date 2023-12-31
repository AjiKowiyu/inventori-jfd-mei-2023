const bcrypt    = require('bcryptjs')
const mysql     = require('mysql')
const db        = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_db_inventori',
})
db.connect()



let cari_username = (username)=>{
    return new Promise((resolve, reject) => {
        try {
            db.query(`SELECT * FROM user WHERE username = ?`, username, (err,hasil)=>{
                if (err) {reject(err)}
                let user = hasil[0]
                resolve(user)
            })
        } catch (error) {
            reject(error)
        }
    })
}



let cek_username_password = (username, password)=>{
    return new Promise(async (resolve,reject)=>{
        let user = await cari_username(username);
        //cek user ada gak di db
        if (user) {
            //cek password
            await bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    console.log('password benar')
                    resolve(true)
                } else {
                    console.log('password salah')
                    reject(`Password salah`)
                }
            });
        } else {
            console.log(`user "${username}" belum terdaftar`)
            reject(`user "${username}" belum terdaftar`)
        }
    })
}



module.exports = {

    index: function(req,res) {
        let data = {
            konten: 'beranda/index',
            req: req,
        }
        res.render('template', data)
    },


    cari_username,
    cek_username_password,


    login: function(req,res) {
        let data = {
            konten: 'auth/login',
            pesanError: req.query.m,
            req: req,
        }
        res.render('template', data)
    },


    proses_login: async function(req,res) {
        let username = req.body.form_username
        let password = req.body.form_password

        try {
            let akuncocok = await cek_username_password(username, password)
            if (akuncocok) {
                let user = await cari_username(username)
                if (user) {
                    req.session.user = user
                    return res.redirect('/dashboard')
                }
            }
        } catch (error) {
            res.redirect(`/auth?m=${error}`)
        }
    },


    cek_login: function (req,res,next) {
        if (!req.session.user) {
            return res.redirect(`/auth`)
        } else {
            next()
        }
    },



}