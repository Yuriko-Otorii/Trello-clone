const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose

const boardSchema = new Schema({
    boardTitle: {type: String, trim: true, required: true},
    tasks: [{ type: SchemaTypes.ObjectId, ref: "Task" }],
    createdUser: { type: SchemaTypes.ObjectId, ref: "User" },
},
{
    timestamps: true,
})

module.exports = model('Board', boardSchema)