const JWT = require("jsonwebtoken")
const crypto = require("crypto")
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Token = require('../models/Token')
const {jwtSecret, salt} = require("../config/config")


const signUp = async (data) => {
    const { email } = data
    let user = await User.findOne({ email })

    if(user){
        const error = new Error("Email already exists");
        error.status = 404
        throw error
    }
    
    user = new User(data)
    const token = JWT.sign({ id: user._id }, jwtSecret)

    try {
        await user.save()
    } catch (error) {
        console.log(error);
    }

    return( data = {
        userId: user._id,
        email: user.email,
        username: user.username,
        token
    })
}

const signIn = async (email, password) => {
    let user = await User.findOne({ email })

    if(!user){
        const error = new Error("User does not exists. Please try again")
        error.status = 404
        throw error
    }

    const isValid = await bcrypt.compare(password, user.password)
    const token = JWT.sign({ id: user._id}, jwtSecret)

    if(isValid){
        return (data = {
            userId: user._id,
            email: user.email,
            username: user.username,
            token
        })
    }else{
        throw new Error("Incorrect credentials")
    }
}

// const requestResetPassword = async (email) => {
//     const user = await User.findOne({email})
//     if(!user) throw new Error("User does not exists")

//     const token = await Token.findOne({ userId: user._id })
//     if(token) await token.deleteOne()

//     const resetToken = crypto.randomBytes(32).toString("hex")
//     const hash = await bcrypt.hash(resetToken, salt)

//     await new Token({
//         userId: user._id,
//         token: hash,
//         createdAt: Date.now()
//     }).save()

//     const link = `${clientUrl}/api/auth/passwordReset?token=${resetToken}&id=${user._id}`

//     //send an email
//     sendEmail(
//         user.email,
//         "Password Reset Request",
//         { name: user.name, link },
//         "./template/requestResetPassword.handlebars"
//     )

//     return link
// }

// const resetPassword = async (userId, token, newPassword) => {
//     const passwordResetToken = await Token.findOne({ userId})

//     if(!passwordResetToken) throw new Error("Invalid entry or the password reset has expired")

//     const isValid = await bcrypt.compare(token, passwordResetToken.token)

//     if(!isValid) throw new Error("Invalid entry or the password reset has expired")

//     const hash = await bcrypt.hash(newPassword, salt)

//     await User.updateOne({ _id: userId }, { $set: { password: hash }})

//     const user = await User.findById({ _id: userId })

//     sendEmail(
//         user.email,
//         "Password Reset Successfully",
//         { name: user.name },
//         "./template/resetPassword.handlebars"
//     )

//     await passwordResetToken.deleteOne()

//     return true
// }

module.exports = {
    signUp,
    signIn,
    // requestResetPassword,
    // resetPassword
}