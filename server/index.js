const express = require("express")
const connectDB = require("./config/db")
const auth = require("./routes/auth")
const campaignRoutes = require("./routes/campaign")
const cors = require("cors")
const app = express()
const fileUpload = require("express-fileupload")
require("dotenv").config()
app.use(express.json())

const corsOptions = { origin: "http://localhost:5173" }
app.use(fileUpload({ useTempFiles: true }))

app.use(cors(corsOptions))
app.use("/auth", auth)
app.use("/campaign", campaignRoutes)


const { PORT } = process.env
connectDB()

app.get("/", (req, res) => {
    const now = new Date().toISOString
    res.send(`Serrver is runing perfectly and current time is ${now}`)
})
app.listen(PORT, () => {
    console.log(`Srevr is running perfectly on ${PORT}`)
})