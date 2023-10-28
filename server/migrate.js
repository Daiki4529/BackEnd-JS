const connection = require("./models/db");
require("./models/User");
require("./models/Product")

connection.sync({alter: true}).then(() => console.log("Database synchronized"));
