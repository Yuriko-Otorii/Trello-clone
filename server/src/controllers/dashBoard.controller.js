const { getAllBoards, saveNewBoard, saveNewTask } = require('../middlewares/dashBoard.service')

exports.getAllBoardsController = async (req, res, next) => {
    const allBoards = await getAllBoards(req.body)
    res.json(allBoards)
}

exports.saveNewBoardController = async (req, res, next) => {
  await saveNewBoard(req.body)
}

exports.saveNewTaskController = async (req, res, next) => {
    await saveNewTask(req.body)
}
