const { Router } = require("express");

const Products = require("../models").product;
const Categories = require("../models").category;
const router = new Router();

router.get("/", async (request, response, next) => {
  try {
    const allProducts = await Products.findAll({ include: [Categories] });
    response.send(allProducts);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.get("/:id", async (request, response, next) => {
  const { id } = request.params;
  try {
    const productById = await Products.findByPk(id, { include: [Categories] });
    response.send(productById);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
