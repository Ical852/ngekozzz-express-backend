const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const notificationSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    message : {
        type: String,
        required: true
    },
    date : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Notification', notificationSchema)