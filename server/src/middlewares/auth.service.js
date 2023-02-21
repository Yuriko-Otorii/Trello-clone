const JWT = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const User = require('../models/User')
const jwtSecret = process.env.JWT_SECRET


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
    const token = JWT.sign({ id: user._id}, jwtSecret, { expiresIn: '1h' })

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


module.exports = { signUp, signIn }