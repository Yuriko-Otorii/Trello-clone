const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose

const taskSchema = new Schema({
    taskTitle: {type: String, required: true},
    taskDescription: {type: String, required: true},
    taskComments: [{type: String, trim: true}],
    taskNote: {type: String},
    priority: {type: Schema.Types.Boolean},
    dueDate: {type: Date},
    belongedBoard: { type: SchemaTypes.ObjectId },
    updatedDate: {type: Date, default: Date.now}
},
{
    timestamps: true,
})  

module.exports = model('Task', taskSchema)