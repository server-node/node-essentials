const mongoose = require('mongoose');

const template = new mongoose.Schema({

    ticketName: {
        type: String,
        default: ''
    },
    signalEntryPrice: {
        type: [],
    },
    signalStopLoss: {
        type: Number,
    },
    targets: {
        type: [],
    },
    signalTime: {
        type: String,
    },
    signalLastCandleTime: {
        type: String,
    },
    channelName: {
        type: String,
    },
    logs: {
        type: [],
    },
    state: {
        type: String,
    },
});

module.exports = mongoose.model('template', template);