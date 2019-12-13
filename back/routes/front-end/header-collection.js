const express = require("express")
const connection = require('../../conf')
const router = express.Router()
router.get('/', (req, res) => {
    res.send("je suis sur la route /header-collection ").status(200)
})
router.route(['/:request', '/',':id' ])  //



    .get(function (req, res, next) {
        connection.query(`SELECT * FROM header_collection_menu ORDER BY collection_menu_id ${req.params.request}`, (err, results) => {
            if (err) {
                res.status(500).send('Erreur lors de la récupération des menu header collection');
            } else {
                res.json(results);
            }
        })
    })
    .post(function (req, res) {     //http://localhost:3000/headerCollection/
        const formData = req.body;
        connection.query('INSERT INTO header_collection_menu SET ?', formData, (err, results) => {
          if (err) {
            res.status(500).send("Erreur lors de l'ajout d'un header collection menu");
          } else {
            res.sendStatus(200);
          }
        })
      })
      .delete(function (req, res) {   //http://localhost:3000/headerCollection/11
        const requestProduct = req.params.request;
        connection.query('DELETE FROM header_collection_menu  WHERE collection_menu_id=?', [requestProduct], err => {
          if (err) {
            res.status(500).send("Erreur lors de la suppression d'un header collection menu");
          } else {
            res.sendStatus(200);
          }
        });
      })
      .put(function (req, res) {   //http://localhost:3000/headerCollection/11
        const requestProduct = req.params.request;
        const formData = req.body;
        connection.query('UPDATE header_collection_menu  SET ? WHERE collection_menu_id=?', [formData, requestProduct], err => {
          if (err) {
            res.status(500).send("Erreur lors de la modification d'un header collection menu");
          } else {
            res.sendStatus(200);
          }
        })
      });
module.exports = router