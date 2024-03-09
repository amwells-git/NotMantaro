//import schema & model from mongoose
const {Schema, model} = require('mongoose');

const userProfileSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    dailyStreak: {
        type: Number,
        default: 0,
    },
    lastDailyCollected: {
        type: Date,
        required: true,
    },
    dailySavers: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });//auto create timestamps

//export schema
module.exports = model('UserProfile', userProfileSchema);