const express = require("express")
const connection = require('../../conf')
const router = express.Router()

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

///////////////////////// Order modify by number id /////////////////////////////////
  router.route(['/order/:id/items/'])
  .get(function (req, res) { 
    connection.query(`SELECT p.product_name, p.product_price, o.order_item_product_id FROM order_items as o JOIN product as p ON o.order_item_product_id = p.product_id WHERE o.order_item_order_id = ${req.params.id}`, (err, results) => {
      if (err) {
        res.send('Erreur lors de la récupération de la commande').status(500);
      } else {
        res.json(results);
      }
    });
  })

  router.route(['/order/:id'])
  .get(function (req, res) { 
    connection.query(`SELECT  o.* ,SUM(p.product_price) as total_price, COUNT(i.order_item_product_id) as number_of_products, s.order_status_name, sh.* FROM product as p JOIN order_items as i ON p.product_id = i.order_item_product_id JOIN orders as o ON o.order_id = i.order_item_order_id JOIN order_status as s ON s.order_status_id = o.order_status JOIN shipping_methods as sh ON sh.shipping_id = o.order_shipping_method_id WHERE o.order_id = ${req.params.id} GROUP BY o.order_id`, (err, results) => {
      if (err) {
        res.send('Erreur lors de la récupération de la commande').status(500);
      } else {
        res.json(results);
      }
    });
  })
  .put(function (req, res) { 
    const requestOrderPut = req.params.id;
    const formData = req.body;
    connection.query('UPDATE orders SET ? WHERE order_id=?', [formData, requestOrderPut], (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la modification de la commande");
      } else {
        res.sendStatus(200);
      }
    });
  })


router.route(['/order_status'])
  .get(function (req, res) {
    connection.query(`SELECT * from order_status`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des order status');
      } else {
        res.json(results);
      }
    });
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

router.route(['/stats/:request', '/stats/'])
  .get(function (req, res) {
    connection.query(`SELECT SUM(p.product_price) as total_price, COUNT(i.order_item_product_id) as number_of_products, o.* FROM product as p JOIN order_items as i ON p.product_id = i.order_item_product_id JOIN orders as o ON o.order_id = i.order_item_order_id WHERE ${req.params.request}(o.order_date) = ${req.params.request}(CURRENT_DATE) AND YEAR(o.order_date) = YEAR(CURRENT_DATE) GROUP BY o.order_id`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des order');
      } else {
        res.json(results);
      }
    });
  })


/////////////////////////////////////// Get les orders depuis le début du mois / les orders en cours ou expédiées ////////////////////////////////////////

router.get("/", (req, res) => {
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

router.get("/all", (req, res) => {
  // connection à la base de données, et sélection des commandes
  connection.query(
    `SELECT u.user_firstname, u.user_lastname, SUM(p.product_price) as total_price, COUNT(i.order_item_product_id) as number_of_products, o.*, s.order_status_name FROM product as p JOIN order_items as i ON p.product_id = i.order_item_product_id JOIN orders as o ON o.order_id = i.order_item_order_id JOIN order_status as s ON s.order_status_id = o.order_status LEFT OUTER JOIN user as u ON o.order_user_id=u.user_id GROUP BY o.order_id`,
    (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des commandes du mois');
      } else {
        res.json(results);
      }
    });
});

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


router.get('/:id/items', (req, res) => {
  connection.query(
    `SELECT * FROM order_items JOIN product AS p ON p.product_id=order_item_product_id WHERE order_item_order_id=${req.params.id} `,
    (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des commandes en cours');
      } else {
        res.json(results);
      }
    });
});

module.exports = router