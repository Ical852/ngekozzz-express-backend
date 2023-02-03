const Notification = require('../models/Notification')
const { success, failed } = require('../formatter')
const mongoose = require('mongoose')

module.exports = {
    getNotifByUserId: async (req, res) => {
        try {
            const {id} = req.params
            const notifs = await Notification.find({user: id}).populate('user')
            
            success(res, "Success Get Notification Data", notifs)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    createNotif: async (req, res) => {
        try {
            const { user, message, date } = req.body
            const notif = await Notification.create({
                user: mongoose.Types.ObjectId(user),
                message: message,
                date: date
            })

            await notif.save()

            success(res, "Success Get Notification Data", notif)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    deleteNotif: async (req, res) => {
        try {
            const {id} = req.params
            const notif = await Notification.findOne({_id: id})
            if (!notif) {
                return failed(res, "Notification Not Found", notif)
            }

            await notif.delete()

            return success(res, "Success Delete Notification Data", notif)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    }
}