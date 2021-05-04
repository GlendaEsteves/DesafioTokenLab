const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    User.findOne({ username, password }).exec((error, user) => {
      if (error) res.status(404).send({ message: 'Usuário não encontrado' })
      else if(!user) res.status(401).send({message: 'Usuário ou senha incorretos'})
      else res.status(200).send(user);
    })
  } catch {
    res.status(500).send({ message: 'Houve um erro no servidor' });
  }
})

router.post('/create', (req, res) => {
  try {
    console.log(req.body)
    const { username, password } = req.body;
    const user = new User({
      username: username, password: password
    });

    user.save((error, newUser) => {
      if (error) res.status(400).send({message: 'Não foi possível criar o usuário'})
      else res.status(201).send(newUser)
    })
  } catch {
    res.status(500).send({ message: 'Houve um erro no servidor' });
  }
})

module.exports = router;