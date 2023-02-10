const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('express-async-errors');

require('./src/utils/mongodb')
const authRoute = require('./src/routes/auth.route');

const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use("/api", (req, res) => res.json({message: "Health check"}))
app.use('/auth', authRoute)


app.use((req, res, next) => {
    const err = new Error("Route not found")
    err.status = 404
    next(err)
})

app.use((error, req, res) => {
    res.status(error.status || 500).json({ error: error.message })
})


const PORT = process.env.SERVER_PORT || 8000
app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`)
})