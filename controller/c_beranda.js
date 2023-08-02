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


    proses_login: function(req,res) {
        let username = req.body.form_username
        let password = req.body.form_password

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
                reject(`user "${username}" belum terdaftar`)
            }
        })
    },




}