const Koz = require('../models/Koz')
const Rating = require('../models/Rating')
const Category = require('../models/Category')
const Facility = require('../models/Facility')
const { success, failed } = require('../formatter')
const mongoose = require('mongoose')

module.exports = {
    getAllKoz: async (req, res) => {
        try {
            const koz = await Koz.find().populate('category').populate('owner').populate('facilities').populate({
                path: 'ratings',
                populate: {
                    path: 'user'
                }
            })

            success(res, "Success Get Kozzz Data", koz)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    getKozByCategoryId: async (req, res) => {
        const {id} = req.params
        try {
            const koz = await Koz.find({category: id}).populate('category').populate('owner').populate('facilities').populate({
                path: 'ratings',
                populate: {
                    path: 'user'
                }
            })
            success(res, "Success Get Kozzz Data By Category Id", koz)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    getKozById: async (req, res) => {
        const {id} = req.params
        try {
            const koz = await Koz.findOne({_id: id}).populate('category').populate('owner').populate('facilities').populate({
                path: 'ratings',
                populate: {
                    path: 'user'
                }
            })
            success(res, "Success Get Kozzz Data By Id", koz)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    giveRate: async (req, res) => {
        try {
            const {id} = req.params
            const {user_id, rate} = req.body
    
            const koz = await Koz.findOne({_id: id}).populate('category').populate('owner').populate('facilities').populate({
                path: 'ratings',
                populate: {
                    path: 'user'
                }
            })
            const ratings = await Rating.create({
                user: mongoose.Types.ObjectId(user_id),
                rate: rate
            })
    
            await ratings.save()
    
            koz.ratings.push(ratings._id)
    
            await koz.save()
            success(res, "Success Giving Rate to Kozzz", koz)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    getAllCategory: async (req, res) => {
        try {
            const category = await Category.find()
            success(res, "Success Get Kozzz Category", category)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    }
}