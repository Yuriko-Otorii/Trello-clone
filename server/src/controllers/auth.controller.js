
const { signUp, signIn } = require("../middlewares/auth.service");
  
exports.signUpController = async (req, res) => {
  const signUpService = await signUp(req.body);
  return res.json(signUpService);
};
  
exports.signInController = async (req, res) => {
  const { email, password } = req.body
  const signInService = await signIn(email, password)
  return res.json(signInService)
}

exports.tokencheckController = async (req, res) => {
  console.log("Token check");
  const tokenStr = req.headers.cookie
  console.log({tokenStr});
  
}


  

  