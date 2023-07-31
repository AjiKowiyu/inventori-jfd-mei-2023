const express   = require('express')
const app       = express()
const port      = 3000


app.use( express.json() )
app.use( express.urlencoded({extended: false}) )

app.set('views', './view')
app.set('view engine', 'ejs')

//import file
const c_beranda = require('./controller/c_beranda')

//route
app.get('/', c_beranda.index)


//jalankan server
app.listen(port, function() {
    console.log(
        `===============================================================\n`+
        `Aplikasi nodejs anda sudah jalan di http://localhost:${port}\n`+
        `===============================================================`
    )
})