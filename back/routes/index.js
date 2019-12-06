// Routes collection-category
const category = require("./collection-category/category")
const collection = require("./collection-category/collection")

// Routes front-end
const headerCategory = require("./front-end/header-category")
const headerCollection = require("./front-end/header-collection")
const imageSlider = require("./front-end/image-slider")

// Routes order
const order = require("./order/order")

// Routes product
const product = require("./product/product")

// Routes code-promo
const codePromo = require("./promo/code-promo")
const promo = require("./promo/promo")

// Routes user
const user = require("./user/user")

module.exports = { category, collection, headerCategory, headerCollection, imageSlider, order, product, codePromo, promo, user}