const router = require('express').Router()

const {
  getAllBoardsController,
  saveNewBoardController,
  saveNewTaskController,
  deleteBoardController,
  getTaskDetailController,
  saveTaskCommentController
} = require('../controllers/dashBoard.controller')


router.post('/getallboards', getAllBoardsController)
router.post('/saveboard', saveNewBoardController)
router.post('/deleteboard', deleteBoardController)
router.post('/gettaskdetail', getTaskDetailController)
router.post('/savetask', saveNewTaskController)
router.post('/savecomment', saveTaskCommentController)

module.exports = router
