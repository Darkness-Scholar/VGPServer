import express from 'express'
import { User, Token } from '../database/main'
import { ACCESS_TOKEN_LIFECYCLE, REFRESH_TOKEN_LIFECYCLE } from '../database/env'
import { generateToken, verifyToken, authChecking } from './shield'

const auth = express.Router()

auth.post('/login', async (req, res) => {
    let { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password })
        const accessToken = await generateToken(user, ACCESS_TOKEN_LIFECYCLE)
        const refreshToken = await generateToken(user, REFRESH_TOKEN_LIFECYCLE)
        const saveToken = await Token.create({ accessToken, refreshToken })
        res.status(200).json({ accessToken, refreshToken })
    } catch (err) {
        return res.status(500).json(err)
    }
})

auth.get('/login', async (req, res) => {
    let { token } = req.query
    // expamle: /auth/login?token=TOKEN
    res.status(200).json({ res: token })
    // try {
    //     const decode = await verifyToken(token)
    //     const user = await User.findById(decode.data._id)
    //     res.status(200).json({ decode })
    // } catch (err) {
    //     return res.status(500).json(err)
    // }
})

let refreshToken = async (req, res) => {
    const refreshTokenFromClient = req.headers["x-refresh-token"]
    if (refreshTokenFromClient) {
        try {
            await Token.findOne(refreshTokenFromClient)
            /** @var {object} decode trả về các thông tin của người dùng gồm: _id, username, email */
            const decode = await verifyToken(refreshTokenFromClient)
            const accessToken = await generateToken(decode.data, ACCESS_TOKEN_LIFECYCLE)
            res.status(200).json({ accessToken })
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).send({ message: 'Token invalid' })
    }
};


auth.post('/register', async (req, res) => {
    let { username, password, email } = req.body
    try {
        await User.create({ username, password, email })
        res.status(200).json({ message: 'success' })
    } catch (err) {
        res.status(403).json({ message: "Username hoặc Email đã tồn tại" })
    }
})

auth.get('/register', async (req, res) => {
    let { username, password, email } = req.query
    // expamle: /auth/register?username=tungxm123&password=123123&email=tungxm123@gmail.com
    try {   
        await User.create({ username, password, email }) 
        res.status(200).json({ message: 'success' })
    } catch (err) {
        res.status(403).json({ message: "Username hoặc Email đã tồn tại" })
    }
})

auth.post('/verify', async (req, res) => {
    let { token } = req.body
    try {
        let encode = await verifyToken(token)
        res.status(200).json(encode)
    } catch (err) {
        res.status(500).json(err)
    }
})

export default auth
