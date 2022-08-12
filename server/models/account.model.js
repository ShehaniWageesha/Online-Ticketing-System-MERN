const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accSchema = new Schema(
    {
        accNo: { type: String, required: true },
        credit: { type: Number, required: true }
    },
    {
    timestamps: true
    });

const Account = mongoose.model('Account', accSchema);

module.exports = Account;
