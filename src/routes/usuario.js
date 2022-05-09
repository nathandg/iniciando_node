const express = require("express");
const { find } = require("../models/user");
const userRouter = express.Router();

const jwt = require("jsonwebtoken");
const SECRET = "caio";

//mongoose
const Users = require("../models/user");


//middleware, verificar o token para acessar
function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"];
    jwt.verify(token, SECRET, (err, decoded) => {
        if(err){
            return  res.status(401).send()
        }

        req.userId = decoded.userId;
        next()
    })

}


//middleware, verifica a senha com o dataBase e gera um JWT
const check = [
  (req, res, next) => {
    Users.findOne({ username: req.header("username") })
      .then((result) => {
        const user = result.username;
        const password = result.password;
        const userId = result._id;

        if (req.header("password") != password) {
          console.log("senha errada insira " + password);
          return res.status(403).send();
        } else {
          console.log("senha correta");

          const token = jwt.sign({ userId: userId }, SECRET, { expiresIn: 30 });
          return res.json({ auth: true, token });

          next();
        }
      })
      .catch((err) => {
        return res.status(403).send("Usuario não encontrado");
      });
  },
];

//Logar
userRouter.post("/login", check, (req, res) => {
    res.status(200).send('Logado');
});

//teste acesso
userRouter.get('/teste', verifyJWT, (req, res) => {
    
    console.log(req.userId + 'fez esta chamada!\n')

    Users.find().then(result => {
        res.status(200).send(result);
    }).catch(err => {
        console.log("Error: "+err);
        res.status(500).send(err);
    })

})


//criar novo user
userRouter.post("/", (req, res) => {
  const user = new Users({
    username: req.body.user,
    password: req.body.password,
    role: req.body.role,
  });

  user.save().then(() => {
    res.status(200).send();
  });
});


//deletar todos users
userRouter.delete("/", (req, res) => {
  Users.deleteMany()
    .then((result) => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log("Error: " + err);
      res.status(500).send();
    });
});

module.exports = userRouter;
