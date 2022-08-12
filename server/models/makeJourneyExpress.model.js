const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const journeyExpressSchema = new Schema(
    {
        id: { type: String, required: true},
        accNo: { type: String, required: true },
        tokenID: {type: String, required: true},
        expressWay: {type: String, required: true},
        appFare: {type: String, required: true},
        distance: {type: Number, required: true},
        jDate: {type: Date, required: true},
        jTime: {type: Date, required: true},
        fare: {type: Number, required: true}
    },
    {
        timestamps: true
    }
);

const JourneyExpress = mongoose.model('ExpressWay',journeyExpressSchema);

module.exports = JourneyExpress;
