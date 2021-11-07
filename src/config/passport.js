const passport = require('passport')
const LocalStrategy = require('passport-local')
const UserModel = require('../models/User')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email,password, done)=>{
    // Confirmar si existe el correo del usuario
    const user = await UserModel.findOne({email})
    if (!user){
        return done(null,false,{message: "Not user found with this email"})
    }
    else{
        //verificar que el password es correcto
       const match = await user.my_match_password(password)
       if (match){
           return done(null,user)
       }
       else{
           return done(null,false,{message: "Wrong password"})
       }
    }
}))

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    UserModel.findById(id, (error, user)=>{
        done(error, user)
    })
})