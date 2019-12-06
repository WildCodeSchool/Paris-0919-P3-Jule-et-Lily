const express = require("express")
const connection = require('../../conf')
const router = express.Router()

router.get('/', (req, res) => {
  res.send("je suis sur la route /user ").status(200)
})


router.route('/:role')
  .get(function (req, res) {
    connection.query(`SELECT * FROM user WHERE user_role=${req.params.role} ORDER BY user_lastname, user_firstname ASC`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
      } else {
        res.json(results);
      }
    });
  })

module.exports = router
