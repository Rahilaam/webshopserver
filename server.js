const express = require("express");
const productRouter = require("./routers/products");
const userRouter = require("./routers/users");
const authRouter = require("./routers/auth");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.get("/", (request, response, next) => {
  response.send("hello I'm the server");
});

app.listen(PORT, () => {
  console.log(`Listening to :`, PORT);
});
