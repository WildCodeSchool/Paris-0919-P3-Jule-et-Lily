const express = require("express")
const connection = require('../../conf')

const router = express.Router()

router.get('/', (req, res) => {
  res.send("je suis sur la route /category ").status(200)
})

router.get('/all/:request', (req, res) => {
  connection.query(`SELECT * FROM category ORDER BY category_name ${req.params.request}`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des categories');
      } else {
        res.json(results);
      }
    });
})


router.route(['/:id', '/'])
.get(function (req, res) {
  connection.query(`SELECT * FROM category WHERE category_id = ${req.params.id}`, (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération d'une catégorie");
    } else {
      res.json(results);
    }
  });
})
  .post(function (req, res) {
    const formData = req.body;
    connection.query('INSERT INTO category SET ?', formData, (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de l'ajout d'une categorie");
      } else {
        res.sendStatus(200);
      }
    });
  })
.put(function (req, res) {
  const formData = req.body;
  connection.query(`UPDATE category SET ? WHERE category_id = ${req.params.id}`, [formData], err => {
    if (err) {
      res.status(500).send("Erreur lors de la modification d'une categorie");
    } else {
      res.sendStatus(200);
    }
  });
})
.delete(function (req, res) {
  connection.query(`DELETE FROM category WHERE category_id = ${req.params.id}`, err => {
    if (err) {
      res.status(500).send("Erreur lors de la suppression d'une categorie");
    } else {
      res.sendStatus(200);
    }
  });
});


module.exports = router
