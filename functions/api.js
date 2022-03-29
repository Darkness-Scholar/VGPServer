const express = require('express')
const serverless = require('serverless-http')
const app = express()
const router = express.Router()

router.get('/', (req, res) => {
    res.json({ admin: "Tung Hwang", msg: "Hello world" })
})

router.get('/user', (req, res) => {
    res.json({ admin: "Tung Hwang", age: "23" })
})

app.use("/", router)

module.exports.handler = serverless(app)