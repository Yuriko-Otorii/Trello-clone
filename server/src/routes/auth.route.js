const router = require("express").Router();

const { signInController, signUpController, checkTokenController } = require('../controllers/auth.controller')

router.post("/login", signInController);
router.post("/signup", signUpController);

module.exports = router
