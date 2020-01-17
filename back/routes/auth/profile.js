const express = require("express");
const bcrypt = require('bcrypt')
const router = express.Router();
const connection = require('../../conf')


router.route("/:login")
  .get((req, res) => {
    connection.query(
      "SELECT user_login, user_password, user_email FROM user WHERE user_login = ?",
      [req.params.login],
      (err, result) => {
        if (err) {
          res.json({ flash: err.message, error: true }).status(500);
        } else {
          console.log('result',result);
          res.json({ user_email: result[0].user_email, user_login: result[0].user_login, user_password: result[0].user_password }).status(200);
        }
      }
    );
  })
// Modif du profil 
router.route('/:email')
  .post(function (req, res) {
    const requestProfile = req.params.email;
    console.log('pass',req.body.user_password)
    let hash = bcrypt.hashSync(req.body.user_password, 10);
    const formData = {user_email : req.body.user_email, user_login: req.body.user_login}
    connection.query('UPDATE user SET ?, user_password= ? WHERE user.user_email=? ', [formData, hash, requestProfile, hash], (err) => {
      if (err) {
        console.log(err)
        res.status(500).send('erreur lors de la modification')
      } else {
        res.status(200).json({ flash: "Les données sont modifiées", error: false })
      }
    })
  })

module.exports = router;