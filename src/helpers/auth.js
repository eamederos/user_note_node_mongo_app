const helper = {}

helper.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
    {   
        return next()
    }
    req.flash('error', "You need to autheticate")
    res.redirect('/users/signin')
}

module.exports = helper