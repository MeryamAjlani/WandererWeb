const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth'
    },
    name:{
        type:String
    },
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    phoneNumber:{
        type:Number,
    },
    city: {
        type: String,
    },
    cin: {
        type: Number,
    },
    img: {
        type: String
    }
});
const User = mongoose.model('user', UserSchema);
module.exports = User;