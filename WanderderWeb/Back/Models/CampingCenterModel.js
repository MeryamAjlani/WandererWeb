const mongoose = require('mongoose')

const CenterSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth'
    },
    name:{
        type :String,
        required:true
    },

    picture:{
        type:String,
        required: true
    },

    city: {
        type: String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    numbRating:{
        type:Number,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    location: {
        type: { type: String },
        coordinates: [Number],
    },
    status: {
        type: Boolean,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})
const CampingCenter = mongoose.model('center', CenterSchema);
module.exports = CampingCenter;