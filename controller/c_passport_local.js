const passportLocal = require('passport-local')
const passport      = require('passport')
const c_beranda     = require('./c_beranda')
//================================================//

let LocalStrategy = passportLocal.Strategy;

let passportExecution = ()=>{
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, username, password, done)=>{
        try {
            await c_beranda.cari_username(username).then( async (user)=>{
                if (!user) {
                    console.error( `passport: This user "${username}" doesn't exist` )
                    return done(null, false, req.flash("errors", `This user "${username}" doesn't exist`))
                }
                if (user) {
                    let match = await c_beranda.compare_password(username, password)
                    if (match === true) {
                        console.log('passport: password match')
                        return done(null, user, null)
                    } else {
                        console.log('passport: password gagal')
                        return done(null, false, req.flash("errors", match) )
                    }
                }
            })
        } catch (err) {
            console.log(err)
            return done(null, false, { message: err })
        }
    }))

}


//menyambungkan antara cookie browser dengan session server
passport.serializeUser( (user,done)=>{
    console.log('berhasil serialize user')
    done(null, user.id)
})


//memutus sambungan antara browser dan session
passport.deserializeUser( (id,done)=>{
    c_beranda.cari_username(id).then( (user)=>{
        console.log('berhasil de-serialize user')
        return done(null, user)
    }).catch( (error)=>{
        console.error(`passport: ${error}`)
        return done(error, null)
    })
})


module.exports = passportExecution