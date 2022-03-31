import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const Schema = mongoose.Schema

const CardSchema = new Schema({
    title: { type: String, required: true },
    seri: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    value: { type: Number, required: true }
}, { timestamps: true, collection: 'cards' })

export const Card = mongoose.model('cards', CardSchema)