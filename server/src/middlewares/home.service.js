const Board = require("../models/Board")
const Project = require("../models/Project")


exports.getAllTasks = async (data) => {
    try {
        const allTasks = []
        const homeTasks = {}
        const allProjects = await Project.find({createdUser: data.userId}).lean()
        if(allProjects){
             await Promise.all(allProjects.map(async (eachProject) => {
                const eachProjectWithBoardIds = await Project.findOne({_id: eachProject._id}).lean()
                if(eachProjectWithBoardIds){
                    await Promise.all(eachProjectWithBoardIds.boards.map(async (eachBoardId) => {
                        const eachBoardWithTaskDetail = await Board.findOne({_id: eachBoardId}).populate("tasks").lean()
                        eachBoardWithTaskDetail.tasks.forEach(eachTask => {
                            eachTask.projectId = eachProject._id
                            allTasks.push(eachTask)
                        })
                    }))
                }
            }))      

            const today = new Date()         
            const weekAhead = new Date(new Date().setDate(new Date().getDate() + 7)) 
    
            //Find due today
            const dueTodayTasks = allTasks.filter(eachTask => {
                const dueDate = new Date(eachTask.dueDate).toDateString()
                return dueDate === today.toDateString()
            })
            //Find high priority
            const highPriorityTasks = allTasks.filter(eachTask => eachTask.priority)

            homeTasks.dueToday = dueTodayTasks
            homeTasks.highPriority = highPriorityTasks

            return homeTasks
        }
        
       

    } catch (error) {
        console.log(error);
    }
}