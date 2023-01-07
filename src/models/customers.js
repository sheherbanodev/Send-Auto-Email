const { required } = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  id:{
    type: String,
    required: true,
    unique: true,
  },
  
  password: String,
  token:String
  
});

const Customer = mongoose.model("Customers", userSchema);

module.exports = Customer;
