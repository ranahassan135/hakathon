const express = require("express")
const Users = require("../models/auth")
const { verifyToken } = require("../middlewares/auth")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router()



const { JWT_SECRET_KEY } = process.env

const getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)


router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        if (!name || !email || !password) return res.status(400).json({ message: "Please fill all the fields" })

        const user = await Users.findOne({ email })
        if (user) return res.status(400).json({ message: "Email is already in use.", IsError: true })

        const hashedPassword = await bcrypt.hash(password, 10)
        const uid = getRandomId()
        const userData = { uid, name, email, password: hashedPassword, role }
        const newUser = new Users(userData)
        await newUser.save()
        res.status(200).json({ message: "User created successfully.", user: newUser, isError: false })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while registyering the user", error, isError: true })
    }
})


router.post("/login", async (req, res) => {
    try {
        const { email, password, role } = req.body
        const user = await Users.findOne({ email })
        if (!user) return res.status(401).json({ message: "Invalid email or password", isError: true })

        // const match = await bcrypt.compare(password, user.password)
        // if (match) {
        //     const { uid } = req
        //     const token = jwt.sign({ uid }, JWT_SECRET_KEY, { expiresIn: "7d" })
        //     res.status(200).json({ message: "User successfully login.", token, user, isError: false })
        // } else {
        //     res.status(401).json({ message: "Invalid email or password.", isError: true })
        // }
         const match = await bcrypt.compare(password, user.password)
        if (match) {
            const { uid } = user
            const token = jwt.sign({ uid }, JWT_SECRET_KEY, { expiresIn: "1d" })
            res.status(200).json({ message: "User sucessfully login,", token, user, isError: false })
        } else {
            res.status(401).json({ message: "Invalid email or password.", isError: true })
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while loging in the user.", isError: true })
    }
})

router.get("/user", verifyToken, async (req, res) => {
    try {
        const { uid } = req
        const user = await Users.findOne({ uid }).select("-password")
        if (!user) return res.status(401).json({ message: "User not found", isError: true })
        res.status(200).json({ message: "User Found", isError: false, user })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while fetching the user.", isError: true, error })
    }
})

module.exports = router