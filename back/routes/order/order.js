const express = require("express")
const connection = require('../../conf')

const router = express.Router()



// router.get('/', (req, res) => {
//     res.send("je suis sur la route /user ").status(200)
// })

/////////////////////////////////////// Alert-order /////////////////////////////////////////////
// TESTE OK
router.post('/', (req, res) => {
  // Le user ajoute une commande dans le panier 
  const formData = req.body;
  connection.query('INSERT INTO orders SET ?', formData, err => {
    if (err) {
      res.status(500).send("Erreur lors de l'ajout du produit.");
    } else {
      res.sendStatus(200);
    }
  })
})

// Ajoute l'order item correspondant  TESTE OK
router.post('/item', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO order_items SET ?', formData, err => {
    if (err) {
      res.status(500).send("Erreur lors de l'ajout du numéro de la commande et de celui du produit.");
    } else {
      res.sendStatus(200);
    }
  })
});

//Mettre à jour le stock en retirant le ou les pdt commander TESTE OK
router.put('/:id', (req, res) => {
  const requestStock = req.params.request;
  connection.query('UPDATE stock SET stock_quantity= stock_quantity - 1 WHERE stock_product_id= ?', [requestStock], err => {
    if (err) {
      res.status(500).send("Erreur lors de la suppression du produit");
    } else {
      res.sendStatus(200);
    }
  })
});



  ///////////////////////////////////////order stats (PA) parametres possibles: year / month / quarter / week / day /////////////////////////////////////////////
  // Ne fonctionne pas !!!
router.route(['/stats/:request', '/stats/'])
  .get(function (req, res) {
    connection.query('SELECT SUM(p.product_price) as total_price, COUNT(i.order_item_product_id) as number_of_products, o.* FROM product as p JOIN order_items as i ON p.product_id = i.order_item_product_id JOIN orders as o ON o.order_id = i.order_item_order_id WHERE ${req.params.request}(o.order_date) = ${req.params.request}(CURRENT_DATE) AND YEAR(o.order_date) = YEAR(CURRENT_DATE) GROUP BY o.order_id', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des order');
      } else {
        res.json(results);
      }
    });
  })
  



/////////////////////////////////////// Get les orders depuis le début du mois / les orders en cours ou expédiées ////////////////////////////////////////
// TESTER OK
router.get("/", (req, res) => {
    // connection à la base de données, et sélection des employés
    connection.query(
      `SELECT * FROM orders
        WHERE MONTH(order_date) = MONTH(CURRENT_DATE)
        AND YEAR(order_date) = YEAR(CURRENT_DATE)`,
      (err, results) => {
        if (err) {
          res.status(500).send('Erreur lors de la récupération des commandes du mois');
        } else {
          res.json(results);
        }
      });
  });
  // TESTER OK
router.get('/:number', (req, res) => {
    connection.query(
      `SELECT o.order_ref, st.order_status_name
      FROM orders AS o
      JOIN order_status AS st 
      ON st.order_status_id=o.order_status
      WHERE st.order_status_id=${req.params.number}
      ORDER BY o.order_ref ASC;`,
      (err, results) => {
        if (err) {
          res.status(500).send('Erreur lors de la récupération des commandes en cours');
        } else {
          res.json(results);
        }
      });
  });


  module.exports = router