const mongoose = require("mongoose")
const { Schema, model } = mongoose

const schema = new Schema({
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
    amount: { type: Number, required: true },
}, { timestamps: true })
const Donation = model("donation", schema)
module.exports = Donation