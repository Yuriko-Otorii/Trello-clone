const express = require('express')
const cors = require('cors')
require('dotenv').config();

const app = express()
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))


app.use("/api", (req, res) => res.json({message: "Health check"}))

const PORT = process.env.SERVER_PORT || 8000
app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`)
})