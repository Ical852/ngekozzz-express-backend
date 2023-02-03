const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const userKozSchema = new mongoose.Schema({
    koz: {
        type: ObjectId,
        ref: 'Koz'
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },
    period: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('UserKoz', userKozSchema)