var express = require('express')
var router = express.Router()

const {
    createTransaction,
    extendRent,
    getTransactionByUserId,
    getTransactionById
} = require('../controllers/transactionController')

router.post('/trans', createTransaction)
router.post('/extend/:id', extendRent)
router.get('/user/:id', getTransactionByUserId)
router.get('/detail/:id', getTransactionById)

module.exports = router