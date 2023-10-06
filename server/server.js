const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  const bufferList = [];
  req.on("data", (chunch) => bufferList.push(chunch));
  req.on("end", () => {
    console.log(JSON.parse(Buffer.concat(bufferList).toString()));
    res.send("GET request to the homepage");
  });
});

app.post("/", function (req, res, next) {
  const bufferList = [];
  req.on("data", (chunch) => bufferList.push(chunch));
  req.on("end", () => {
    console.log(JSON.parse(Buffer.concat(bufferList).toString()));
    res.send("POST request to the homepage");
  });
});

app.put("/", function (req, res, next) {
  const bufferList = [];
  req.on("data", (chunch) => bufferList.push(chunch));
  req.on("end", () => {
    console.log(JSON.parse(Buffer.concat(bufferList).toString()));
    res.send("PUT request to the homepage");
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
