const mongoose = require('mongoose')
const Board = require('./Board')
const { Schema, model, SchemaTypes } = mongoose

const taskSchema = new Schema({
    taskTitle: {type: String, required: true},
    taskDescription: {type: String, required: true},
    taskComments: [{type: SchemaTypes.ObjectId, ref: "User"}],
    taskNote: {type: String},
    priority: {type: Schema.Types.Boolean},
    dueDate: {type: Date},
    belongedBoard: { type: SchemaTypes.ObjectId, ref: "Board" },
    createdUser: { type: SchemaTypes.ObjectId, ref: "User" },
    updatedDate: {type: Date, default: Date.now}
},
{
    timestamps: true,
})  

module.exports = model('Task', taskSchema)