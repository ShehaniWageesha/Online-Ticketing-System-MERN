const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inspectionSchema = new Schema(
    {

        tokenID: {type: String, required: true},
        status: {type: String, required: true},
        date: {type: Date, required: true},
        inspectorId: {type: String, required: true}

    },
    {
        timestamps: true
    }
);

const Inspection = mongoose.model('Inspection',inspectionSchema);

module.exports = Inspection;
