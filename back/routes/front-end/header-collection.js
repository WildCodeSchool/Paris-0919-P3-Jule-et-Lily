const express = require("express")
const connection = require('../../conf')
const router = express.Router()
router.get('/', (req, res) => {
    res.send("je suis sur la route /header-collection ").status(200)
})


router.route(['/all', '/:request', '/',':id' ])  //  http://localhost:4000/header-collection/all
    .get(function (req, res, next) {
        connection.query(`SELECT * FROM header_collection_menu ORDER BY collection_menu_id`, (err, results) => {
            if (err) {
                res.status(500).send('Erreur lors de la récupération des menu header collection');
            } else {
                res.json(results);
            }
        })
    })
    .post(function (req, res) {   //  http://localhost:4000/header-collection
        const formData = req.body;
        connection.query('INSERT INTO header_collection_menu SET ?', formData, (err, results) => {
          if (err) {
            res.status(500).send("Erreur lors de l'ajout d'un header collection menu");
          } else {
            res.sendStatus(200);
          }
        })
      })
      .delete(function (req, res) {     
        const requestProduct = req.params.request;
        connection.query('DELETE FROM header_collection_menu  WHERE collection_menu_id=?', [requestProduct], err => {
          if (err) {
            res.status(500).send("Erreur lors de la suppression d'un header collection menu");
          } else {
            res.sendStatus(200);
          }
        });
      })


      .put(function (req, res) {   //  http://localhost:4000/header-collection/11

        const requestProduct = req.params.request;
        const obj1 = req.body;

        const newKeys = {
          id:"collection_menu_id",
          backgroundColor: "collection_menu_background_color",
          title: "collection_menu_title",
          url: "collection_menu_url",
          titleColor: "collection_menu_title_color",
        }

        const renameKeys = (obj1, newKeys) => {
          const keyValues = Object.keys(obj1).map(key => {
            const newKey = newKeys[key] || key;
            return { [newKey]: obj1[key] };
          });
          return Object.assign({}, ...keyValues);
        }
      
        const formData = renameKeys(obj1, newKeys);
        connection.query('UPDATE header_collection_menu  SET ? WHERE collection_menu_id=?', [formData, requestProduct], err => {
          if (err) {
            res.status(500).send("Erreur lors de la modification d'un header collection menu");
          } else {
            res.sendStatus(200);
          }
        })
      });


module.exports = router