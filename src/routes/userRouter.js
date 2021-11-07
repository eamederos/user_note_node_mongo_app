const {Router} = require('express')
const router = Router()

const {
    renderSignUpForm,
    signUp,
    rendersignInForm,
    signIn,
    logout
} = require('../controllers/UserController')

router.get('/users/signup',renderSignUpForm)
router.post('/users/signup',signUp)
router.get('/users/signin',rendersignInForm)
router.post('/users/signin',signIn)
router.get('/users/logout',logout)

module.exports = router
