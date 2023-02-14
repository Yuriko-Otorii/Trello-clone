const Board = require('../models/Board')
const Task = require('../models/Task')

exports.getAllBoards = async (data) => {
    return await Board.find({createdUser: data.userId}).populate("tasks")
     
}

exports.saveNewBoard = async (data) => {
    const newBoard = new Board(data)
    try {
        await newBoard.save()
    } catch (error) {
        console.log(error);
    }
}

exports.deleteBoard = async (data) => {
    try {
        await Board.deleteOne({_id: data.boardId })
    } catch (error) {
        console.log(error);
    }
}

exports.getTaskDetail = async (data) => {
    try {
        return await Task.findOne({_id: data.taskId})
    } catch (error) {
        console.log(error);
    }
}

exports.saveNewTask = async (data) => {
    const newTask = new Task(data)
    
    try {
        const response = await newTask.save()
        await Board.findOneAndUpdate({_id: data.belongedBoard}, {"$push": {tasks: response._id}}, { new: true })
    } catch (error) {
        console.log(error);
    }
}