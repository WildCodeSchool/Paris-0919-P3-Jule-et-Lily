const express = require('express');
const morgan = require('morgan')
const app = express();
const port = 3000;
const connection = require('./conf');
const bodyParser = require('body-parser');
const route = require("./routes/index")

// morgan error support
app.use(morgan('dev'))
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/category", route.category)
app.use("/collection", route.collection)
// app.use("/headerCategory", route.headerCategory)
// app.use("/headerCollection", route.headerCollection)
// app.use("/imageSlider", route.imageSlider)
// app.use("/order", route.order)
// app.use("/product", route.product)
app.use("/code-promo", route.codePromo)
app.use("/promo", route.promo)
app.use("/product", route.product)
// app.use("/codePromo", route.codePromo)
// app.use("/promo", route.promo)
// app.use("/user", route.user)

app.get('/', (req, res) => {
    res.send("Bienvenue chez jule et lily !").status(200)
})


//___________________________________________________________________________________________________
////////////////////////////////////// Selection des utilisateurs ///////////////////////////////////
app.get('/api/dashboard/account/:role', (req, res) => {
  connection.query(`SELECT * FROM user WHERE user_role=${req.params.role} ORDER BY user_lastname, user_firstname ASC`, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des utilisateurs');
    } else {
      res.json(results);
    }
  });
});
//
//////////////////////////////////// Sélectionner tout l'historique des commandes d'un client//////////////////////
app.get('/api/dashboard/customers/orders/:id', (req, res) => {
  connection.query(`SELECT * FROM orders WHERE order_user_id=${req.params.id} ORDER BY order_date DESC`, (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération de l'historique du client");
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
///////////////////////////////////////order stats (PA) parametres possibles: year / month / quarter / week / day /////////////////////////////////////////////
const orderRoute = '/api/dashboard/order/stats/'
app.route([`${orderRoute}:request`, orderRoute])
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
//_______________________________________________________________________________________________
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
});

//Mettre à jour le stock en retirant le ou les pdt commander
app.put(`${alertRoute}/validation/:id`, (req, res) => {
  const requestStock = req.params.request;
  connection.query('UPDATE stock SET stock_quantity= stock_quantity - 1 WHERE stock_product_id= ?', [requestStock], err => {
    if (err) {
      res.status(500).send("Erreur lors de la suppression du produit");
    } else {
      res.sendStatus(200);
    }
  })
});
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

//___________________________________________________________________________________________________
/////////////////////////////////////// Gestion des Header collection Menu /////////////////////////////////////////////


const collectionHeaderRoute = '/api/dashboard/header/collection/menu/'  // http://localhost:3000/api/dashboard/header/collection/menu/asc
app.route([`${collectionHeaderRoute}:request`, collectionHeaderRoute])
  .get(function (req, res) {
    connection.query(`SELECT * FROM header_collection_menu ORDER BY collection_menu_id ${req.params.request}`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des menu header collection');
      } else {
        res.json(results);
      }
    });
  })
  .post(function (req, res) {      //http://localhost:3000/api/dashboard/header/collection/menu/ 
    const formData = req.body;
    connection.query('INSERT INTO header_collection_menu SET ?', formData, (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de l'ajout d'un header collection menu");
      } else {
        res.sendStatus(200);
      }
    });
  })
  .delete(function (req, res) {    // http://localhost:3000/api/dashboard/header/collection/menu/6
    const requestProduct = req.params.request;
    connection.query('DELETE FROM header_collection_menu  WHERE collection_menu_id=?', [requestProduct], err => {
      if (err) {
        res.status(500).send("Erreur lors de la suppression d'un header collection menu");
      } else {
        res.sendStatus(200);
      }
    });
  })
  .put(function (req, res) {   //http://localhost:3000/api/dashboard/header/collection/menu/5
    const requestProduct = req.params.request;
    const formData = req.body;
    connection.query('UPDATE header_collection_menu  SET ? WHERE collection_menu_id=?', [formData, requestProduct], err => {
      if (err) {
        res.status(500).send("Erreur lors de la modification d'un header collection menu");
      } else {
        res.sendStatus(200);
      }
    })
  });
//___________________________________________________________________________________________________
/////////////////////////////////////// Gestion des images pour le slider /////////////////////////////////////////////
// voir les images du slider
const seeImgSliderRoute = '/api/dashboard/header/imgslider/:slider' //http://localhost:3000/api/dashboard/header/imgslider/1
app.route([`${seeImgSliderRoute}:request`, seeImgSliderRoute])
  .get(function (req, res) {
    connection.query(`SELECT * FROM image WHERE is_slider_image=${req.params.slider}`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des images du slider');
      } else {
        res.json(results);
      }
    })
  });

// ajouter / supprimer une image au slider
const imgSliderRoute = '/api/dashboard/header/imgslider/' //http://localhost:3000/api/dashboard/header/imgslider
app.route([`${imgSliderRoute}:request`, imgSliderRoute])
  .get(function (req, res) {
    connection.query(`SELECT * FROM image ${req.params.request}`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des images du slider');
      } else {
        res.json(results);
      }
    })
  })
  .post(function (req, res) {   //http://localhost:3000/api/dashboard/header/imgslider 
    const formData = req.body;
    connection.query('INSERT INTO image SET ?', formData, (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de l'ajout d'une image dans le slider");
      } else {
        res.sendStatus(200);
      }
    })
  })
  .put(function (req, res) {  // http://localhost:3000/api/dashboard/header/imgslider/4
    const requestProduct = req.params.request;
    const formData = req.body;
    connection.query('UPDATE image SET ? WHERE image_id=?', [formData, requestProduct], err => {
      if (err) {
        res.status(500).send("Erreur lors de la modification d'une image dans le slider");
      } else {
        res.sendStatus(200);
      }
    })
  })
  .delete(function (req, res) {    // http://localhost:3000/api/dashboard/header/imgslider/4
    const requestProduct = req.params.request;
    connection.query('DELETE FROM image WHERE image_id=?', [requestProduct], err => {
      if (err) {
        res.status(500).send("Erreur lors de la suppression d'une image");
      } else {
        res.sendStatus(200);
      }
    })
  })

app.listen(port, (err) => console.log(`Server is listening on ${port}`))