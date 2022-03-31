import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CardSchema = new Schema({
    title: { type: String, required: true },
    seri: { type: String, required: true },
    code: { type: String, required: true },
}, { timestamps: true, collection: 'cards' })

export const Card = mongoose.model('cards', CardSchema)