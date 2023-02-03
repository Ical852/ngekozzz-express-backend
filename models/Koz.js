const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const kozSchema = new mongoose.Schema({
    category : {
        type: ObjectId,
        ref : 'Category'
    },
    name : {
        type: String,
        required : true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    },
    facilities : [{
        type: ObjectId,
        ref: 'Facility'
    }],
    ratings: {
        type: String,
    }
})

module.exports = mongoose.model('Koz', kozSchema)