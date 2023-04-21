const router = require("express").Router();

const { signInController, signUpController, tokencheckController } = require('../controllers/auth.controller')

router.post("/login", signInController);
router.post("/signup", signUpController);
router.post("/tokencheck", tokencheckController);

module.exports = router
