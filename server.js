const express = require("express");
const productRouter = require("./routers/products");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.use("/products", productRouter);

app.get("/", (request, response, next) => {
  response.send("hello I'm the server");
});

app.listen(PORT, () => {
  console.log(`Listening to :`, PORT);
});
