const express = require("express")
const connection = require('../../conf')
const router = express.Router()
const multer = require("multer");
const upload = multer({ dest: "public/" });
const fs = require("fs");




router.get('/', (req, res) => {
    res.send("je suis sur la route /image-slider ").status(200)
})


///////// Route ajout image
router.post("/image", upload.array("file"), (req, res, next) => {
  let error =  false;
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
          is_slider_image : 1,
          image_url : `public/${Timestamp}${NewFileName}`,
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


///////// Route ajout url
router.put("/url", (req, res) => {
  let error =  false;
 const size = req.body.length
  req.body.map((item,i) => {
    const formdata = {
     image_url: item
    }
    connection.query(`SELECT image_id FROM image ORDER by image_id DESC LIMIT 1 OFFSET ${(size-1)-i}`, (err, result) => {
      let dataId = result[0].image_id
      if (err) {
        error=true;
      } else {
        connection.query(`UPDATE image SET ?  WHERE image_id = ${dataId}`, formdata, err2 => {
        if (err2) {
        error=true;
      } 
    })
  }
}) 
})
if (error) {
  res.send("Problem when updating url").status(500);
} else
return res.send("url uploaded sucessfully").status(200);
})




router.route(["/all", "/", "/:id"])
  //////// AFFICHER TOUTES LES IMAGES
  .get(function(req, res, next) {
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



  ////// SUPPRIMER UNE IMAGE BDD ET SERVEUR

  .delete(function(req, res) {
    connection.query(`SELECT image_name FROM image WHERE image_id = ${req.params.id}`, (err, result) => {
        if (err) {
          res.send("Erreur lors de la recuperation du nom d'image").status(500);
        } else {
          const path = result[0].image_name;
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
          }
        }
      }
    );
  });


 module.exports = router


