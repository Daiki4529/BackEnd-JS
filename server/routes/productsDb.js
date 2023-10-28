const { Router } = require("express");
const Product = require("../models/Product");
const router = new Router();

router.get("/products", async (req, res, next) => {
  res.json(
    await Product.findAll({
      where: req.query,
    })
  );
});

router.post("/products", async (req, res, next) => {
  try {
    res.status(201).json(await Product.create(req.body));
  } catch (err) {
    res.status(422).json({
      message: err.message,
    });
  }
});

router.get("/products/:id", async (req, res, next) => {
  const product = await Product.findByPk(parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.sendStatus(404);
  }
});

router.patch("/products/:id", async (req, res, next) => {
  try {
    const result = await Product.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (result[0] === 0) {
      res.sendStatus(404);
    } else {
      res.json(await Product.findByPk(parseInt(req.params.id)));
    }
  } catch (err) {
    res.status(422).json({
      message: err.message,
    });
  }
});

router.delete("/products/:id", async (req, res, next) => {
  const result = await Product.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.sendStatus(result === 0 ? 404 : 204);
});

router.put("/products/:id", async (req, res, next) => {
  try {
    const result = await Product.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res
      .status(result === 1 ? 200 : 201)
      .json(await Product.create({ ...req.body, id: parseInt(req.params.id) }));
  } catch (err) {
    res.status(422).json({
      message: err.message,
    });
  }
});

module.exports = router;
