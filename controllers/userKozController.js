const UserKoz = require('../models/UserKoz')
const Owner = require('../models/Owner')
const { success, failed } = require('../formatter')

module.exports = {
    getUserKozByUserId: async (req, res) => {
        try {
            const {id} = req.params
            const userkoz = await UserKoz.find({user: id}).populate('user').populate({
                path: 'koz',
                populate: [
                    {
                        path: 'facilities',
                    },
                    {
                        path: 'ratings',
                        populate: {
                            path: 'user'
                        }
                    },
                    {
                        path: 'owner',
                    },
                ],
            })

            success(res, "Success Get User Kozzz Data", userkoz)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    },
    getOwnerKoz: async (req, res) => {
        try {
            const {id} = req.params
            const owner = await Owner.find({user: id}).populate('user').populate({
                path: 'koz',
                populate: [
                    {
                        path: 'facilities',
                    },
                    {
                        path: 'ratings',
                        populate: {
                            path: 'user'
                        }
                    },
                    {
                        path: 'owner',
                    },
                ],
            })

            success(res, "Success Get Owner Kozzz Data", owner)
        } catch (error) {
            failed(res, "Internal Server Error", error)
        }
    }
}