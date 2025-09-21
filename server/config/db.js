const mongoose = require("mongoose")
require("dotenv").config()


const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env

const connectDB = () => {
    mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.siz5hzt.mongodb.net/`)
        .then(() => {
            console.log("MongoDB connected successfully")
        })
        .catch((error) => {
            console.log(error)
            console.log("MongoDB not conncted")
        })
}
module.exports = connectDB