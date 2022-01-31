const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    cardid: Number,
    title:  {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    duration: {
        type: String,
        trim: true,
        required: true
    },
    genre: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String
    }
    }, {
    timestamps: true
});

var Card =module.exports = mongoose.model('card', CardSchema);
module.exports.get = function (callback, limit) {
    Card.find(callback).limit(limit);
}

// const Card = mongoose.model('card', CardSchema); //convert to model named Tea
// module.exports = Card

