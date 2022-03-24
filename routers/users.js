const { Router } = require("express");
const bcrypt = require("bcrypt");
const { hashSync } = require("bcrypt");
const Users = require("../models").user;
const router = new Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkEmail = await Users.findOne({ where: { email: email } });
    if (!name || !email || !password) {
      res.status(404).send("please add email, name and password!");
    } else if (checkEmail) {
      res.status(404).send("email is already exist");
    } else if (password.length < 6) {
      res.send("password should be 6 characters long!");
    } else {
      const createUser = await Users.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      });
      res.send(createUser);
      console.log(createUser);
    }
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.findAll();
    if (!users) {
      res.status(404).send("user not found!");
    } else {
      res.send(users);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
