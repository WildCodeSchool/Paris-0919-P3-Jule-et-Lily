const express = require("express")
const bcrypt = require('bcrypt')
const router = express.Router()
const passport = require("passport")
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    res.send("je suis sur la route /auth ").status(200)
  })

router.post('/', function(req, res) {
    passport.authenticate('local',(err, user, info) => { 
      const token = jwt.sign(Object.assign({}, user), 'your_jwt_secret')
      if(err) return res.status(500).json({flash: 'Erreur de connexion'})
      if (!user) return res.status(400).json({flash: 'Login ou mot de passe incorrect'})
      else {
        hashCompare = bcrypt.compareSync(info.info, user[0].user_password)
        if(hashCompare === false) return res.status(400).json({flash: 'Login ou mot de passe incorrectes', error: true})
        else return res.json({user, token, flash: 'Vous êtes connectés !', error: false})
      }
   })(req, res)
  });

  module.exports = router