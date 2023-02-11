const mongoose = require('mongoose')
const { Schema, model } = mongoose

const boardSchema = new Schema({
    boardTitle: {type: String, trim: true, required: true},
    tasks: [{ type: ObjectId }],
    createdUser: [{ type: ObjectId }],
    authedUser: [{ type: ObjectId }],
},
{
    timestamps: true,
})

module.exports = model('Board', boardSchema)