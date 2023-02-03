const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const facilitySchema = new mongoose.Schema({
    icon : {
        type : String,
        required : true
    },
    title : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Facility', facilitySchema)