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
    res.send(moistures);
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
