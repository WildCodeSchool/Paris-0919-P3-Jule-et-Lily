const express = require("express");
const bcrypt = require('bcrypt')
const router = express.Router();
const connection = require('../../conf')


router.route("/:id")
  .get((req, res) => {
    connection.query(
      "SELECT user_login, user_password, user_email FROM user WHERE user_id = ?",
      [req.params.id],
      (err, result) => {
        if (err) {
          res.json({ flash: err.message, error: true }).status(500);
        } else {
          // console.log('result',result);
          res.json({ user_email: result[0].user_email, user_login: result[0].user_login, user_password: result[0].user_password }).status(200);
        }
      }
    );
  })
// Modif du profil 
router.route('/:id')
  .post(function (req, res) {
    const requestProfile = req.params.id;
    // console.log('pass',req.body.user_password)

    const formData = {user_email : req.body.user_email, user_login: req.body.user_login}
    if (req.body.user_password) {
      let hash = bcrypt.hashSync(req.body.user_password, 10);
      connection.query('UPDATE user SET ?, user_password= ? WHERE user.user_id=? ', [formData, hash, requestProfile, hash], (err) => {
        if (err) {
          // console.log(err)
          res.status(500).send('erreur lors de la modification')
        } else {
          res.status(200).json({ flash: "Les données sont modifiées", error: false })
        }
      })
    }
    else {
      connection.query('UPDATE user SET ? WHERE user.user_id=? ', [formData, requestProfile], (err) => {
        if (err) {
          // console.log(err)
          res.status(500).send('erreur lors de la modification')
        } else {
          res.status(200).json({ flash: "Les données sont modifiées", error: false })
        }
      })
    }
    
  })

module.exports = router;