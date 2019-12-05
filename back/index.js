const express = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');
const bodyParser = require('body-parser');
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
//___________________________________________________________________________________________________
////////////////////////////////////// Selection des utilisateurs ///////////////////////////////////
app.get('/api/dashboard/account/:role', (req, res) => {
  connection.query(`SELECT * FROM user WHERE user_role=${req.params.role}`, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des utilisateurs');
    } else {
      res.json(results);
    }
  });
});
//___________________________________________________________________________________________________
/////////////////////////////////////// Gestion des produits ////////////////////////////////////////
const productRoute = '/api/dashboard/product/'
app.route([`${productRoute}:request`,productRoute])
  .get(function (req, res) {
    connection.query(`SELECT * FROM product ORDER BY product_name ${req.params.request}`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des produits');
      } else {
        res.json(results);
      }
    });
  })
  .post(function (req, res) {
    const formData = req.body;
    connection.query('INSERT INTO product SET ?', formData, (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de l'ajout du produit.");
      } else {
        res.sendStatus(200);
      }
    });
  })
  .put(function (req, res) {
    const requestProduct = req.params.request;
    const formData = req.body;
    connection.query('UPDATE product SET ? WHERE product_id=?', [formData, requestProduct], err => {
      if (err) {
        res.status(500).send("Erreur lors de la modification du produit");
      } else {
        res.sendStatus(200);
      }
    });
  })
  .delete(function (req, res){
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
app.put('/api/dashboard/product/image/:id', (req, res) => {
  const requestProduct = req.params.id;
  const formData = req.body;
  connection.query('UPDATE product SET product_image_id=NULL WHERE product_id=?', [formData, requestProduct], err => {
    if (err) {
      res.status(500).send("Erreur lors de la modification du produit");
    } else {
      res.sendStatus(200);
    }
  });
});


//___________________________________________________________________________________________________
///////////////////////////////////////order stats (PA) parametres possibles: year / month / quarter / week/////////////////////////////////////////////
const orderRoute = '/api/dashboard/order/stats/'
app.route([`${orderRoute}:request`,orderRoute])
  .get(function (req, res) {
    connection.query(`SELECT SUM(p.product_price) as total_price, COUNT(i.order_item_product_id) as number_of_products, o.* FROM product as p JOIN order_items as i ON p.product_id = i.order_item_product_id JOIN orders as o ON o.order_id = i.order_item_order_id WHERE ${req.params.request}(o.order_date) = ${req.params.request}(CURRENT_DATE) AND YEAR(o.order_date) = YEAR(CURRENT_DATE) GROUP BY o.order_id;`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des order');
      } else {
        res.json(results);
      }
    });
  })

//___________________________________________________________________________________________________
/////////////////////////////////////// Autres requetes /////////////////////////////////////////////

app.listen(port, (err) => console.log(`Server is listening on ${port}`))