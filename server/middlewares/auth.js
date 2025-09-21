const jwt = require("jsonwebtoken")
const { JWT_SECRET_KEY } = process.env


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]
    if (!token) { return res.status(401).json({ message: "Acess token missing." }) }

    jwt.verify(token, JWT_SECRET_KEY, async (error, result) => {
        if (!error) {
            req.uid = result.uid
            next()
        } else {
            console.error(error)
            res.status(401).json({ message: "Unauthorize or user does not have acess.", isError: true })
        }
    })
}
module.exports = { verifyToken }