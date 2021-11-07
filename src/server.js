const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const methondOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
require('./config/passport');

//Initializations
const app = express()

//Setting
app.set('port',process.env.PORT || 3000)
app.set('views',path.join(__dirname,'views'))
       //esta es la configuracion para el motor de plantillas
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts') ,
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs' 
}))
app.set('view engine','.hbs')

//Midlewares
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(methondOverride('_method'))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


//Global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})

//Routes
app.use(require('./routes/indexRouter'))
app.use(require('./routes/noteRouter'))
app.use(require('./routes/userRouter'))

//Static files
app.use(express.static(path.join(__dirname,'public')))

module.exports = app