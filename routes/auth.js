import express from 'express'
const auth = express.Router()

auth.post('/login', (req, res) => {
    res.json({ message: `Login: ${req.body.user}` })
})

auth.post('/register', (req, res) => {
    res.json({ message: `Register: ${req.body.user}` })
})

auth.post('/verify', (req, res) => {
    res.json({ message: `Verify Token` })
})

export default auth
