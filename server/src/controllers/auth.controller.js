const {
    signUp,
    signIn
  } = require("../middlewares/auth.service");
  
exports.signUpController = async (req, res, next) => {
  const signUpService = await signUp(req.body);
  return res.json(signUpService);
};
  
exports.signInController = async (req, res, next) => {
  const { email, password } = req.body
  const signInService = await signIn(email, password)

  return res.json(signInService)
}

  

  