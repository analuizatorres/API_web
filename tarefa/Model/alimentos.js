const mongoose = require('mongoose');

const alimentoSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    expirationDate: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('alimentos', alimentoSchema);