
const { required } = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    amount:{
      type:Number,
      required:true,
    },
    description: {
      type: String,
      required: true,
    },
  
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;