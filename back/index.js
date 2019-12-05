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
/////////////////////////////////////// Autres requetes /////////////////////////////////////////////

//__________________________________________________________________________________________________________________________________________
/////////////////////////////////////// Get les orders depuis le début du mois / les orders en cours ou expédiées ////////////////////////////////////////


  app.get("/api/dashboard/order/current-month", (req, res) => {
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

  
  app.get(`/api/dashboard/order/status/:number`, (req, res) => {
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

  



app.listen(port, (err) => console.log(`Server is listening on ${port}`))