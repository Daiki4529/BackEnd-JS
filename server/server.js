const express = require("express");
require("./models/db");
const UsersRouter = require("./routes/usersDb");
const ProductsRouter = require("./routes/productsDb");
const SecurityRouter = require("./routes/security");

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Hello world");
});

app.post("/", (req, res, next) => {
  res.send("Hello world from POST : " + JSON.stringify(req.body));
});

app.put("/", (req, res, next) => {
  res.send("Hello world from PUT : " + JSON.stringify(req.body));
});

app.use(ProductsRouter);
app.use(UsersRouter);
app.use(SecurityRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
