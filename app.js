const express   = require('express')
const app       = express()
const port      = 3000
const passport      = require('passport')
const cookieParser  = require('cookie-parser')
const session       = require('express-session')



app.use( express.json() )
app.use( express.urlencoded({extended: false}) )
app.use( express.static('public') )

app.set('views', './view')
app.set('view engine', 'ejs')

//import file
const c_beranda = require('./controller/c_beranda')

//route
app.get('/', c_beranda.index)
app.get('/auth', c_beranda.login)
app.post('/auth/login', c_beranda.proses_login)


//jalankan server
app.listen(port, function() {
    console.log(
        `===============================================================\n`+
        `Aplikasi nodejs anda sudah jalan di http://localhost:${port}\n`+
        `===============================================================`
    )
})