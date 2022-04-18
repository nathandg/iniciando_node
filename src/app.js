const express = require('express')
const app = express();
const port = 4002;

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.listen(port, (req, res) => {
    console.log(`server working in ${port} port`)
})