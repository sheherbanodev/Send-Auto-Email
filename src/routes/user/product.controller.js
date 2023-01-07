const express = require("express");
const errorHandler = require("../../middleware/error");
const Product = require("../../models/product");
const { generateAuthToken } = require("../../utils/helpers");
const createUserSchema = require("./validationSchema");

const router = express.Router();

// create a get route
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.status(200).send(products);
});

// create a get one product by id 
router.get(
    "/:productId",
    errorHandler(async (req, res) => {
      const product = await Product.findOne({ _id: req.params.productId });
  
      res.status(200).send(product);
    })
  );
  

router.post("/createproduct", async (req, res) => {
  const payload = req.body;

  const { error } = Product(payload);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  let product = new Product(payload);
  product = await product.save();
  res.status(200).send({ product });
});

// Now Create a Update Route
router.patch("/:productId", async (req, res) => {
  const updatedUser = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  try {
    res.status(200).json({
      status: "Success",
      data: {
        updatedUser,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// now create a delete route

router.delete("/:productId", async (req, res) => {
  const id = req.params.productId;
  await Product.findByIdAndRemove(id).exec();
  res.send("Deleted");
});

module.exports = router;
