const { Router } = require("express");

const router = new Router();

// CRUD (Create (POST), Read (GET), Replace (PUT), Update (PATCH), Delete (DELETE...))

const users = [];

// On lit la liste des users
// Voir https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP pour les codes
router.get("/users", (req, res, next) => {
  // res.status(200).send(JSON.stringify(users));
  // 200 (succès) est par défaut, on peut utiliser le prototype .json pour ce cas
  res.json(users);
});

// Création d'un utilisateur
router.post("/users", (req, res, next) => {
  try {
    const user = req.body;
    user.id = Date.now(); // Pour se simplifier la vie, on mets le timestamp pour l'id
    // Si l'utilisateur n'a pas d'email, on a pas tous les champs donc erreur
    if (user.email === undefined) {
      throw new Error("Email not found.");
    }
    users.push(user);
    // 201 => création, on ne peut pas prendre la valeur par défaut
    res.status(201).json(user);
  } catch (error) {
    res.status(422).json({
      email: error.message,
    });
  }
});

// On récupère un utilisateur avec son id
router.get("/users/:id", (req, res, next) => {
  // On récupère l'utilisateur dont l'id est dans les paramètres de la requête
  const user = users.find((user) => user.id === req.params.id);
  // Si il existe
  if (user) {
    res.json(user);
  } else {
    // res.status(404).end();
    res.sendStatus(404);
  }
});

// On modifie un utilisateur
router.patch("/users/:id", (req, res, next) => {
  try {
    // On cherche l'index de l'utilisateur dans la liste des users
    const userIndex = users.findIndex((user) => user.id === req.params.id);
    // Si il n'existe pas
    if (userIndex === -1) {
      // On envoie un 404
      res.sendStatus(404);
    } else {
      // On écrase l'utilisateur dans la liste des users
      const user = Object.assign({}, users[userIndex], req.body);
      if (user.email === undefined) {
        throw new Error("Email not found.");
      }
      users[userIndex] = user;
      res.json(user);
    }
  } catch (error) {
    res.status(422).json({
      email: error.message,
    });
  }
});

// Delete
router.delete("/users/:id", (req, res, next) => {});

// Replace
router.put("/users/:id", (req, res, next) => {});
