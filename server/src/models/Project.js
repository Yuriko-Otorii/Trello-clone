const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose

const projectSchema = new Schema({
    projectTitle: {type: String, trim: true, required: true},
    boards: [{ type: SchemaTypes.ObjectId, ref: "Board" }],
    createdUser: { type: SchemaTypes.ObjectId, ref: "User" },
},
{
    timestamps: true,
})

module.exports = model('Project', projectSchema)