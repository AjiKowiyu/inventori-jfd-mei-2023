const express           = require('express')
const app               = express()
const port              = 3000
const passport          = require('passport')
const cookieParser      = require('cookie-parser')
const session           = require('express-session')
const passportExecution = require('./controller/c_passport_local')



//settingan session, passport untuk login
passportExecution()
app.use( cookieParser('secret') )
app.use( session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
        // 86.400.000 detik atau 1 hari (batas session)
    }
}))
app.use( passport.initialize() )
app.use( passport.session() )



//settingan general/umum
app.use( express.json() )
app.use( express.urlencoded({extended: false}) )
app.use( express.static('public') )

app.set('views', './view')
app.set('view engine', 'ejs')



//import file
const cek_login = require('./controller/c_beranda').cek_login
const c_beranda = require('./controller/c_beranda')



//route
app.get('/', c_beranda.index)
app.get('/auth', c_beranda.login)
app.post('/auth/login', c_beranda.proses_login)
app.get('/dashboard', cek_login, c_beranda.sukses_login)
app.get('/akun', cek_login, c_beranda.akun)



//jalankan server
app.listen(port, function() {
    console.log(
        `===============================================================\n`+
        `Aplikasi nodejs anda sudah jalan di http://localhost:${port}\n`+
        `===============================================================`
    )
})