const UserController = {}
const UserModel = require('../models/User')
const passport = require('passport')
require('../config/passport')

UserController.renderSignUpForm = (req,res) => {
    res.render('users/signup')
}

UserController.signUp = async (req,res) => {
    const errors = []
    const {name, email, password, confirm_password} = req.body
    if (password != confirm_password){
        errors.push({error_msg: 'Password do not match'})
    }
    if (password.length < 4 ){
        errors.push({error_msg: "Password must have 4 caracters at least"})
    }
    if (errors.length > 0){
        res.render('users/signup',{
            errors,
            name,
            email
        })
    }
    else{
        const exist_user = await UserModel.findOne({email: email})
        if (exist_user){
            
            req.flash('error_msg','Email in used')
            res.redirect('/users/signup')
        }
        else{
             new_user = new UserModel({name,email,password})
             new_user.password = await new_user.my_ecrypt_password(password)
             await new_user.save()
             req.flash('success_msg','User registered successfully')
             res.redirect('/users/signin')
        }
       
    }

}

UserController.rendersignInForm = (req,res) => {
    res.render('users/signin')
}

UserController.signIn = passport.authenticate('local',{
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true,
})

UserController.logout = (req,res) => {
    req.logout()
    req.flash('success_msg','Session Closed')
    res.redirect('/users/signin')
}

module.exports = UserController