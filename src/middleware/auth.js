const User = require("../models/user");
const { verifyAuthToken } = require("../utils/helpers");

const authHandler = async (req, res, next) => {
  if (!req.headers.api) {
    return res
      .status(400)
      .send({ message: "Access denied, Auth token is not provided" });
  }

  try {
    const token = req.headers.token;
    const isTokenValid = verifyAuthToken(token);
    if (isTokenValid) {
      const user = await User.findOne({ token: token });
      if(user){
        next();
      }else{
        return res.status(400).send({ message: "Access denied, Expired token" });
      
      }
     
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
    next();
  }

  // if (
  //   req.headers.api !== undefined
  // ) {
  //   next();
  // } else {
  //   return res.status(404).send({ message: "API key is not valid!" });
  // }
};
// 2864de72-1451-44f8-8882-38e6d3c3fd0f
module.exports = authHandler;
