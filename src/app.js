const express = require('express')
const app = express();
const cors = require('cors');
const { json } = require('body-parser');
const port = 4002;

app.use(cors());
app.use(json());

let moistures = [];

app.get('/', (req, res) => {
    res.send(`moisture => ${moistures}`)
})

app.post('/', (req, res) => {
    const request = req.body;
    moistures.push(request.moisture);
    console.log(request);
    res.status(201).send();
})

app.delete('/', (req, res) => {
    moistures = [];
    moistures.status(200).send();
})

app.listen(port, (req, res) => {
    console.log(`server working in ${port} port`)
})
