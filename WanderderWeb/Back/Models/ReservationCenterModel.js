const mongoose = require('mongoose');

const ReservationCenterSchema = new mongoose.Schema({
    centerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'center'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },  
    dateOfCreation: {
        type: Date,
        required:true,
    },
    dateOfReservation:{
        type: Date,
        required:true,
    },
    enddateOfReservation:{
        type: Date,
        required:true,
    },
    status:{
        type:Number,
        required:true,
    },
    nbplaces: {
        type: Number,
        required:true,
    },
    nbdays:{
        type: Number,
        required: true,
    },
    options: [{
        refItem: {type: String},
        nb: {type: Number}
    }],
    totalPrice: {
        type:Number,
        required:true
    },
    group: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    }],
    children: {
        type:Number,
        required:true

    },
    unidentified: {
        type:Number,
        required:true

    },
    facture: [{
        nameItem: {type: String},
        priceItem: {type:Number},
        nb: {type: Number}
    }]
    
});
const ReservationCenter = mongoose.model('reservationCenter', ReservationCenterSchema);
module.exports = ReservationCenter;