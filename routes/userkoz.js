var express = require('express')
var router = express.Router()

const {
    getUserKozByUserId,
    getOwnerKoz
} = require('../controllers/userKozController')

router.get('/get/:id', getUserKozByUserId)
router.get('/owner/:id', getOwnerKoz)

module.exports = router