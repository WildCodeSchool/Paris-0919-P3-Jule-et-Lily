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
    fs.rename(file.path, "public/" + file.originalname, err => {
      if (err) {
        return res.send("Problem during travel").status(500);
      } else {
        const objectFile = {
          image_name : "public/" + file.originalname,
          is_slider_image : 1,
          image_url : "public/" + file.originalname,
        }
        console.log('objectFile', objectFile)
        console.log('path', file.path)
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



router.route(['/all', '/', '/:id'])
//////// AFFICHER TOUTES LES IMAGES
    .get(function (req, res, next) {   //http://localhost:3000/image-slider/all
        connection.query(`SELECT * FROM image WHERE is_slider_image = '1' ORDER BY image_id ASC`, (err, results) => {
          if (err) {
            res.status(500).send('Erreur lors de la récupération des images du slider');
          } else {
            res.json(results);
          }
        })
      })


// ////// SUPPRIMER UNE IMAGE SUR BDD
// .delete(function (req, res) {       
//   connection.query(`DELETE FROM image WHERE image_id=${req.params.id}`, (err, result) => {
//     if (err) {
//       res.status(500).send("Erreur lors de la suppression d'une image");
//     } else {
//       res.sendStatus(200);
//     }
//   });
// })

//////// SUPPRIMER IMAGE SUR SERVER 
.delete(function (req, res) { 
    const path = res[0].image_name;
    const path2 = JSON.stringify(path)

    console.log("image name", path)
    console.log("image name2", path2)

  try {
    fs.unlinkSync(path)
    res.send("image bien supprimée").status(200);
    //file removed
  } catch(err) {
    console.error(err)
  }
}

////// SUPPRIMER UNE IMAGE BDD ET SERVEUR
// .delete(function (req, res) { 

//       connection.query(`SELECT image_name FROM image WHERE image_id = ${req.params.id}`, (err, result) => {
//         if (err) {
//           res.send("Erreur lors de la recuperation du nom d'image").status(500)
//         } else {
//           const path = res[0].image_name;
//           const path2 = JSON.stringify(path)

//           console.log("image name", path)
//           console.log("image name2", path2)

//           fs.unlink(path2, (err) => {
//             if (err) {
//               res.send("Erreur lors de la suppression d'une image sur le serveur").status(500)
//               return

//             } else {
//               connection.query(`DELETE FROM image WHERE image_id=${req.params.id}`, (err, result) => {
//                 if (err) {
//                   res.status(500).send("Erreur lors de la suppression d'une image");
//                 } else {
//                   res.sendStatus(200);
//                 }
//               });
//             }  
//           }) 
//         }
//     })
// });  
   

      module.exports = router


