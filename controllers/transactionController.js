const Transaction = require('../models/Transaction')
const UserKoz = require('../models/UserKoz')
const Koz = require('../models/Koz')
const midtrans = require('midtrans-client')
const { success, failed } = require('../formatter')
const mongoose = require('mongoose')

module.exports = {
    createTransaction: async (req, res) => {
        try {
            const { user, koz, total_month, order_id } = req.body
            const rentKoz = await Koz.findOne({_id: koz})
            if (!rentKoz) {
                return failed(res, "Koz Not Found", notif)
            }

            const date = new Date()
            date.setDate(date.getDate() + (total_month * 30))
            const formattedDate = date.toISOString().split("T")[0]

            let snap = new midtrans.Snap()
            snap.apiConfig.isProduction = false;

            let parameter = {
                "transaction_details": {
                    "order_id": order_id,
                    "gross_amount": rentKoz.price * total_month
                },
            };

            snap.createTransactionRedirectUrl(parameter)
            .then(async (redirectUrl) => {
                const transaction = await Transaction.create({
                    user: mongoose.Types.ObjectId(user),
                    koz: mongoose.Types.ObjectId(koz),
                    totalMonth: total_month,
                    orderId: order_id,
                    totalAmount: rentKoz.price * total_month,
                    paymentUrl: redirectUrl
                })

                const userKoz = await UserKoz.create({
                    koz: mongoose.Types.ObjectId(koz),
                    user: mongoose.Types.ObjectId(user),
                    period: formattedDate.toString()
                })

                const data = {
                    transaction: transaction,
                    user_koz: userKoz
                }

                success(res, "Success Create Transaction", data)
            })
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    extendRent: async(req, res) => {
        try {
            const {id} = req.params
            const { user, koz, total_month, order_id } = req.body
            const rentKoz = await Koz.findOne({_id: koz})
            if (!rentKoz) {
                return failed(res, "Koz Not Found", rentKoz)
            }

            const curUserKoz = await UserKoz.findOne({_id: id})
            if (!curUserKoz) {
                return failed(res, "User Koz Not Found", curUserKoz)
            }

            const date = new Date(curUserKoz.period)
            date.setDate(date.getDate() + (total_month * 30))
            const formattedDate = date.toISOString().split("T")[0]

            let snap = new midtrans.Snap()
            snap.apiConfig.isProduction = false;

            let parameter = {
                "transaction_details": {
                    "order_id": order_id,
                    "gross_amount": rentKoz.price * total_month
                },
            };

            snap.createTransactionRedirectUrl(parameter)
            .then(async (redirectUrl) => {
                const transaction = await Transaction.create({
                    user: mongoose.Types.ObjectId(user),
                    koz: mongoose.Types.ObjectId(koz),
                    totalMonth: total_month,
                    orderId: order_id,
                    totalAmount: rentKoz.price * total_month,
                    paymentUrl: redirectUrl
                })

                curUserKoz.period = formattedDate.toString()
                await curUserKoz.save()

                const data = {
                    transaction: transaction,
                    user_koz: curUserKoz
                }

                success(res, "Success Extend Rent Transaction", data)
            })
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    getTransactionByUserId: async (req, res) => {
        try {
            const {id} = req.params
            const transaction = await Transaction.find({user: id}).populate('user').populate('koz')

            success(res, "Success Get User Transaction", transaction)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    getTransactionById: async (req, res) => {
        try {
            const {id} = req.params
            const transaction = await Transaction.findOne({_id: id}).populate('user').populate('koz')

            success(res, "Success Get Transaction", transaction)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    }
}