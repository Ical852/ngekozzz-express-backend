const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const transactionSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    koz: {
        type: ObjectId,
        ref: 'Koz'
    },
    totalMonth: {
        type: Number,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
    },
    paymentUrl: {
        type: String
    }
})

module.exports = mongoose.model('Transaction', transactionSchema)