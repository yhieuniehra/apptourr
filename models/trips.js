const mongoose = require('mongoose');


const tripSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    image: {
        type: String,  // URL to the image
        required: false
    }
});

// Tạo model 
const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;