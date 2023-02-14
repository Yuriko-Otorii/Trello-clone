const router = require('express').Router()

const {
  getAllBoardsController,
  saveNewBoardController,
  saveNewTaskController,
  deleteBoardController,
  getTaskDetailController
} = require('../controllers/dashBoard.controller')


router.post('/getallboards', getAllBoardsController)
router.post('/saveboard', saveNewBoardController)
router.post('/deleteboard', deleteBoardController)
router.post('/gettaskdetail', getTaskDetailController)
router.post('/savetask', saveNewTaskController)

module.exports = router
