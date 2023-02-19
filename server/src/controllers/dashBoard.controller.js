const {
  getAllBoards,
  saveNewBoard,
  saveNewTask,
  deleteBoard,
  getTaskDetail,
  saveTaskComment,
  updateBoardTitle,
  deleteTask,
  updateTask,
  updateTaskComment,
  deleteTaskComment,
  updateTaskOrder,
  updateTaskOrderBetween,
  updateBoardOrder,
  saveNewProject,
  getAllProject
} = require('../middlewares/dashBoard.service')

exports.getAllBoardsController = async (req, res, next) => {
  try {
    const allProjects = await getAllProject(req.body)
    const allBoards = await getAllBoards(req.body)
    return res.send({ error: false, allBoards, allProjects })
  } catch (error) {
    console.log(error)
  }
}

exports.saveNewBoardController = async (req, res, next) => {
  try {
    await saveNewBoard(req.body)
    return res.send({ error: false })
  } catch (error) {
    console.log(error)
  }
}

exports.updateBoardTitleController = async (req, res, next) => {
  try {
    await updateBoardTitle(req.body)
    return res.send({ error: false })
  } catch (error) {
    console.log(error)
  }
}

exports.deleteBoardController = async (req, res, next) => {
  try {
    await deleteBoard(req.body)
    return res.send({ error: false })
  } catch (error) {
    console.log(error)
  }
}

exports.getTaskDetailController = async (req, res, next) => {
  try {
    const taskDetail = await getTaskDetail(req.body)
    return res.send({ error: false, taskDetail })
  } catch (error) {
    console.log(error)
  }
}

exports.saveNewTaskController = async (req, res, next) => {
  try {
    await saveNewTask(req.body)
    return res.send({ error: false })
  } catch (error) {
    console.log(error)
  }
}

exports.updateTaskController = async (req, res, next) => {
  try {
    await updateTask(req.body)
    return res.send({ error: false })
  } catch (error) {
    console.log(error)
  }
}

exports.deleteTaskController  = async (req, res, next) => {
  try {
    await deleteTask(req.body)
    return res.send({ error: false })
  } catch (error) {
    console.log(error)
  }
}

exports.saveTaskCommentController = async (req, res, next) => {
  try {
    await saveTaskComment(req.body)
    return res.send({ error: false })
  } catch (error) {
    console.log(error)
  }
}

exports.updateTaskCommentController = async (req, res, next) => {
  try {
    await updateTaskComment(req.body)
    return res.send({ error: false })
  } catch (error) {
    console.log(error)
  }
}

exports.deleteTaskCommentController = async (req, res, next) => {
  try {
    await deleteTaskComment(req.body)
    return res.send({ error: false })
  } catch (error) {
    console.log(error)
  }
}

exports.updateTaskOrderController  = async (req, res, next) => {
  try {
    await updateTaskOrder(req.body)
    return res.send({ error: false })
  } catch (error) {
    console.log(error)
  }
}

exports.updateTaskOrderBetweenController  = async (req, res, next) => {
  try {
    await updateTaskOrderBetween(req.body)
    return res.send({ error: false })
  } catch (error) {
    console.log(error)
  }
}

exports.updateBoardOrderController  = async (req, res, next) => {
  try {
    await updateBoardOrder(req.body)
    return res.send({ error: false })
  } catch (error) {
    console.log(error)
  }
}

exports.saveNewProjectController = async (req, res, next) => {
  try {
    await saveNewProject(req.body)
    return res.send({ error: false })
  } catch (error) {
    
  }
}