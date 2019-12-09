const express = require("express")
const connection = require('../../conf')
const router = express.Router()
router.get('/', (req, res) => {
    res.send("je suis sur la route /image-slider ").status(200)
})
router.route(['/:request', '/', ':id' ])
    .get(function (req, res, next) {   //http://localhost:3000/image-slider/asc
        connection.query(`SELECT * FROM image ORDER BY image_id ${req.params.request}`, (err, results) => {
          if (err) {
            res.status(500).send('Erreur lors de la récupération des images du slider');
          } else {
            res.json(results);
          }
        })
      })
      .post(function (req, res) {   //http://localhost:3000/image-slider/
        const formData = req.body;
        connection.query('INSERT INTO image SET ?', formData, (err, results) => {
          if (err) {
            res.status(500).send("Erreur lors de l'ajout d'une image dans le slider");
          } else {
            res.sendStatus(200);
          }
        })
      })
      .put(function (req, res) {  // http://localhost:3000/image-slider/4
        const requestProduct = req.params.request;
        const formData = req.body;
        connection.query('UPDATE image SET ? WHERE image_id=?', [formData, requestProduct], err => {
          if (err) {
            res.status(500).send("Erreur lors de la modification d'une image dans le slider");
          } else {
            res.sendStatus(200);
          }
        })
      })
      .delete(function (req, res) {    //  http://localhost:3000/image-slider/5
        const requestProduct = req.params.request;
        connection.query('DELETE FROM image WHERE image_id=?', [requestProduct], err => {
          if (err) {
            res.status(500).send("Erreur lors de la suppression d'une image");
          } else {
            res.sendStatus(200);
          }
        })
      })
      module.exports = router