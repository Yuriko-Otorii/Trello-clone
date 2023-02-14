const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose

const taskComentSchema = new Schema({
    postedUser: { type: SchemaTypes.ObjectId, ref: "User" },
    commentBody: {type: String, required: true},
},
{
    timestamps: true,
})

module.exports = model('TaskComment', taskComentSchema)