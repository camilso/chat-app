const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const { validateRegister } = require("../validation/validation");
router.post("/register", async (req, res) => {
  const checkUser = await User.findOne({ username: req.body.username });
  if (checkUser) {
    res.status(403).json("user with that name already exist");
  } else {
    const validate = validateRegister(
      req.body.username,
      req.body.password,
      req.body.confirmPassword
    );
    if (!validate.valid) {
      try {
        //password
        const password = await bcrypt.hash(req.body.password, 12);
        //user create
        const newUser = new User({
          username: req.body.username,
          password: password,
        });
        //user save in database
        const user = await newUser.save();
        //send response
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(404).json(validate.errors);
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).json("user not found");
    } else {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        res.status(200).json(user);
      } else {
        res.status(403).json("wrong password");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
