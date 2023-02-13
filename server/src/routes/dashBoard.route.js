const router = require('express').Router()

const { getAllBoardsController, saveNewBoardController, saveNewTaskController } = require('../controllers/dashBoard.controller')

router.post("/getallboards", getAllBoardsController)
router.post("/saveboard", saveNewBoardController)
router.post("/savetask", saveNewTaskController)

module.exports = router