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
app.get('/api/dashboard/compte/:role', (req, res) => {
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
const productRoute = '/api/dashboard/produit/'
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
app.put('/api/dashboard/produit/image/:id', (req, res) => {
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

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// EXO LOUIS ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
//___________________________________________________________________________________________________
/////////////////////////////////////// Gestion des images de produits //////////////////////////////

// Ajouter une photo
// INSERT INTO `image` product(`image_id`, `image_name`, `is_slider_image`, `image_url`) VALUES (NULL, 'boucles', '0', 'https://juleetlily.com/wp-content/uploads/2019/11/Disco-Lady-02-05.jpg');
// supprimer une photo
// DELETE FROM `image` where image_id= 3


//GET (light) - Récupération de quelques champs spécifiques (id, names, dates, etc...)
app.get('/api/wizard/name', (req, res) => {
  connection.query('SELECT lastname, firstname FROM wizard', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des wizard.');
    } else {
      res.json(results);
    }
  });
});
//GET - Un filtre "contient ..."
app.get('/api/wizard/name/filter', (req, res) => {
  connection.query('SELECT firstname, lastname FROM wizard WHERE lastname LIKE "%potter%" ORDER BY firstname', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des wizard.');
    } else {
      res.json(results);
    }
  });
});
//GET - filtre "commence par ..." 
app.get('/api/wizard/name/filter/p', (req, res) => {
  connection.query('SELECT firstname, lastname FROM wizard WHERE lastname LIKE "p%" ORDER BY firstname', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des wizard.');
    } else {
      res.json(results);
    }
  });
});
//GET - Un filtre "supérieur à ...
app.get('/api/wizard/filter/between', (req, res) => {
  connection.query('SELECT * FROM player WHERE enrollment_date BETWEEN "1996-01-01" AND "1998-01-01"', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des wizard.');
    } else {
      res.json(results);
    }
  });
});
//GET - Récupération de données ordonnées (ascendant, descendant)L'ordre sera passé en tant que paramètre de la route
app.get('/api/wizard/name/filter/order/:order', (req, res) => {
  connection.query(`SELECT wizard.lastname, wizard.firstname, player.enrollment_date FROM player JOIN wizard ON wizard.id=player.wizard_id ORDER BY player.enrollment_date ${req.params.order}`, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des wizard.');
    } else {
      res.json(results);
    }
  });
});

//POST écoute de l'url "/api/wizard/insert" avec le verbe POST
app.post('/api/wizard/insert', (req, res) => {
  // récupération des données wizard
  const formData = req.body;
  console.log(formData);
  // connexion à la base de données, et insertion du wizard
  connection.query('INSERT INTO wizard SET ?', formData, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de l'ajout du wizard.");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

//PUT écoute de l'url "/api/wizard/edit"
app.put('/api/wizard/post/:id', (req, res) => {
  // récupération des données envoyées
  const idMovie = req.params.id;
  const formData = req.body;
  // connection à la base de données, et insertion de l'employé
  connection.query('UPDATE wizard SET ? WHERE id = ?', [formData, idMovie], err => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la modification du film");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});
//DELETE écoute de l'url "/api/employees"
app.delete('/api/wizard/delete/:id', (req, res) => {
  // récupération des données envoyées
  const idMovie = req.params.id;
  // connexion à la base de données, et suppression de l'employé
  connection.query('DELETE FROM wizard WHERE id = ?', [idMovie], err => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression du film");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

app.listen(port, (err) => console.log(`Server is listening on ${port}`))