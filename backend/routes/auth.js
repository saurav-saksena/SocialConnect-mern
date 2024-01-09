const router = require("express").Router();
const User = require("../models/User");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifyuser = require("../verifyuser");
// create new user for signup endpoint /api/auth/register method:POST
router.post("/register", async (req, res) => {
  try {
    // checking whether user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .send({ msg: "user with this email id already exist" });
    }
    let bodyPassword = req.body.password;
    if (!bodyPassword) {
      return res.status(400).send({ msg: "email and password required" });
    }
    //hashing password for security reasons
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(bodyPassword, salt);
    // creating new user
    user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: secPassword,
    });
    res.send({ success: "signed up successfully", user });
    //handling errors
  } catch (error) {
    if (error.keyValue) {
      res.status(400).send({ msg: "user  already exists" });
    } else if (error.errors.username) {
      res.status(400).send({ msg: "username is required" });
    } else if (error.errors.email) {
      res.status(400).send({ msg: "email is required" });
    } else if (error.errors.password) {
      res.status(400).send({ msg: "please create password" });
    } else {
      res.status(500).send({ msg: "something went wrong !" });
    }
  }
});

// login end point for user to get access to application api/auth/login method:POST
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ msg: "email and password required" });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "invalid email or password" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send({ msg: "invalid email or password" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = Jwt.sign(data, process.env.SEC_KEY);
    res.send({ success: true, authToken });
  } catch (error) {
    res.status(500).send({ msg: "something went wrong" });
  }
});

router.get("/verifieduserdetails", verifyuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send({ success: true, user });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
});
module.exports = router;
