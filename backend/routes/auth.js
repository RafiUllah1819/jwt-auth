const router = require("express").Router();
const bcrypt = require("bcrypt");
let User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

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
    await newUser.save();
    res
      .status(200)
      .send({ success: true, message: "User registerd successfully" });
  } catch (error) {
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

// router.route("/:id").get((req, res) => {
//   User.findById(req.params.id)
//     .then((user) => res.json(user))
//     .catch((err) => res.status(400).json("Err :") + err);
// });

// router.route("/:id").delete((req, res) => {
//   User.findByIdAndDelete(req.params.id)
//     .then(() => res.json("user deleted"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

module.exports = router;
