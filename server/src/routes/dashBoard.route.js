const router = require('express').Router()

const {
  getAllBoardsController,
  saveNewBoardController,
  saveNewTaskController,
  deleteBoardController,
  getTaskDetailController,
  saveTaskCommentController,
  updateBoardTitleController,
  deleteTaskController,
  updateTaskController,
  updateTaskCommentController,
  deleteTaskCommentController
} = require('../controllers/dashBoard.controller')


router.post('/getallboards', getAllBoardsController)
router.post('/saveboard', saveNewBoardController)
router.post('/updateboardtitle', updateBoardTitleController)
router.post('/deleteboard', deleteBoardController)
router.post('/gettaskdetail', getTaskDetailController)
router.post('/savetask', saveNewTaskController)
router.post('/updatetask', updateTaskController)
router.post('/deletetask', deleteTaskController)
router.post('/savecomment', saveTaskCommentController)
router.post('/updatetaskcomment', updateTaskCommentController)
router.post('/deletetaskcomment', deleteTaskCommentController)

module.exports = router
