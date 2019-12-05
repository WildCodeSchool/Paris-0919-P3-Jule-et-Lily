const express = require('express');
const app = express();
const port = 8889;
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

/////////////////////////////////////// Alert-order /////////////////////////////////////////////
const alertRoute = '/api/dashboard/account/order'
app.post(`${alertRoute}`, (req, res) => {
  // Le user ajoute une commande dans le panier OK
  const formData = req.body;
  connection.query('INSERT INTO orders SET ?', formData, err => {
    if (err) {
      res.status(500).send("Erreur lors de l'ajout du produit.");
    } else {
      res.sendStatus(200);
    }
  })
}) 

  // Ajoute l'order item correspondant OK
app.post(`${alertRoute}/validation`, (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO order_items SET ?', formData, err => {
      if (err) {
        res.status(500).send("Erreur lors de l'ajout du numéro de la commande et de celui du produit.");
      } else {
        res.sendStatus(200);
      }
  })
  //Mettre à jour le stock en retirant le ou les pdt commander
app.put(`${alertRoute}/validation/:id`, (req, res) => {
    const requestStock = req.params.request;
    connection.query('UPDATE stock SET stock_quantity= stock_quantity - 1 WHERE stock_product_id= ?', [requestStock], err => {
      if (err) {
        res.status(500).send("Erreur lors de la suppression du produit");
      } else {
        res.sendStatus(200);
      }
    });
  });
})





app.listen(port, (err) => console.log(`Server is listening on ${port}`))