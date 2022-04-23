const express = require('express')
const app = express();
const cors = require('cors');
const { json } = require('body-parser');
const port = 4002;

app.use(cors());
app.use(json());

let dummyCount = 0;
let moistures = [];

app.get('/', (req, res) => {
    res.status(200).send(moistures);
})

/*
    parameter:
    app.get('/:id')
    const id = req.params.id
    forma de passar na url: http://localhost:4002/1

    query:
    app.get('/')
    const id = req.query.id
    forma de passar na url: http://localhost:4002/?id=1

*/


app.get('/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    const moistureById = moistures.filter(temperature => temperature.id == id);
    console.log("buscando");
    console.log(moistureById);
    res.status(200).send(moistureById);
})

app.post('/', (req, res) => {
    
    const request = req.body;
    
    //created obj
    const moisturesObj = {

        id: dummyCount += 1,
        moisture: request.moisture
    }
    console.log(moisturesObj);
    moistures.push(moisturesObj);
    res.status(201).send();
})

app.delete('/', (req, res) => {
    moistures = [];
    res.status(200).send();
})

app.put('/:value', (req, res) => {
    const value = req.params.value
    const id = req.query.id
    console.log(`QUERY IS ${id} AND PARAMETER IS ${value}`)
    
    moistures.map(moisture => {
         if(moisture.id == id){
             console.log(`FOUND ID ${id} CHANGING VALUE OF OBJECT`)
             moisture.moisture = parseInt(value);
         }
     });

    res.status(200).send()
})

app.listen(port, (req, res) => {
    console.log(`server working in ${port} port`)
})
