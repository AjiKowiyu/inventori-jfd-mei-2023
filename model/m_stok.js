const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_db_inventori',
})
db.connect()


function db_execution(sql) {
    return new Promise( (resolve,reject)=>{
        db.query(sql, (err,rows)=>{
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}



module.exports = {

    get_stockbalance_terakhir: function(req) {
        let sql = mysql.format(
            `SELECT * FROM stok_barang
            WHERE kode = ?
            ORDER BY id DESC
            LIMIT 1;`,
            [req.body.form_kode_barang]
        )
        return db_execution(sql)
    },


    simpan_stokmasuk: function(dataForm) {
        let sql = mysql.format(
            `INSERT INTO stok_barang SET ?`,
            [dataForm]
        )
        return db_execution(sql)
    }

}
