const Board = require('../models/Board')
const Task = require('../models/Task')

exports.saveNewBoard = async (data) => {
    const newBoard = new Board(data)
    try {
        await newBoard.save()
    } catch (error) {
        console.log(error);
    }
}

exports.getAllBoards = async (data) => {
    const allBoards = await Board.find({createdUser: data.userId})
    return allBoards
}
