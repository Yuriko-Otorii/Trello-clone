const { getAllBoards, saveNewBoard } = require('../middlewares/dashBoard.service')

exports.getAllBoardsController = async (req, res, next) => {
    // console.log("Logined user", req.body);
    const allBoards = await getAllBoards(req.body)
    res.json(allBoards)
}

exports.saveNewBoardController = async (req, res, next) => {
  // console.log(req.body);
  await saveNewBoard(req.body)
}
