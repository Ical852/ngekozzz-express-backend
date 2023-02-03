const User = require('../models/User')
const Otp = require('../models/Otp')
const { success, failed } = require('../formatter')
const path = require('path')
const fs = require('fs')
const config = require('../config')
const mongoose = require('mongoose')

module.exports = {
    signUp: async (req, res) => {
        try {
            const { phone_number } = req.body
            const check = await User.findOne({phoneNumber: phone_number})

            if (!check) {
                const user = await User.create({
                    phoneNumber: phone_number
                })

                return success(res, "Success Create User", user)
            }

            return failed(res, "User Already Exist", "Not Available")
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    signIn: async (req, res) => {
        try {
            const { phone_number } = req.body
            const user = await User.findOne({phoneNumber: phone_number})
            if (!user) {
                return failed(res, "User Not Found", error)
            }

            return success(res, 'User Founded Continue to Otp', user)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    updatePhoto: async (req, res, next) => {
        try {
            if (req.file) {
                const { user_id } = req.body
                let tmp_path = req.file.path;
                let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originaExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)

                src.on('end', async () => {
                    let user = await User.findOne({ _id: user_id })

                    let currentImage = `${config.rootPath}/public/uploads/${user.image}`;
                    if (fs.existsSync(currentImage)) {
                        fs.unlinkSync(currentImage)
                    }

                    user = await User.findOneAndUpdate({
                        _id: user_id
                    }, {
                        image: filename
                    })

                    success(res, "Success Update Avatar", user)
                })

                src.on('err', async () => {
                    next(err)
                })
            }
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    update: async (req, res) => {
        try {
            const {id} = req.params
            const { full_name, location } = req.body

            const user = await User.findOne({_id: id})
            if (!user) {
                return failed(res, "User Not Found", "Not Found")
            }

            user.fullName = full_name != undefined ? full_name : user.fullName
            user.location = location != undefined ? location : user.location

            await user.save()

            success(res, 'Update User Success', user)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    fetch: async (req, res) => {
        try {
            const {id} = req.params
            const user = await User.findOne({_id: id})

            success(res, 'Success Fetch User', user)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    createOtp: async (req, res) => {
        try {
            const { user_id } = req.body
            const otp = Math.floor(Math.random() * 9999) + 1000

            const otpC = await Otp.create({
                user: mongoose.Types.ObjectId(user_id),
                otpVerif: otp
            })

            success(res, "random", otpC)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    verifOtp: async (req, res) => {
        try {
            const { user_id, otp } = req.body
            const checkOtp = await Otp.findOne({user: user_id, otpVerif: otp})

            if (!checkOtp) {
                return failed(res, "Wrong OTP", "OTP Not Found")
            }

            await checkOtp.delete()

            return success(res, "Otp Verification Success", "Success")
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    resendOtp: async (req, res) => {
        try {
            const { user_id, otp } = req.body
            const curOtp = await Otp.findOne({user: user_id, otpVerif: otp})
            if (!curOtp) {
                return failed(res, "Invalid Current OTP", "Invalid")
            }

            await curOtp.delete()
            
            const newotp = Math.floor(Math.random() * 9999) + 1000
            const otpC = await Otp.create({
                user: mongoose.Types.ObjectId(user_id),
                otpVerif: newotp
            })

            success(res, "Otp Resended Successfully", otpC)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
}