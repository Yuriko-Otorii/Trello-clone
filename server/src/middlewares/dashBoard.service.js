const Board = require('../models/Board')
const Task = require('../models/Task')

exports.getAllBoards = async (data) => {
    const allBoards = await Board.find({createdUser: data.userId}).populate("tasks")
    return allBoards
}

exports.saveNewBoard = async (data) => {
    const newBoard = new Board(data)
    try {
        await newBoard.save()
    } catch (error) {
        console.log(error);
    }
}

exports.saveNewTask = async (data) => {
    const newTask = new Task(data)
    
    try {
        const response = await newTask.save()
        await Board.findOneAndUpdate({id_: data.belongedBoard}, {"$push": {tasks: response._id}}, { new: true })
    } catch (error) {
        console.log(error);
    }
}