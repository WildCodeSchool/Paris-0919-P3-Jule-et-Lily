const express = require("express")
const connection = require('../../conf')

const router = express.Router()

router.get('/', (req, res) => {
  res.send("je suis sur la route /collection ").status(200)
})

router.get('/all/:request', (req, res) => {
    connection.query(`SELECT * FROM collection ORDER BY collection_name ${req.params.request}`, (err, results) => {
        if (err) {
          res.status(500).send('Erreur lors de la récupération des collections');
        } else {
          res.json(results);
        }
      });
  })


router.route(['/:id','/'])
  .get(function (req, res) {
    connection.query(`SELECT * FROM collection WHERE collection_id = ${req.params.id}`, (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération d'une collection");
      } else {
        res.json(results);
      }
    });
  })
  .post(function (req, res) {
    const formData = req.body;
    connection.query('INSERT INTO collection SET ?', formData, (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de l'ajout d'une collection");
      } else {
        res.sendStatus(200);
      }
    });
  })
  .put(function (req, res) {
    const formData = req.body;
    connection.query(`UPDATE collection SET ? WHERE collection_id= ${req.params.id}`, [formData], err => {
      if (err) {
        res.status(500).send("Erreur lors de la modification d'une collection");
      } else {
        res.sendStatus(200);
      }
    });
  })
  .delete(function (req, res) {
    connection.query(`DELETE FROM collection WHERE collection_id= ${req.params.id}`, err => {
      if (err) {
        res.status(500).send("Erreur lors de la suppression d'une collection");
      } else {
        res.sendStatus(200);
      }
    });
  });

module.exports = router
