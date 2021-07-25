const mongoose = require('mongoose');

const ReservationEventSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organizedEvent'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    dateOfCreation: {
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
const ReservationEvent = mongoose.model('reservationEvent', ReservationEventSchema);
module.exports = ReservationEvent;