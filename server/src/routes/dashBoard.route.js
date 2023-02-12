const router = require('express').Router()

const { getAllBoardsController, saveNewBoardController } = require('../controllers/dashBoard.controller')

router.post("/getallboards", getAllBoardsController)
router.post("/saveboard", saveNewBoardController)

module.exports = router