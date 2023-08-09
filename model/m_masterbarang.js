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


    get_all: function() {
        let sql = mysql.format(
            `SELECT * FROM master_barang;`
        )
        return db_execution(sql)
    },


}
