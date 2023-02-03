const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const ownerSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    koz: {
        type: ObjectId,
        ref: 'Koz'
    }
})

module.exports = mongoose.model('Owner', ownerSchema)