import express from 'express'
import bodyParser from 'body-parser'
import serverless from 'serverless-http'
import auth from "../routes/auth"
import user from "../routes/user"
import card from "../routes/card"

const app = express()
const main = express.Router()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

main.get('/', (req, res) => {
    res.json({ message: 'Hello World!' })
})

app.use("/", main)
app.use("/auth", auth)
app.use("/user", user)
app.use("/card", card)
module.exports.handler = serverless(app)