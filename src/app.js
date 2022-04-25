const express = require('express')
const { json } = require('body-parser')
const cors = require('cors')
const path = require('path')

const server = express()
const port = 4002

const moistureRoute = require('./routes/moistures')

server.use(json());
server.use(cors());
server.use('/moistures', moistureRoute);

server.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'))
})

server.listen(port, () => {
    console.log(`server running on port ${port}`)
})