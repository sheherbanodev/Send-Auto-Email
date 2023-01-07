const express = require("express");
const errorHandler = require("../../middleware/error");
const User = require("../../models/user");
const { generateAuthToken } = require("../../utils/helpers");
const createUserSchema = require("./validationSchema");
const authHandler=require("../../middleware/auth");
const cookie = require('cookie');
const { FormateUserObj } = require("./UserFormatter");
const router = express.Router();
const {sendEmail}=require("./email")

// create a get route

router.get(
  "/",
  errorHandler(async (req, res) => {
    if(req.headers.limit!==undefined){
      const limit=req.headers.limit;
      const skip=req.headers.skip;
      const users = await User.find().
      limit(limit).skip(skip).sort({ username: 1 })
    res.status(200).send(users);
    }else{
      const users = await User.find();
    res.status(200).send(users);
    }
    
  })
);

// create a get one by id route

router.get(
  "/viewProfile/:userId",
  errorHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId });
    const authToken = req.headers.authorization;
    if (authToken !== user.authToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const UserObj = FormateUserObj(user);
    res.status(200).send({
      status: true,
      message: "user found successfully",
      data: UserObj,
    });
  })
);
router.put(
  "/editProfile/:userId",
  errorHandler(async (req, res) => {
    const user = await User.findOneAndUpdate({ _id: req.params.userId });

    const UserObj = FormateUserObj(user);
    res.status(200).send({
      status: true,
      message: "user found successfully",
      data: UserObj,
    });
  })
);
router.delete(
  "/deleteProfile/:userId",
  errorHandler(async (req, res) => {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    res.status(200).send(user);
  })
);

// create a login route

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  if (req.body.password !== user.password) {
    return res.status(400).send({ message: "Invalid Password" });
  }

  const token = generateAuthToken({
    username: user.username,
    email: user.email,
    id: user._id,
  });
  user.token=token
   await User.findOneAndUpdate({_id: user._id},{token:token})
  
  const data = {
    username: user.username,
    email: user.email,
    id: user._id,
  };
 
  // res.cookie('token', token, { httpOnly: true });
  const UserObj = FormateUserObj(user);
  res.status(200).send({
    status: true,
    message: "Login successfully",
    token,
    data: UserObj,
  });
});

// create a get signup route

router.post("/signup", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  if (req.body.password !== user.password) {
    return res.status(400).send({ message: "Invalid Password" });
  }

  const token = generateAuthToken({
    username: user.username,
    email: user.email,
    id: user._id,
  });
  user.token=token
   await User.findOneAndUpdate({_id: user._id},{token:token})
  
  const data = {
    username: user.username,
    email: user.email,
    id: user._id,
  };
 
  // res.cookie('token', token, { httpOnly: true });
  const UserObj = FormateUserObj(user);
  sendEmail()
  res.status(200).send({
    
    status: true,
    //sendEmail,
    message: "signup successfully",
    token,
    data: UserObj,
    
  });
});

router.post("/", async (req, res) => {
  const payload = req.body;
  const { error } = createUserSchema(payload);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  let user = new User(payload);

  user = await user.save();
  res.status(200).send({ user });
});
// router.get(
//   "/verifyUser",
//   authHandler,
//   errorHandler(async (req, res) => {
//     const user = await User.findOne({ token: req.headers.token });
//     await User.findOneAndUpdate({ _id: user._id }, { token: "" });
//     res.status(200).send({
//       status: true,
//       message: "verify successfully",
//     });
//   })
// );


// function generateToken() {
//   return uuid.v4();
// }

// router.get('/logout', authHandler,async (req, res) => {
//   // Clear the token from the client side
//   const user = await User.findOne({ token: req.headers.token });
//   await User.findOneAndUpdate({ _id: user._id }, { token: "" });
//   res.send('Logged out successfully');
// });
router.get(
  "/logout",
  authHandler,
  errorHandler(async (req, res) => {
    const user = await User.findOne({ token: req.headers.token });
    await User.findOneAndUpdate({ _id: user._id }, { token: "" });
    res.status(200).send({
      status: true,
      message: "Logout successfully",
    });
  })
);


module.exports = router;
