var express = require('express')
var router = express.Router()
const multer = require('multer')
const os = require('os')

const {
    signUp,
    signIn,
    update,
    fetch,
    createOtp,
    verifOtp,
    resendOtp,
    updatePhoto
} = require('../controllers/userController')

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/update/:id', update)
router.get('/get/:id', fetch)
router.post('/create', createOtp)
router.post('/verif', verifOtp)
router.post('/resend', resendOtp)
router.post('/updatephoto', multer({dest: os.tmpdir()}).single('image'), updatePhoto)

module.exports = router