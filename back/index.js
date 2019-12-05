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
app.route([`${productRoute}:request`, productRoute])
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
  .delete(function (req, res) {
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
/////////////////////////////////////// Gestion du status des commandes /////////////////////////////
const statusRoute = '/api/dashboard/order/status/'
app.route([`${statusRoute}:id`, statusRoute])
  // Afficher le status d'une commande
  .get(function (req, res) {
    connection.query(`SELECT order_ref, o.order_status_name FROM orders JOIN order_status AS o ON o.order_status_id = orders.order_status WHERE order_id=${req.params.id}`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des commandes');
      } else {
        res.json(results);
      }
    });
  })
  // modifier le status d'une commande
  .put(function (req, res) {
    const idOrder = req.params.id;
    const formData = req.body;
    connection.query('UPDATE orders SET ? WHERE order_id=?', [formData, idOrder], err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification du status de la commande");
      } else {
        res.sendStatus(200);
      }
    });
  });
//___________________________________________________________________________________________________
/////////////////////////////////////// Gestion des codes promo /////////////////////////////////////
const codePromoRoute = '/api/dashboard/code-promo/'
app.route([`${codePromoRoute}:id`, codePromoRoute])
  //afficher les codes promo
  .get(function (req, res) {
    connection.query(`SELECT * FROM code_promo ORDER BY code_promo_id`, (err, results) => {
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
//___________________________________________________________________________________________________
/////////////////////////////////////// Autres requetes /////////////////////////////////////////////
app.listen(port, (err) => console.log(`Server is listening on ${port}`))