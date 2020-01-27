const express = require("express");
const connection = require("../../conf");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/" });
const fs = require("fs");

router.get("/", (req, res) => {
  res.send("je suis sur la route /collection ").status(200);
});

router.get("/all/:request", (req, res) => {
  connection.query(
    `SELECT c.*, i.image_name, COUNT(p.product_id) as nb_items FROM collection as c LEFT OUTER JOIN image as i ON i.image_id = c.collection_cover_image_id LEFT OUTER JOIN product as p ON p.product_collection_id = c.collection_id GROUP BY c.collection_id ORDER BY c.collection_name ${req.params.request}`,
    (err, results) => {
      if (err) {
        console.log(err);
        res
          .send("Erreur lors de la récupération des collections" + err)
          .status(500);
      } else {
        res.json(results);
      }
    }
  );
});

router
  .route(["/:id", "/"])
  .get(function(req, res) {
    connection.query(
      `SELECT * FROM collection WHERE collection_id = ${req.params.id}`,
      (err, results) => {
        if (err) {
          res
            .status(500)
            .send("Erreur lors de la récupération d'une collection");
        } else {
          res.json(results);
        }
      }
    );
  })
  .post(function(req, res) {
    const formData = req.body;
    connection.query(
      "INSERT INTO collection SET ?",
      formData,
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de l'ajout d'une collection");
        } else {
          res.status(200);
        }
      }
    );
  })
  .put(function(req, res) {
    const formData = req.body;
    connection.query(
      `UPDATE collection SET ? WHERE collection_id= ${req.params.id}`,
      [formData],
      err => {
        if (err) {
          console.log(err);

          res
            .status(500)
            .send("Erreur lors de la modification d'une collection");
        } else {
          res.status(200);
        }
      }
    );
  })
  .delete(function(req, res) {
    const id = req.params.id
    connection.query("SET FOREIGN_KEY_CHECKS=0",(err, results) => {
      //ajouter un produit
      if (err) {
        // console.log(err);
        
        res.status(500).send("Erreur lors de la modification d'une collection");
      } else {
        connection.query(
          `DELETE FROM collection WHERE collection_id=${req.params.id}`,
          err => {
            if (err) {
              console.log("err delete coll", err);
              res
                .status(500)
                .send("Erreur lors de la suppression d'une collection");
            } else {
              console.log(req.params)
              connection.query(
                `SELECT image_name FROM image WHERE image_collection_id = ${id}`,
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
                        `DELETE FROM image WHERE image_collection_id=${id}`,
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

/////////////// Récupérer les images de la  collection sauf l'image en cover ///////////
/////////////////////////////////////////////////////////////////////////////////

router
  .route(["/image/:id", "/image"])
  .get(function(req, res) {
    //récup un produit
    connection.query(
      `SELECT image_id FROM image JOIN collection ON image_id = collection_cover_image_id WHERE collection_id= ${req.params.id}`,
      (err1, res1) => {
        if (err1) {
          res
            .status(500)
            .send(
              "Erreur lors de la récupération de l'image de couverture de la collections"
            );
          console.log("erreur recup image", err);
        } else if (!res1[0]) {
          connection.query(
            `SELECT * FROM image WHERE image_collection_id = ${req.params.id} ORDER BY image_id ASC`,
            (err, results) => {
              if (err) {
                res
                  .status(500)
                  .send(
                    "Erreur lors de la récupération des images de la collection"
                  );
              } else {
                res.json(results);
              }
            }
          );
        } else {
          const coverImageId = res1[0].image_id;
          connection.query(
            `SELECT * FROM image WHERE image_collection_id = ${req.params.id}  AND image_id != ${coverImageId} ORDER BY image_id ASC`,
            (err, results) => {
              if (err) {
                res
                  .status(500)
                  .send(
                    "Erreur lors de la récupération des images de la collection"
                  );
                console.log("erreur  recup image", err);
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
          res.send("Erreur lors de la recuperation du nom d'image").status(500);
        } else {
          const path = result[0].image_name;
          console.log("image name", path);
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
            console.error(err);
          }
        }
      }
    );
  });

// Gestion Image de couverture de la collection
router
  .route(["/image-cover/:id", "/image-cover/:id/:collectionId"])
  .get(function(req, res) {
    //récup un produit
    connection.query(
      `SELECT * FROM image JOIN collection ON image_id = collection_cover_image_id WHERE collection_id= ${req.params.id}`,
      (err, results) => {
        if (err) {
          res
            .status(500)
            .send(
              "Erreur lors de la récupération de l'image de couverture de la collection"
            );
          console.log("erreur  recup image", err);
        } else {
          res.json(results);
        }
      }
    );
  })
  .put(function(req, res) {
    // modifier image produit
    const ImageId = req.params.id;
    const collectionId = req.params.collectionId;
    console.log("imageid", ImageId);
    console.log("collectionid", collectionId);
    connection.query(
      `UPDATE collection SET collection_cover_image_id=${ImageId} WHERE collection_id=${collectionId}`,
      (err, results) => {
        if (err) {
          console.log("erreur back", err);
          res
            .status(500)
            .send(
              "Erreur lors de la modification de l'image de couverture de la collection"
            );
        } else {
          console.log(results);
          res.sendStatus(200);
        }
      }
    );
  });

///////// ajout image collection
router.post("/image/:id", upload.array("file"), (req, res, next) => {
  let error = false;

  console.log("file cote back", req.files);
  req.files.map(file => {
    let Timestamp = Math.round(new Date().getTime() / 1000);
    let FileName = file.originalname;
    let regex1 = /\’\”\;\,\*\./gi;
    let NewFileName = FileName.replace(regex1, "")
      .split(" ")
      .join("")
      .toLowerCase();

    fs.rename(file.path, `public/${Timestamp}${NewFileName}`, err => {
      if (err) {
        error = true;
      } else {
        const objectFile = {
          image_name: `public/${Timestamp}${NewFileName}`,
          is_slider_image: 0,
          image_url: `public/${Timestamp}${NewFileName}`,
          image_collection_id: `${req.params.id}`
        };
        connection.query("INSERT INTO image SET ?", objectFile, err2 => {
          if (err2) {
            error = true;
          }
        });
      }
    });
  });
  if (error) {
    res.send("Problem when uploading files").status(500);
  } else return res.send("Files uploaded sucessfully").status(200);
});

module.exports = router;
