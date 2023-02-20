const { getAllTasks } = require('../middlewares/home.service')

exports.getalltasksController = async (req, res, next) => {
    try {
        const allTasks = await getAllTasks(req.body)
        res.send({ error: false, allTasks })
    } catch (error) {
        console.log(error);
    }
}