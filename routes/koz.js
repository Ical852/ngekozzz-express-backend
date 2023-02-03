var express = require('express')
var router = express.Router()

const {
    getAllKoz,
    getKozByCategoryId,
    getKozById,
    giveRate,
    getAllCategory
} = require('../controllers/kozController')

router.get('/getall', getAllKoz)
router.get('/get/cat/:id', getKozByCategoryId)
router.get('/get/:id', getKozById),
router.post('/giverate/:id', giveRate)
router.get('/cat', getAllCategory)

module.exports = router