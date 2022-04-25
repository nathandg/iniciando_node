//Imports and configs
const express = require("express");
const router = express.Router()

const expressValidator = require('express-validator')

let dummyCount = 0;
let moistures = [];

//define o que será validado como ".check" verifica se há temperature, ".isLength" verifica se não é nulo e ".withMessage" menssagem de erro.

const validate = [
    expressValidator.check('moisture').isLength({min: 1}).withMessage('Field temperature can not be null')
]

//Routes

//requisição do array moisture
router.get('/', (req, res) => {
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

//requisição de moisture por id
router.get('/:id', (req, res) => {
    const id = req.params.id
    const moistureById = moistures.filter(temperature => temperature.id == id);
    res.status(200).send(moistureById);
})

//requisição adicionar dados de moisture
router.post('/', [validate],(req, res) => {
    
    
    const erros = expressValidator.validationResult(req);
    if(!erros.isEmpty()){
        return res.status(422).send({erros: erros.array()})
    }
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

//deletar moisture
router.delete('/', (req, res) => {
    moistures = [];
    res.status(200).send();
})

router.put('/:value', (req, res) => {
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

module.exports = router