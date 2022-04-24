import mongoose from "mongoose";


const note = new mongoose.Schema({
    UserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    Title: { type: String, required: true },
    Content: { type: String, required: true },
    Private: {type:Boolean, required: true},
    Tags: { type: [String]},
    },
    {
        timestamps: true
    })
const Note = mongoose.model('note', note)

module.exports = Note