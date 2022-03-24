const { Router } = require("express");
const bcrypt = require("bcrypt");
const { hashSync } = require("bcrypt");
const Users = require("../models").user;
const { toJWT, toData } = require("../auth/jwt");

const router = new Router();

router.post("/login", async (request, response, next) => {
  console.log(request.body);

  const { email, password } = request.body;
  if (!email || !password) {
    response.status(404).send(`Please provide a email and password`);
    return;
  }
  try {
    const user = await Users.findOne({ where: { email: email } });
    //   console.log(user);
    if (!user) {
      response.status(404).send("User not found");
      return;
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = toJWT({ userId: user.id });
      response.status(200).send(token);
      return;
    }

    response.status(404).send("Password not correct");
  } catch (e) {
    console.log(e);
    next();
  }
});



module.exports = router;
