const express = require("express");
const connection = require("../../conf");
const router = express.Router();

//___________________________________________________________________________________________________
/////////////////////////////////////// Gestion des codes promo /////////////////////////////////////

router.get("/", (req, res) => {
  res.send("je suis sur la route /promo ").status(200);
});

const codePromoRoute = "/";
router.route([`${codePromoRoute}all`]).get(function(req, res) {
  //afficher les promos
  connection.query(`SELECT * FROM promo ORDER BY promo_id`, (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des promos");
    } else {
      res.json(results);
    }
  });
});

router
  .route([`${codePromoRoute}:id`, codePromoRoute])
  .get(function(req, res) {
    //afficher une promo
    const idCodePromo = req.params.id;
    connection.query(
      `SELECT * FROM promo WHERE promo_id=?`,
      [idCodePromo],
      (err, results) => {
        if (err) {
          res.status(500).send("Erreur lors de la récupération de la promo");
        } else {
          res.json(results);
        }
      }
    );
  })
  //créer une nouvelle promo
  .post(function(req, res) {
    const formData = req.body;
    connection.query("INSERT INTO promo SET ?", formData, (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de l'ajout de la promo.");
      } else {
        res.sendStatus(200);
      }
    });
  })
  // modifier une promo
  .put(function(req, res) {
    const idCodePromo = req.params.id;
    const formData = req.body;
    connection.query(
      "UPDATE promo SET ? WHERE promo_id=?",
      [formData, idCodePromo],
      err => {
        if (err) {
          res.status(500).send("Erreur lors de la modification de la promo");
        } else {
          res.sendStatus(200);
        }
      }
    );
  })
  // supprimer une promo
  .delete(function(req, res) {
    const idCodePromo = req.params.id;
    connection.query("SET FOREIGN_KEY_CHECKS=0", (err, results) => {
      //ajouter un produit
      if (err) {
        console.log(`ici l'erreur `, err);
        res.send("Erreur lors de l'ajout du produit.").status(500);
      } else {
        connection.query(
          "DELETE FROM promo WHERE promo_id=?",
          [idCodePromo],
          err => {
            if (err) {
              console.log(err);
              res.status(500).send("Erreur lors de la suppression de la promo");
            } else {
              connection.query("SET FOREIGN_KEY_CHECKS=1", (err, results) => {
                if (err) {
                  console.log(`ici l'erreur `, err);
                  res.send("Erreur lors de l'ajout du produit.").status(500);
                } else {
                  res.status(200);
                }
              });
            }
          }
        );
      }
    });
  });

module.exports = router;
