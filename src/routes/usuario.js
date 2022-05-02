const express = require("express");
const { find } = require("../models/user");
const userRouter = express.Router();



//mongoose
const Users = require ('../models/user');


const check = [(req, res, next) => {


    Users.findOne({username: req.header('username')}).then( result => {
        const user = result.username; 
        const password = result.password;

        if (req.header('password') != password) {
            console.log("senha errada insira "+password)
            return res.status(403).send()
        }else {
            console.log("senha correta");
            next()
        }

    }).catch(err => {
        return res.status(403).send("Usuario não encontrado");
    })

}]

userRouter.get('/', check,(req, res) => {
    
    Users.find().then(result => {
        res.status(200).send(result);
    }).catch(err => {
        console.log("Error: "+err);
        res.status(500).send(err);
    })

})


//new user
userRouter.post('/', (req, res) => {
    
    const user = new Users({
        username: req.body.user,
        password: req.body.password,
        role: req.body.role
    })

    user.save().then(() => {
        res.status(200).send()
    })

})

userRouter.delete('/', (req, res) => {

    Users.deleteMany().then(result => {
        res.status(200).send()
    }).catch(err => {
        console.log("Error: "+err);
        res.status(500).send();
    })
})

module.exports = userRouter;