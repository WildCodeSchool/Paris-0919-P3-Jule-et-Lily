const express = require('express');
const morgan = require('morgan')
const app = express();
const port = 5000;
const connection = require('./conf');
const bodyParser = require('body-parser');
const route = require("./routes/index")

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

app.get('/', (req, res) => {
    res.send("Bienvenue chez jule et lily !").status(200)
})

app.listen(port, (err) => console.log(`Server is listening on ${port}`))