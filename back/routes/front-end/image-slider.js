const express = require("express")
const connection = require('../../conf')
const router = express.Router()
////// AJOUT JENNY
const multer = require("multer");
const upload = multer({ dest: "public/" });
const fs = require("fs");
//////////////////



router.get('/', (req, res) => {
    res.send("je suis sur la route /image-slider ").status(200)
})



///////// Route JENNY
router.post("/", upload.array("file"), (req, res, next) => {

  req.files.map(file => {

    let Timestamp = Math.round(new Date().getTime() / 1000)
    let FileName = file.originalname
    let regex1 = /\’\”/gi;
    let NewFileName = FileName.replace(regex1,"").split(" ").join("").toLowerCase()
    console.log('name', FileName)
    console.log('newname', NewFileName)

    fs.rename(file.path, `public/${Timestamp}${NewFileName}`, err => {
      if (err) {
        return res.send("Problem during travel").status(500);
      } else {
        const objectFile = {
          image_name : `public/${Timestamp}${NewFileName}`,
          is_slider_image : 1,
          image_url : `public/${Timestamp}${NewFileName}`,
        }
        connection.query("INSERT INTO image SET ?", objectFile, err => {
          if (err) {
            return res.send("Error ocurred").status(500);
          }
        })
      }
    })
  })
  return res.send("Files uploaded sucessfully").status(200);
});



router
  .route(["/all", "/", "/:id"])
  //////// AFFICHER TOUTES LES IMAGES
  .get(function(req, res, next) {
    //http://localhost:3000/image-slider/all
    connection.query(
      `SELECT * FROM image WHERE is_slider_image = '1' ORDER BY image_id ASC`,
      (err, results) => {
        if (err) {
          res
            .status(500)
            .send("Erreur lors de la récupération des images du slider");
        } else {
          res.json(results);
        }
      }
    );
  })

  // ////// SUPPRIMER UNE IMAGE SUR BDD (FONCTIONNEL)
  // .delete(function (req, res) {
  //   connection.query(`DELETE FROM image WHERE image_id=${req.params.id}`, (err, result) => {
  //     if (err) {
  //       res.status(500).send("Erreur lors de la suppression d'une image");
  //     } else {
  //       res.sendStatus(200);
  //     }
  //   });
  // })

  // //////// SUPPRIMER IMAGE SUR SERVER (FONCTIONNEL)
  // .delete(function (req, res) {
  //     connection.query(`SELECT image_name FROM image WHERE image_id = ${req.params.id}`, (err, result) => {
  //       if (err) {
  //         res.send("Erreur lors de la recuperation du nom d'image").status(500)
  //       } else {
  //       const path = result[0].image_name;
  //       console.log("image name", path)
  //       try {
  //         fs.unlinkSync(path)
  //         res.send("image bien supprimée").status(200);
  //         //file removed
  //       } catch(err) {
  //         console.error(err)
  //       }
  //     }
  //   })
  // })

  ////// SUPPRIMER UNE IMAGE BDD ET SERVEUR

  .delete(function(req, res) {
    connection.query(`SELECT image_name FROM image WHERE image_id = ${req.params.id}`, (err, result) => {
        if (err) {
          res.send("Erreur lors de la recuperation du nom d'image").status(500);
        } else {
          const path = result[0].image_name;
          console.log("image name", path);
          try {
            fs.unlinkSync(path);
            connection.query(`DELETE FROM image WHERE image_id=${req.params.id}`, (err, result) => {
                if (err) {
                  res.status(500).send("Erreur lors de la suppression d'une image dans la bdd");
                } else {
                  res.send("image bien supprimée").status(200);
                }
              });
          } catch (err) {
            res.status(500).send("Erreur lors de la suppression d'une image dans le serveur public");
            console.error(err);
          }
        }
      }
    );
  });


 module.exports = router


