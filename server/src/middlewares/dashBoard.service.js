const User = require('../models/User')
const Board = require('../models/Board')
const Task = require('../models/Task')
const TaskComment = require('../models/TaskComment')

exports.getAllBoards = async (data) => {
    return await Board.find({createdUser: data.userId}).populate("tasks")
     
}

exports.saveNewBoard = async (data) => {
    try {
        const newBoard = new Board(data)
        await newBoard.save()
    } catch (error) {
        console.log(error);
    }
}

exports.updateBoardTitle = async (data) => {
    try {
        const targetBoard = await Board.findById(data.boardId)
        targetBoard.boardTitle = data.boardTitle
        await targetBoard.save()
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
        const taskWithCommentRef = await Task.findOne({_id: data.taskId}).populate("taskComments").lean()
        const taskCommentwithUserInfo = await Promise.all(taskWithCommentRef.taskComments.map(async (eachTaskComment) => {
            const userDetail = await User.findOne({_id: eachTaskComment.postedUser}).lean()
            return {...eachTaskComment, username: userDetail.username, userId: userDetail._id}
        }))
        taskWithCommentRef.taskComments = taskCommentwithUserInfo
        return taskWithCommentRef
    } catch (error) {
        console.log(error);
    }
}

exports.saveNewTask = async (data) => {
    try {
        const newTask = new Task(data)
        const response = await newTask.save()
        await Board.findOneAndUpdate({_id: data.belongedBoard}, {"$push": {tasks: response._id}}, { new: true })
    } catch (error) {
        console.log(error);
    }
}

exports.updateTask = async (data) => {
    try {
        const targetTask = await Task.findById(data.taskId)
        targetTask.taskTitle = data.taskTitle
        targetTask.taskDescription = data.taskDescription
        targetTask.dueDate = data.dueDate
        targetTask.priority = data.isChecked
        await targetTask.save()
    } catch (error) {
        console.log(error);
    }
}

exports.deleteTask = async (data) => {
    try {
        await Task.deleteOne({_id: data.taskId })
    } catch (error) {
        console.log(error);
    }
}

exports.saveTaskComment = async (data) => {
    try {
        const newTaskComment = new TaskComment(data)
        const response = await newTaskComment.save()
        await Task.findOneAndUpdate({_id: data.belongedTask}, {"$push": {taskComments: response._id}}, { new: true })
    } catch (error) {
        console.log(error);
    }
}

exports.updateTaskComment = async (data) => {
    try {
        const targetTaskComment = await TaskComment.findById(data.taskCommentId)
        targetTaskComment.commentBody = data.taskCommentBody
        await targetTaskComment.save()
    } catch (error) {
        console.log(error);
    }
}

exports.deleteTaskComment = async (data) => {
    try {
        await TaskComment.deleteOne({_id: data.tasCommentkId })
        await Task.findOneAndUpdate({_id: data.taskId}, {"$pull": {taskComments: data.tasCommentkId}})
    } catch (error) {
        console.log(error);
    }
}