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
const c_dashboard = require('./controller/c_dashboard')
const c_masterbarang = require('./controller/c_masterbarang')
const c_stok = require('./controller/c_stok')



//route
app.get('/', c_beranda.index)
app.get('/auth', c_beranda.login)
app.post('/auth/login', c_beranda.proses_login)
app.get('/dashboard', cek_login, c_dashboard.index)

app.get('/master/barang', cek_login, c_masterbarang.index)
app.get('/master/barang/tambah', cek_login, c_masterbarang.tambah)
app.post('/master/barang/proses-tambah', cek_login, c_masterbarang.proses_tambah)

app.get('/stok/masuk', cek_login, c_stok.masuk)
app.post('/stok/masuk/proses-input', cek_login, c_stok.proses_input)



//jalankan server
app.listen(port, function() {
    console.log(
        `===============================================================\n`+
        `Aplikasi nodejs anda sudah jalan di http://localhost:${port}\n`+
        `===============================================================`
    )
})