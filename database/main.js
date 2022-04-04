import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect("mongodb+srv://tungxm123:123qwe@cluster0.vtigv.mongodb.net/appData", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const Schema = mongoose.Schema

const CardSchema = new Schema({
    title: { type: String, required: true },
    value: { type: Number, required: true },
    price: { type: Number, required: true },
    code: { type: String, required: true, unique: true },
    seri: { type: String, required: true, unique: true },
    
}, { timestamps: true, collection: 'cards' })

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    amount: { type: Number, required: true, default: 0 }
}, { timestamps: true, collection: 'users' })

const TokenSchema = new Schema({
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true }
}, { timestamps: true, collection: 'tokens' })

export const Card = mongoose.model('cards', CardSchema)
export const User = mongoose.model('users', UserSchema)
export const Token = mongoose.model('tokens', TokenSchema)