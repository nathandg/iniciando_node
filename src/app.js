const express = require('express')
const { json } = require('body-parser')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')

const server = express()
const port = 4002

const moistureRoute = require('./routes/moistures')

server.use(json());
server.use(cors());
server.use('/moistures', moistureRoute);

server.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'))
})

//servidor será iniciado se a conexão com o DataBase, for aceita;
const main = async () => {
    await mongoose.connect('mongodb+srv://user:userpassword@cluster0.0fv5u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
}

main().then(() => {
    server.listen(port, () => {
        console.log(`server running on port ${port}`)
    })
}).catch(err => console.log(err));