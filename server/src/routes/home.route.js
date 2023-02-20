const router = require('express').Router()

const { getalltasksController } = require('../controllers/home.controller')


router.post('/getalltasks', getalltasksController)

module.exports = router