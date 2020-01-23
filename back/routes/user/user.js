const express = require("express")
const connection = require('../../conf')
const router = express.Router()

router.get('/', (req, res) => {
  res.send("je suis sur la route /user ").status(200)
})

// To have all users
router.route('/role/:role')
  .get(function (req, res, next) {
    connection.query(`SELECT * FROM user WHERE user_role=${req.params.role} ORDER BY user_lastname, user_firstname ASC`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
      } else {
        res.json(results);
      }
    });
  });

// to have one user by his id
router.route('/:id')
  .get(function (req, res) {
    connection.query(`SELECT  user_lastname , user_firstname, user_date_of_birth, user_registration_date, user_email_verified FROM user WHERE user_id=?`, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération du client');
      } else {
        res.json(results);
      }
    })
  })
// delete user
  .delete (function (req, res) {
    connection.query(`DELETE FROM user WHERE user_id=${req.params.id}`, [req.params.id], err => {
      if (err) {
        console.log(err);
        res.send("Erreur lors de la suppression du client").status(500);
      } else {
        res.sendStatus(200);
      }
    });
  });

// to have billing adress of user
router.route('/billing/:id')
  .get(function (req, res, next) {
    connection.query(`SELECT address_firstname, address_lastname, is_shipping_address, is_billing_address, address_street, address_city, address_country, address_zip_code, address_company_name, u.user_phone FROM address JOIN user AS u on u.user_id=address.address_user_id WHERE u.user_id=${req.params.id} AND address.is_billing_address=1`, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération du client');
      } else {
        res.json(results);
      }
    });
  });


// to have billing adress of user
router.route('/shipping/:id')
  .get(function (req, res, next) {
    connection.query(`SELECT address_firstname, address_lastname, is_shipping_address, is_billing_address, address_street, address_city, address_country, address_zip_code, address_company_name, u.user_phone FROM address JOIN user AS u on u.user_id=address.address_user_id WHERE u.user_id=${req.params.id} AND address.is_shipping_address=1`, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération du client');
      } else {
        res.json(results);
      }
    });
  });


// To have information of history of order
  router.route('/order/:id')
  .get(function (req, res, next) {
    connection.query(`SELECT * FROM order_status JOIN orders ON orders.order_status=order_status.order_status_id WHERE order_user_id= ${req.params.id}`, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send(`Erreur lors de la récupération des informations de l'historique de commande`);
      } else {
        res.json(results);
      }
    });
  });

  router.route('/orderprice/:id')
  .get(function (req, res, next) {
    connection.query( `SELECT SUM(p.product_price) as total_price FROM product as p JOIN order_items as i ON p.product_id = i.order_item_product_id JOIN orders as o ON o.order_id = i.order_item_order_id JOIN order_status as s ON s.order_status_id = o.order_status WHERE o.order_user_id= ? GROUP BY o.order_id`, [req.params.id], (err, results) => {
      if (err) {
        console.log (err)
        res.status(500).send(`Erreur lors de la récupération du prix`);
      } else {
        console
        res.json(results);
      }
    });
  });

module.exports = router