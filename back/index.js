const express = require('express');
const morgan = require('morgan')
const app = express();
const port = 4000;
const connection = require('./conf');
const bodyParser = require('body-parser')
const route = require("./routes/index")
const passport = require("passport")
const LocalStrategy = require("passport-local");
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

// morgan error support
app.use(morgan('dev'))
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/category", route.category)
app.use("/collection", route.collection)
app.use("/header-collection", route.headerCollection)
app.use("/image-slider", route.imageSlider)
app.use("/order", route.order)
app.use("/product", route.product)
app.use("/code-promo", route.codePromo)
app.use("/promo", route.promo)
app.use("/user", route.user)
app.use("/auth", route.auth)

app.get('/', (req, res) => {
    res.send("Bienvenue chez jule et lily !").status(200)
})

passport.use(new LocalStrategy(
  { 
    usernameField: 'user_login', 
    passwordField: 'user_password',
    session: false
  }, 
  function (user_login, user_password, cb) {
    console.log(user_login);
    
      connection.query('SELECT user_firstname, user_lastname, user_login, user_password FROM user WHERE user_login=?', user_login, (err, res) => {
          if (err) {
              console.log(err)
              return cb(err);
          } else if (res.length === 0) {
              console.log('res vide',res);
              return cb(null, false, { message: 'Login ou mot de passe incorrect.' });
          } else {
            console.log('res', res)
              return cb(null, res, {info:user_password});
          }   
          }
      )
  }
));

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret"
    },
    function(jwtPayload, cb) {
      return cb(null, jwtPayload);
    }
  )
);

app.listen(port, (err) => console.log(`Server is listening on ${port}`))