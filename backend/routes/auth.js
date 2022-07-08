const router = require("express").Router();
const bcrypt = require("bcrypt");
let User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const sendEmail = require("../utils/sendEmail")
const Token = require('../models/tokenModel')

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//new user register route
router.route("/register").post(async (req, res) => {
  try {
    // checking for user already exist
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res
        .status(200)
        .send({ success: false, message: "User already registered" });

    // bcrypt hash password
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;

    // register new user
    // const { name ,email, password} = req.body;
    const newUser = new User(req.body);
    const result = await newUser.save();
    await sendEmail(result, 'verifyemail')
    res
      .status(200)
      .send({ success: true, message: "User registerd successfully" });
  } catch (error) {
    console.log(error)
    res.status(400).json("Error :" + err);
  }
});

// User login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const passwordsMatched = await bcrypt.compare(
        req.body.password,
        user.password 
      );
      if (passwordsMatched) {
        const dataToBeSentToFrontend = {
          _id: user._id,
          email: user.email,
          name: user.name,
        };
        const token = jwt.sign(dataToBeSentToFrontend, "SHEY", {
          expiresIn: 60 * 60,
        });
        res.status(200).send({
          success: true,
          message: "User login successfully",
          data: token,
        });
      } else {
        res.status(200).send({ success: false, message: "Incorrect password" });
      }
    } else {
      res
        .status(200)
        .send({ success: false, message: "User does not exist", data: null });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/verifyemail', async(req,res)=>{
  try {
    console.log(req.body.token)
    const tokenData = await Token.findOne({token: req.body.token})
    if(tokenData){
      await User.findByIdAndUpdate({ _id: tokenData.userid , isVerified: true})
      await Token.findByIdAndDelete({token: req.body.token})
      res.send({success: true, message: "Email Verified Successfully"})
    }else{
      res.send({success: false, message: "Invalid token"})
    }
  } catch (error) {
    res.status(500).send(error)
  }
})


module.exports = router;
