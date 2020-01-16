const express = require("express");
const router = express.Router();
const connection = require('../../conf')


router.route("/:login")
  .get((req, res) => {
      // console.log(req);
      
    connection.query(
        "SELECT user_login, user_password, user_email FROM user WHERE user_login = ?",
        [req.params.login],
        (err, result) => {
          if (err) {
            res.json({ flash: err.message, error: true }).status(500);
          } else {
              // console.log(result);
            res.json({ user_email : result[0].user_email, user_login: result[0].user_login, user_password: result[0].user_password }).status(200);
          }
        }
      );
});

module.exports = router;