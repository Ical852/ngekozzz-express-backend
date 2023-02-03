const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const otpSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    otpVerif: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Otp', otpSchema)