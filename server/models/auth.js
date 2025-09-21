const mongoose = require("mongoose")
const { Schema, model } = mongoose

const schema = new Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    role: { type: String, enum: ['ngo', 'donor'], deafult: 'donor' }
}, { timestamps: true })

const Users = model("users", schema)
module.exports = Users