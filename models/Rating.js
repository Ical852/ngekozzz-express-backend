const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const ratingSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    rate: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Rating', ratingSchema)