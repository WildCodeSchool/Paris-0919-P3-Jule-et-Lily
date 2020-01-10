const express = require("express")
const connection = require('../../conf')

const router = express.Router()


router.get('/', (req, res) => {
  res.send("je suis sur la route /product").status(200)
})
router.route(['/all'])
  .get(function (req, res) { //récup un produit
    connection.query('SELECT p.*, s.stock_quantity as product_stock, c.collection_name, k.category_name FROM product as p LEFT OUTER JOIN stock as s ON s.stock_product_id = p.product_id LEFT OUTER JOIN collection as c on c.collection_id = p.product_collection_id LEFT OUTER JOIN category as k ON k.category_id = p.product_category_id', req.body, (err, results) => {
      if (err) {
        console.log(err);
        res.send('Erreur lors de la récupération des produits').status(500);
      } else {
        res.json(results);
      }
    });  
  })

router.route([`/:id`, `/`])
  .get(function (req, res) { //récup un produit
    connection.query('SELECT * FROM product WHERE product_id = ?', req.params.id, (err, results) => {
      if (err) {
        console.log(err);
        res.send('Erreur lors de la récupération des produits').status(500);
      } else {
        res.json(results);
      }
    });  
  })
  .post(function (req, res) {
    const formData = req.body;
    connection.query('INSERT INTO product SET ?', formData, (err, results) => { //ajouter un produit
      if (err) {
        res.status(500).send("Erreur lors de l'ajout du produit.");
      } else {
        res.sendStatus(200);
      }
    });
  })
  .put(function (req, res) { // modifier un produit
    const requestProduct = req.params.id;
    const formData = req.body;
    connection.query('UPDATE product SET ? WHERE product_id=?', [formData, requestProduct], err => {
      if (err) {
        console.log('erreur back',err);
        res.status(500).send("Erreur lors de la modification du produit");
      } else {
        console.log('res back',res);
        res.sendStatus(200);
      }
    });
  })
  .delete(function (req, res) { // supprimer un produit
    const requestProduct = req.params.request;
    connection.query('DELETE FROM product WHERE product_id=?', [requestProduct], err => {
      if (err) {
        res.status(500).send("Erreur lors de la suppression du produit");
      } else {
        res.sendStatus(200);
      }
    });
  });

  // image associée à un produit set à NULL 
  router.put('/image/:id', (req, res) => {
    const requestProduct = req.params.id;
    const formData = req.body;
    connection.query('UPDATE product SET product_image_id = 0 WHERE product_id = ?', [requestProduct], err => {
      if (err) {
        res.status(500).send("Erreur lors de la modification du produit"+err);
      } else {
        res.sendStatus(200);
      }
    });
  });

module.exports = router