const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const digitalTokenSchema = new Schema(
    {
        tokenID: {type: String, required: true},
        tokenType: {type: String, required: true},
        accNo: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const DigitalToken = mongoose.model('DigitalToken',digitalTokenSchema);

module.exports = DigitalToken;
