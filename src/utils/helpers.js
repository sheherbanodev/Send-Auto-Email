// require("dotenv").config();
const jwt = require("jsonwebtoken");

// const privateKey = process.env.JWT_PRIVATE_KEY;
const privateKey="kdjsaiwqiksdnsk"

const generateAuthToken = ({ username, email, id }) =>
  jwt.sign({ username, email, id }, privateKey,{ expiresIn: '30s' });

const verifyAuthToken = (token) => jwt.verify(token, privateKey);
//req.userId = verifyAuthToken.id;

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
