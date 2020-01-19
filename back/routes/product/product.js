const express = require("express")
const connection = require('../../conf')

const router = express.Router()

/////////////// stock des produits ///////////
/////////////////////////////////////////////


router.get('/', (req, res) => {
  res.send("je suis sur la route /product").status(200)
})

router.route(['/productstockid']) 
  .get(function (req, res) {
    connection.query('SELECT product_id from product ORDER BY PRODUCT_ID DESC LIMIT 1', (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération de l'id du produit");
      } else {
        res.json(results).status(200);
      }
    })
  })

router.route(['/stock/:id','/stock/:stock_quantity/and/:stock_min'])
  .get(function (req, res) { //récup un produit
    connection.query('SELECT * from stock WHERE stock_product_id = ?', req.params.id, (err, results) => {
      if (err) {
        console.log(err);
        res.send('Erreur lors de la récupération du stock').status(500);
      } else {
        console.log(results)
        res.json(results);
      }
    });
  })
  .put(function (req, res) { // modifier un produit
    const requestProduct = req.params.id;
    const formData = req.body;
    connection.query('UPDATE stock SET ? WHERE stock_product_id=?', [formData, requestProduct], (err, results) => {
      if (err) {
        console.log('erreur back', err);
        res.status(500).send("Erreur lors de la modification du stock");
      } else {
        console.log('res back', res);
        console.log(results)
        res.sendStatus(200);
      }
    });
  })
  .post(function (req, res) {
    const stock_min = req.params.stock_min
    const stock_quantity = req.params.stock_quantity
    connection.query('SELECT  product_id FROM product ORDER BY product_id DESC LIMIT 1', (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération de l'id du produit");
      } else {
        const recuperationIdProduct = results[0].product_id
        console.log('recuperationIdProduct', recuperationIdProduct[0]);
        const newStock = {
          stock_product_id: recuperationIdProduct,
          stock_min: parseInt(stock_min),
          stock_quantity: parseInt(stock_quantity)
        }
        console.log('newStock', newStock);
        connection.query('INSERT INTO stock SET ?', newStock, (err, results) => {
          if (err) {
            res.status(500).send("Erreur lors de l'ajout du NewStock");
          } else {
            res.status(200);
          }
        });
        res.status(200);
      }
    });
  })

router.route(['/all'])
  .get(function (req, res) { //récup un produit
    connection.query('SELECT p.*, i.image_url, s.stock_quantity as product_stock, c.collection_name, k.category_name FROM product as p LEFT OUTER JOIN stock as s ON s.stock_product_id = p.product_id LEFT OUTER JOIN collection as c on c.collection_id = p.product_collection_id LEFT OUTER JOIN category as k ON k.category_id = p.product_category_id INNER JOIN image as i On i.image_id= p.product_image_id', req.body, (err, results) => {
      if (err) {
        console.log(err);
        res.send('Erreur lors de la récupération des produits').status(500);
      } else {
        console.log(results)
        res.json(results);
      }
    });
  })

router.route(['/:id', '/'])
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
    console.log(req.body);
    const formData = req.body; // CKECKS = Activer OU DESACTIVER  la vérification des clés étrangères
    connection.query('SET FOREIGN_KEY_CHECKS=0', formData, (err, results) => { //ajouter un produit
      if (err) {
        console.log(`ici l'erreur `, err);
        res.send("Erreur lors de l'ajout du produit.").status(500);
      } else {
        connection.query('INSERT INTO product SET ?', formData, (err, results) => { //ajouter un produit
          if (err) {
            console.log(`ici l'erreur `, err);
            res.send("Erreur lors de l'ajout du produit.").status(500);
          } else {
            connection.query('SET FOREIGN_KEY_CHECKS=1', formData, (err, results) => {
              if (err) {
                console.log(`ici l'erreur `, err);
                res.send("Erreur lors de l'ajout du produit.").status(500);
              }
              else {
                res.sendStatus(200);
              }
            })
          }
        })
      }
    })
  })

  .put(function (req, res) { // modifier un produit
    const requestProduct = req.params.id;
    const formData = req.body;
    connection.query('UPDATE product SET ? WHERE product_id=?', [formData, requestProduct], (err, results) => {
      if (err) {
        console.log('erreur back', err);
        res.status(500).send("Erreur lors de la modification du produit");
      } else {
        console.log('res back', res);
        console.log(results)
        res.sendStatus(200);
      }
    });
  })
  .delete(function (req, res) { // supprimer un produit penser à supprimer dans la bdd la connection avec le stock id
    connection.query(`DELETE FROM product WHERE product_id=${req.params.id}`, err => {
      if (err) {
        console.log(err);
        res.send("Erreur lors de la suppression du produit").status(500);
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
      res.status(500).send("Erreur lors de la modification du produit" + err);
    } else {
      res.sendStatus(200);
    }
  });
});



module.exports = router