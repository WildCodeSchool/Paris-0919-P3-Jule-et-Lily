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
          image_url : "http://localhost:4000/public/" + file.originalname,
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


router.route(['/all', '/', ':id' ])

    .get(function (req, res, next) {   //http://localhost:3000/image-slider/all
        connection.query(`SELECT * FROM image WHERE is_slider_image = '1' ORDER BY image_id ASC`, (err, results) => {
          if (err) {
            res.status(500).send('Erreur lors de la récupération des images du slider');
          } else {
            res.json(results);
          }
        })
      })

      // .post(function (req, res) {   //http://localhost:3000/image-slider/
      //   const formData = req.body;
      //   connection.query('INSERT INTO image SET ?', formData, (err, results) => {
      //     if (err) {
      //       res.status(500).send("Erreur lors de l'ajout d'une image dans le slider");
      //     } else {
      //       res.sendStatus(200);
      //     }
      //   })
      // })

      .put(function (req, res) {  // http://localhost:3000/image-slider/4
        const formData = req.body;
        connection.query(`UPDATE image SET ? WHERE image_id=${req.params.id}`, formData, (err, results) => {
          if (err) {
            res.status(500).send("Erreur lors de la modification d'une image dans le slider");
          } else {
            res.sendStatus(200);
          }
        })
      })

      .delete(function (req, res) {    //  http://localhost:3000/image-slider/5
        connection.query(`DELETE FROM image WHERE image_id=${req.params.id}`, (err, results) => {
          if (err) {
            res.status(500).send("Erreur lors de la suppression d'une image");
          } else {
            res.sendStatus(200);
          }
        })
      })







      module.exports = router





// ///////// Route JENNY
// router.post("/file", upload.array("file"), (req, res, next) => {
//   req.files.map(file => {
//     fs.rename(file.path, "public/" + file.originalname, err => {
//       if (err) {
//         return res.send("Problem during travel").status(500);
//       } else {
//         const objectFile = {
//           name : "public/" + file.originalname
//         }
//         connection.query("INSERT INTO file SET ?", objectFile, err => {
//           if (err) {
//             return res.send("Error ocurred").status(500);
//           }
//         })
//       }
//     })
//   })
//   return res.send("Files uploaded sucessfully").status(200);
// });
