const express = require('express')
const { json } = require('body-parser')
const cors = require('cors')

const server = express()
const port = 4002

const moistureRoute = require('./routes/moistures')

server.use(json());
server.use(cors());
server.use('/moistures', moistureRoute);

server.listen(port, () => {
    console.log(`server running on port ${port}`)
})