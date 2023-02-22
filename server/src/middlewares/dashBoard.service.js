const User = require('../models/User')
const Board = require('../models/Board')
const Task = require('../models/Task')
const TaskComment = require('../models/TaskComment')
const Project = require('../models/Project')

exports.getAllProject = async (data) => {
    return await Project.find({createdUser: data.userId})
}

exports.getAllBoards = async (data) => {
    const fetchProjectwithBoards = await Project.findOne({_id: data.projectId}).populate("boards").lean()
    if(fetchProjectwithBoards){
        const fetchBoardsWithTasks = await Promise.all(fetchProjectwithBoards.boards.map(async (eachBoardId) => {
            const boradWithTasks = await Board.findOne({_id: eachBoardId}).populate("tasks").lean()
            return boradWithTasks
        }))
        fetchProjectwithBoards.boards = fetchBoardsWithTasks
    }

    if(data.selectedValue){
        const today = new Date()         
        const weekAhead = new Date(new Date().setDate(new Date().getDate() + 7))            
        if(data.selectedValue === "priority"){
            fetchProjectwithBoards.boards.map(eachBoard => {
                const newTaskList = eachBoard.tasks.filter(eachTask => eachTask.priority)
                return eachBoard.tasks = newTaskList                
            })
            return fetchProjectwithBoards

        }else if(data.selectedValue === "dueToday"){
            fetchProjectwithBoards.boards.map(eachBoard => {
                const newTaskList = eachBoard.tasks.filter(eachTask => {
                    const dueDate = new Date(eachTask.dueDate).toDateString()
                    return dueDate === today.toDateString()
                })
                return eachBoard.tasks = newTaskList
            })
            return fetchProjectwithBoards

        }else if(data.selectedValue === "dueThisWeek"){
            fetchProjectwithBoards.boards.map(eachBoard => {
                const newTaskList = eachBoard.tasks.filter(eachTask => {
                    const dueDate = new Date(eachTask.dueDate)
                    if(today.toDateString() === dueDate.toDateString()){
                        return eachTask
                    }
                    return dueDate >= today && dueDate <= weekAhead
                })
                return eachBoard.tasks = newTaskList
            })
            return fetchProjectwithBoards
        }else if(data.selectedValue === "all"){
            return fetchProjectwithBoards
        }
    }else{
        return fetchProjectwithBoards
    }

}

exports.saveNewBoard = async (data) => {
    try {
        const newBoard = new Board(data)
        const response = await newBoard.save()
        await Project.findOneAndUpdate({_id: data.projectId}, {"$push": {boards: response._id}}, { new: true })
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
        const targetBoard = await Board.findOne({_id: data.boardId}).lean()
        if(targetBoard){
            await Promise.all(targetBoard.tasks.map(async (eachTask) => {
                const targetTask = await Task.findOne({ _id: eachTask })
                if(targetTask){
                    await Promise.all(targetTask.taskComments.map(async (eachComment) => {
                        await TaskComment.deleteOne({ _id: eachComment })
                    }))
                }
                await Task.deleteOne({ _id: eachTask })
            }))
        }
        await Board.deleteOne({_id: data.boardId })
        await Project.findOneAndUpdate({_id: data.projectId}, {"$pull": {boards: data.boardId}})
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
        const targetTask = await Task.findOne({ _id: data.taskId })
        if(targetTask){
            await Promise.all(targetTask.taskComments.map(async (eachComment) => {
                await TaskComment.deleteOne({_id: eachComment })
            }))
        }
        await Task.deleteOne({ _id: data.taskId })
        await Board.findOneAndUpdate({_id: data.boardId}, {"$pull": {tasks: data.taskId}})
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

exports.updateTaskOrder = async (data) => {
    try {
        await Board.findOneAndUpdate({_id: data.boardId}, { $set: { tasks: data.newTaskList }})
    } catch (error) {
        console.log(error);
    }
}

exports.updateTaskOrderBetween = async (data) => {
    try {
        await Board.findOneAndUpdate({_id: data.startBoardId}, { $set: { tasks: data.startTaskList }})
        await Board.findOneAndUpdate({_id: data.endBoardId}, { $set: { tasks: data.endTaskList }})
    } catch (error) {
        console.log(error);
    }
}

exports.updateBoardOrder = async (data) => {
    try {
        await Project.findOneAndUpdate({_id: data.projectId}, { $set: { boards: data.newBoardList }})
    } catch (error) {
        console.log(error);
    }
}

exports.saveNewProject = async (data) => {
    try {
        const newProject = new Project(data)
        const createdProject = await newProject.save()
        return createdProject
    } catch (error) {
        console.log(error);
    }
}

exports.deleteProject = async (data) => {
    try {
        const targetProject = await Project.findOne({_id: data.projectId}).lean()
        if(targetProject){
            await Promise.all(targetProject.boards.map(async (eachBoard) => {
                const targetBoard = await Board.findOne({ _id: eachBoard })
                if(targetBoard){
                    await Promise.all(targetBoard.tasks.map(async (eachTask) => {
                        const targetTask = await Task.findOne({ _id: eachTask })
                        if(eachTask){
                            await Promise.all(targetTask.taskComments.map(async (eachComment) => {
                                await TaskComment.deleteOne({ _id: eachComment })
                            }))
                        }
                        await Task.deleteOne({ _id: eachTask })
                    }))
                }
                await Board.deleteOne({ _id: eachBoard })
            }))
        }
        await Project.deleteOne({ _id: data.projectId })

    } catch (error) {
        console.log(error);
    }
}
