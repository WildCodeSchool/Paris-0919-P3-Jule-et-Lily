const express = require("express")
const connection = require('../../conf')
const router = express.Router()
const multer = require("multer");
const upload = multer({ dest: "public/" });
const fs = require("fs");

/////////////// stock des produits ///////////
/////////////////////////////////////////////result.insertId

router.get('/', (req, res) => {
  res.send("je suis sur la route /product").status(200)
})


router.get("/lowstock/" ,function(req,res){
  connection.query( 
 "SELECT COUNT(p.product_id) as count FROM product as p JOIN stock as s ON s.stock_product_id = p.product_id WHERE s.stock_quantity <= stock_min", (err, results) => {
      if (err) {
        // console.log(err)
        res.end("Erreur lors de la récupération des produits bientôt épuisés").status(500);
      } else {
        res.json(results)
      }
    }
  )
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
        // console.log(err);
        res.send('Erreur lors de la récupération du stock').status(500);
      } else {
        // console.log(results)
        res.json(results);
      }
    });
  })
  .put(function (req, res) { // modifier un produit
    const requestProduct = req.params.id;
    const formData = req.body;
    connection.query('UPDATE stock SET ? WHERE stock_product_id=?', [formData, requestProduct], (err, results) => {
      if (err) {
        // console.log('erreur back', err);
        res.status(500).send("Erreur lors de la modification du stock");
      } else {
        // console.log('res back', res);
        // console.log(results)
        res.sendStatus(200);
      }
    });
  })
  .post(function (req, res) {
    console.log('post stock product')
    const stock_min = req.params.stock_min
    const stock_quantity = req.params.stock_quantity
    connection.query('SELECT product_id FROM product ORDER BY product_id DESC LIMIT 1', (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération de l'id du produit");
      } else {
        const recuperationIdProduct = results[0].product_id
        // console.log('recuperationIdProduct', recuperationIdProduct[0]);
        const newStock = {
          stock_product_id: recuperationIdProduct,
          stock_min: parseInt(stock_min),
          stock_quantity: parseInt(stock_quantity)
        }
        // console.log('newStock', newStock);
        connection.query('INSERT INTO stock SET ?', newStock, (err, results) => {
          if (err) {
            res.send("Erreur lors de l'ajout du NewStock").status(500);
          } else {
            res.send('stock bien ajouté').status(200);
          }
        });
        res.status(200);
      }
    });
  })


/////////////// les produits ///////////
////////////////////////////////////////

router.route(['/all'])
  .get(function (req, res) { //récup un produit
    connection.query('SELECT p.*, i.image_name, s.stock_quantity as product_stock, s.stock_min as product_stock_min, c.collection_name, k.category_name FROM product as p LEFT OUTER JOIN stock as s ON s.stock_product_id = p.product_id LEFT OUTER JOIN collection as c on c.collection_id = p.product_collection_id LEFT OUTER JOIN category as k ON k.category_id = p.product_category_id LEFT JOIN image as i ON i.image_id=p.product_cover_image_id', (err, results) => {
      if (err) {
        // console.log(err);
        res.send('Erreur lors de la récupération des produits').status(500);
      } else {
        // console.log(results)
        res.json(results);
      }
    });
  })

  router.route(['/:id/promo'])
  .get(function (req, res) { //récup la promo d'un produit
    connection.query('SELECT p.product_id, pr.* FROM product as p JOIN promo as pr ON p.product_promo_id = pr.promo_id WHERE product_id = ?', req.params.id, (err, results) => {
      if (err) {
        console.log(err);
        res.send('Erreur lors de la récupération des produits').status(500);
      } else {
        res.json(results);
      }
    });
  })

router.route(['/:id', '/'])
  .get(function (req, res) { //récup un produit
    connection.query('SELECT * FROM product WHERE product_id = ?', req.params.id, (err, results) => {
      if (err) {
        // console.log(err);
        res.send('Erreur lors de la récupération des produits').status(500);
      } else {
        res.json(results);
      }
    });
  })
  .post(function (req, res) {
    // console.log(req.body);
    console.log('post product')
    const formData = req.body; // CKECKS = Activer OU DESACTIVER  la vérification des clés étrangères
    connection.query('SET FOREIGN_KEY_CHECKS=0', formData, (err, results) => { //ajouter un produit
      if (err) {
        // console.log(`ici l'erreur `, err);
        res.send("Erreur lors de l'ajout du produit.").status(500);
      } else {
        connection.query('INSERT INTO product SET ?', formData, (err, results) => { //ajouter un produit
          if (err) {
            // console.log(`ici l'erreur `, err);
            res.send("Erreur lors de l'ajout du produit.").status(500);
          } else {
            connection.query('SET FOREIGN_KEY_CHECKS=1', formData, (err, results) => {
              if (err) {
                // console.log(`ici l'erreur `, err);
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
        // console.log('erreur back', err);
        res.status(500).send("Erreur lors de la modification du produit");
      } else {
        // console.log(results)
        res.sendStatus(200);
      }
    });
  })
  .delete(function(req, res) {
    const id = req.params.id
    connection.query("SET FOREIGN_KEY_CHECKS=0",(err, results) => {
      //ajouter un produit
      if (err) {
        console.log(`ici l'erreur `, err);
        res.send("Erreur lors de la suppression de la collection.").status(500);
      } else {
        connection.query(`DELETE FROM product WHERE product_id=${req.params.id}`, err => {
          if (err) {
            console.log(err);
            res.send("Erreur lors de la suppression du produit").status(500);
          } else {
              console.log(req.params)
              connection.query(
                `SELECT image_name FROM image WHERE image_product_id = ${id}`,
                (err, result) => {
                  if (err) {
                    console.log("selectImage err", err);
                    res
                      .send("Erreur lors de la recuperation du nom d'image")
                      .status(500);
                  } else {    
                    try {
                      for (let i = 0; i < result.length; i++){
                        const path = result[i].image_name;
                        console.log("image name", path);
                        fs.unlinkSync(path);
                      }
                      connection.query(
                        `DELETE FROM image WHERE image_product_id=${id}`,
                        (err, result) => {
                          if (err) {
                            console.log("deleteImage err", err);
                            res
                              .status(500)
                              .send(
                                "Erreur lors de la suppression d'une image dans la bdd"
                              );
                            connection.query(
                              "SET FOREIGN_KEY_CHECKS=1",
                              (err, results) => {
                                if (err) {
                                  console.log(`ici l'erreur `, err);
                                  res
                                    .send("Erreur lors de l'ajout du produit.")
                                    .status(500);
                                } else {
                                  res.send("image bien supprimée.").Status(200);
                                }
                              }
                            );
                          }
                        }
                      );
                    } catch (err) {
                      res
                        .status(500)
                        .send(
                          "Erreur lors de la suppression d'une image dans le serveur public"
                        );
                      console.error(err);
                    }
                  }
                }
              );
            }
          }
        );
      }
    });
  });

/////////////// Récupérer les images du produit sauf l'image en cover ///////////
/////////////////////////////////////////////////////////////////////////////////

  router
    .route(["/image/:id", "/image"])
    .get(function(req, res) {
      //récup un produit
      connection.query(
        `SELECT image_id FROM image JOIN product ON image_id = product_cover_image_id WHERE product_id= ${req.params.id}`,
        (err1, res1) => {
          if (err1) {
            res
              .status(500)
              .send(
                "Erreur lors de la récupération de l'image de couverture du produit"
              );
            // console.log("erreur  recup image", err);
          } else if (!res1[0]) {
            connection.query(
              `SELECT * FROM image WHERE image_product_id = ${req.params.id} ORDER BY image_id ASC`,
              (err, results) => {
                if (err) {
                  res
                    .status(500)
                    .send(
                      "Erreur lors de la récupération des images du produit"
                    );
                } else {
                  res.json(results);
                }
              }
            );
          } else {
            const coverImageId = res1[0].image_id;
            connection.query(
              `SELECT * FROM image WHERE image_product_id = ${req.params.id}  AND image_id != ${coverImageId} ORDER BY image_id ASC`,
              (err, results) => {
                if (err) {
                  res
                    .status(500)
                    .send(
                      "Erreur lors de la récupération des images du produit"
                    );
                  // console.log("erreur  recup image", err);
                } else {
                  res.json(results);
                }
              }
            );
          }
        }
      );
    })

    ////// SUPPRIMER UNE IMAGE BDD ET SERVEUR
    .delete(function(req, res) {
      connection.query(
        `SELECT image_name FROM image WHERE image_id = ${req.params.id}`,
        (err, result) => {
          if (err) {
            res
              .send("Erreur lors de la recuperation du nom d'image")
              .status(500);
          } else {
            const path = result[0].image_name;
            // console.log("image name", path);
            try {
              fs.unlinkSync(path);
              connection.query(
                `DELETE FROM image WHERE image_id=${req.params.id}`,
                (err, result) => {
                  if (err) {
                    res
                      .status(500)
                      .send(
                        "Erreur lors de la suppression d'une image dans la bdd"
                      );
                  } else {
                    res.send("image bien supprimée").status(200);
                  }
                }
              );
            } catch (err) {
              res
                .status(500)
                .send(
                  "Erreur lors de la suppression d'une image dans le serveur public"
                );
              // console.error(err);
            }
          }
        }
      );
    });

// Gestion Image de couverture du produit
router.route(['/image-cover/:id', '/image-cover/:id/:productId'])
  .get(function (req, res) { //récup un produit
    connection.query(
    `SELECT * FROM image JOIN product ON image_id = product_cover_image_id WHERE product_id= ${req.params.id}`,
      (err, results) => {
        if (err) {
          res
            .status(500)
            .send("Erreur lors de la récupération de l'image de couverture du produit");
            console.log("erreur  recup image", err)
        } else {
          res.json(results);
        }
      }
    );
  }) 
  .put(function (req, res) { // modifier image produit
    const ImageId = req.params.id;
    const ProductId = req.params.productId;
    console.log('imageid',ImageId)
    console.log('productid',ProductId)
    connection.query(`UPDATE product SET product_cover_image_id=${ImageId} WHERE product_id=${ProductId}`, (err, results) => {
      if (err) {
        console.log('erreur back', err);
        res.status(500).send("Erreur lors de la modification de l'image de couverture du produit");
      } else {
        console.log(results)
        res.send('ok').Status(200);
      }
    });
  })  

  
  ///////// ajout d'image sur produit existant
router.post("/image/:id", upload.array("file"), (req, res, next) => {
  let error =  false;

  console.log("file cote back",req.files)
  req.files.map(file => {

    let Timestamp = Math.round(new Date().getTime() / 1000)
    let FileName = file.originalname
    let regex1 = /\’\”\;\,\*\./gi;
    let NewFileName = FileName.replace(regex1,"").split(" ").join("").toLowerCase()

    fs.rename(file.path, `public/${Timestamp}${NewFileName}`, err => {
      if (err) {
        error=true;
      } else {
        const objectFile = {
          image_name : `public/${Timestamp}${NewFileName}`,
          is_slider_image : 0,
          image_url : `public/${Timestamp}${NewFileName}`,
          image_product_id: `${req.params.id}` 
        }
        connection.query("INSERT INTO image SET ?", objectFile, err2 => {
          if (err2) {
            error=true;
          } 
        })
      }
    })
  }) 
  if (error) {
    res.send("Problem when uploading files").status(500);
  } else
  return res.send("Files uploaded sucessfully").status(200);
});



///// ajout d'image à la création d'un produit
router.post("/add/image/", upload.array("file"), (req, res, next) => {
  console.log('post image product')
  let error = false;
  ///// récupération id du produit ajouté
  connection.query(
    "SELECT product_id FROM product ORDER BY product_id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération de l'id du produit");
      } else {
        const recuperationIdProduct = results[0].product_id;
        console.log("recuperationIdProduct", recuperationIdProduct)

        req.files.map(file => {
          let Timestamp = Math.round(new Date().getTime() / 1000);
          let FileName = file.originalname;
          let regex1 = /\’\”\;\,\*\./gi;
          let NewFileName = FileName.replace(regex1, "").split(" ").join("").toLowerCase();
          fs.rename(file.path, `public/${Timestamp}${NewFileName}`, err => {
            if (err) {
              error = true;
            } else {
              const objectFile = {
                image_name: `public/${Timestamp}${NewFileName}`,
                is_slider_image: 0,
                image_url: `public/${Timestamp}${NewFileName}`,
                image_product_id: recuperationIdProduct
              };
              /////// ajout des images dans la bdd
              connection.query("INSERT INTO image SET ?", objectFile, err2 => {
                if (err2) {
                  error = true;
                  res.status(500).send("Problem when uploading files");
                } else {
                  //// récupération de l'id de l'image de couverture
                  connection.query(
                    "SELECT image_id FROM image ORDER BY image_id DESC LIMIT 1",
                    (err, results) => {
                      if (err) {
                        res.status(500).send("Erreur lors de la récupération de l'id de l'image");
                      } else {
                        const recuperationIdImage = results[0].image_id;
                        connection.query(
                          `UPDATE product SET product_cover_image_id=${recuperationIdImage} WHERE product_id=${recuperationIdProduct}`,
                          (err, results) => {
                            if (err) {
                              console.log("erreur back", err);
                              res.status(500).end("Erreur lors de la modification de l'image de couverture du produit");
                            } else {
                              res.status(200).end('image bien modifiée');
                            }
                          }
                        );
                      }
                    }
                  );
                }
              });
            }
          });
        });
      }
    }
  );
});


module.exports = router