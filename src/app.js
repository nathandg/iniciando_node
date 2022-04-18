const express = require('express')
const app = express();
const cors = require('cors');
const { json } = require('body-parser');
const port = 4002;

app.use(cors());
app.use(json());

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.listen(port, (req, res) => {
    console.log(`server working in ${port} port`)
})
