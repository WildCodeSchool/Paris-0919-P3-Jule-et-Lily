const express = require("express")
const connection = require('../../conf')
const router = express.Router()

router.get('/', (req, res) => {
  res.send("je suis sur la route /user ").status(200)
})

router.route('/:role')
.get(function (req, res, next) {
  connection.query(`SELECT * FROM user WHERE user_role=${req.params.role} ORDER BY user_lastname, user_firstname ASC`, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des utilisateurs');
    } else {
      res.json(results);
    }
  });
});

router.route('/:id')
// informations of user
.get((req, res) => {
  connection.query(`SELECT * FROM orders WHERE order_user_id=${req.params.id} ORDER BY order_date DESC`, (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération de l'historique du client");
    } else {
      res.json(results);
    }
  });
})
// delete user
.delete(function (req, res) { 
  connection.query(`DELETE FROM users WHERE user_id=${req.params.id}`, err => {
    if (err) {
      console.log(err);
      res.send("Erreur lors de la suppression du client").status(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router