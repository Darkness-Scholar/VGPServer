import { Card } from '../database/main'
import { verifyToken } from "./shield"
import express from 'express'
const card = express.Router()

card.post('/add', async (req, res) => {
    const { title, seri, code, value } = req.body
    /** @const {value} ! must be parse to number **/ let i = Number(value)
    try {
        await Card.create({ title, seri, code, value: i })
        res.status(200).json({ message: "Add card success" })
    } catch (err) {
        return res.status(500).json({ err, message: "Thẻ đã tồn tại" })
    }
})

card.get('/add/:title/:seri/:code/:value/:sign', async (req, res) => {
    const { title, seri, code, value, sign } = req.params
    /** @var {value} ! must be parse to number **/ let i = Number(value)
    try {
        let token = await verifyToken(sign)
        await Card.create({ title, seri, code, value: i })
        res.status(200).json({ message: "Add card success" })
    } catch (err) {
        res.status(500).json({ err })
    }
})

card.post('/buy', async (req, res) => {
    let { title, value } = req.body
    try {
        let card = await Card.findOne({ title, value })
        let cardData = { seri:card.seri, code: card.code, value:card.value }
        await Card.findByIdAndDelete(card._id)
        res.status(200).json({ message: `Succes: Buy ${value}k ${title}`, cardData })
    } catch (err) {
        res.status(500).json({ message: "Hết hàng" })
    }
})

card.get('/buy/:title/:value/:sign', async (req, res) => {
    if (req.params.sign === "xp9a11090955") {
        try {
            let card = await Card.findOne({ title:req.params.title, value:req.params.value })
            let cardData = { seri:card.seri, code: card.code, value:card.value }
            await Card.findByIdAndDelete(card._id)
            res.status(200).json( cardData )
        } catch (err) {
            res.status(500).json({ message: "Hết hàng" })
        }
    } else return res.status(500).json({ message: "Signature is not valid" })
})

card.get("/get/:title", async (req, res) => {
    let { title } = req.params
    try {
        let cards = await Card.find({ title })
        res.status(200).json({ message: `Success: Get ${title} cards`, cards })
    } catch (err) {
        res.status(500).json({ message: `Failure: Get ${title} cards`, err })
    }
})

export default card