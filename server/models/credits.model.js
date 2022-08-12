const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const creditsSchema = new Schema(
    {
        tokenType: {type: String, required: true},
        accNo: { type: String, required: true },
        credits: {type: Number, required: true}
    },
    {
        timestamps: true
    }
);

const Credits = mongoose.model('Credits',creditsSchema);

module.exports = Credits;