var express = require('express')
var router = express.Router()

const {
    getNotifByUserId,
    createNotif,
    deleteNotif
} = require('../controllers/notificationController')

router.get('/get/:id', getNotifByUserId)
router.post('/create', createNotif)
router.delete('/del/:id', deleteNotif)

module.exports = router