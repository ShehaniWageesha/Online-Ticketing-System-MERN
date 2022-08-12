const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const managerSchema = new Schema(
    {
        managerId: { type: String, required: true },
        name: { type: String, required: true },
        address: { type: String },
        telephone: { type: String }
    },
    {
        timestamps: true
    });

const PublicTransportManager = mongoose.model('PublicTransportManager', managerSchema);

module.exports = PublicTransportManager;
