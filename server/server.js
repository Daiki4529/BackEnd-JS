const express = require("express");
const app = express();

/*
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
*/

// Les 3 fonctions du cours 1 sont appelées des "Middleware" => fonctions qui prennent req/res/next
// On peut tout simplifier en une seule fonction

function parseBody(req, res, next) {
  const bufferList = [];
  req.on("data", (chunch) => bufferList.push(chunch));

  req.on("end", () => {
    // On prend le body plutot que de le console.log()
    const body = JSON.parse(Buffer.concat(bufferList).toString());

    // Le body qui n'était pas accessible avant peut être set désormais
    req.body = body;

    // On appelle ensutie le next qui permet de passer à la requête suivante.
    next();
  });
}

// Ainsi :
app.post("/", parseBody, (req, res, next) => {
  res.send("Hello world from POST : " + JSON.stringify(req.body));
});

app.put("/", parseBody, (req, res, next) => {
  res.send("Hello world from PUT : " + JSON.stringify(req.body));
});

// Le get n'a pas de body, on ne passe donc pas par le parseBody puisque la fonction n'aurait aucune utilité
app.get("/", (req, res, next) => {
  res.send("Hello world from GET");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
