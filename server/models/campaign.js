const mongoose = require("mongoose")
const { Schema, model } = mongoose
const schema = new Schema({
    cid: { type: String, rqeuired: true },
    title: { type: String, required: true },
    decsription: { type: String, required: true },
    category: { type: String, enum: ['health', 'education', 'disaster', 'others'], default: "others" },
    goalAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    image: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ['active', 'close'], required: true }
}, { timestamps: true })
const Campaigns = model("campaigns", schema)
module.exports = Campaigns
