const express = require("express")
const connection = require('../../conf')
const router = express.Router()

//___________________________________________________________________________________________________
/////////////////////////////////////// Gestion des codes promo /////////////////////////////////////

router.get('/', (req, res) => {
  res.send("je suis sur la route /code-promo ").status(200)
})

const codePromoRoute = '/'
router.route([`${codePromoRoute}all`])
  .get(function (req, res) {
    //afficher les codes promo
    connection.query(`SELECT * FROM code_promo ORDER BY code_promo_id`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des produits');
      } else {
        res.json(results);
      }
    });
  })

router.route([`${codePromoRoute}:id`, codePromoRoute])
  .get(function (req, res) {
    //afficher un code promo
    const idCodePromo = req.params.id;
    connection.query(`SELECT * FROM code_promo WHERE code_promo_id=?`, [idCodePromo], (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des produits');
      } else {
        res.json(results);
      }
    });
  })
  //créer un nouveau code promotionnel
  .post(function (req, res) {
    const formData = req.body;
    connection.query('INSERT INTO code_promo SET ?', formData, (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de l'ajout du code promo.");
      } else {
        res.sendStatus(200);
      }
    });
  })
  // modifier un code promotionnel 
  .put(function (req, res) {
    const idCodePromo = req.params.id;
    const formData = req.body;
    connection.query('UPDATE code_promo SET ? WHERE code_promo_id=?', [formData, idCodePromo], err => {
      if (err) {
        res.status(500).send("Erreur lors de la modification du code promo");
      } else {
        res.sendStatus(200);
      }
    });
  })
  // supprimer un code promo
  .delete(function (req, res) {
    const idCodePromo = req.params.id;
    connection.query('DELETE FROM code_promo WHERE code_promo_id=?', [idCodePromo], err => {
      if (err) {
        res.status(500).send("Erreur lors de la suppression du code promo");
      } else {
        res.sendStatus(200);
      }
    });
  });

module.exports = router