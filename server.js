const express = require("express");
const routes = require("./routes");
// import sequelize connection
const sequelize = require("./config/connection");
// import MySQL2
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  // MySQL username,
  user: process.env.DB_USER,
  // TODO: Add MySQL password here
  password: process.env.DB_PASS,
  database: process.env.NAME,
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
