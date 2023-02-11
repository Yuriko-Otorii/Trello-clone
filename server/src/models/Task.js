const mongoose = require('mongoose')
const { Schema, model } = mongoose

const taskSchema = new Schema({
    taskTitle: {type: String, required: true},
    taskDescription: {type: String, required: true},
    taskComments: [{type: String, trim: true}],
    taskNote: {type: String},
    priority: {b: boolean},
    dueDate: {type: Date},
    updatedDate: {type: Date, default: Date.now}
},
{
    timestamps: true,
})  

module.exports = model('Task', taskSchema)