const { getAllBoards, saveNewBoard, saveNewTask, deleteBoard } = require('../middlewares/dashBoard.service')

exports.getAllBoardsController = async (req, res, next) => {
    const allBoards = await getAllBoards(req.body)
    res.json(allBoards)
}

exports.saveNewBoardController = async (req, res, next) => {
  await saveNewBoard(req.body)
}

exports.deleteBoardController = async (req, res, next) => {
  await deleteBoard(req.body)
}

exports.saveNewTaskController = async (req, res, next) => {
    await saveNewTask(req.body)
}
