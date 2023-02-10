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
  
//   const resetPasswordRequestController = async (req, res, next) => {
//       const re = await requestResetPassword(req.body.email)
//       console.log(re);
  
//       return res.json({ message: "Please check your email for verification"})
//   }
  
//   const resetPasswordController = async (req, res, next) => {
//       const { userId, token, password } = req.body
//       const resetPasswordService = await resetPassword(userId, token, password)
//       return res.json(resetPasswordService)
//   }
  

  