const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const firebase = require("firebase");
const firebaseConfigs = require("./firebaseConfigs");
firebase.initializeApp(firebaseConfigs);

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

connection.connect(function (err) {
  console.log("Connected!");
});

const func = require("./functions");

app.post("/register", (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };
  const register = func.register(user);
  const objRegisterErrors = Object.keys(register).length;

  if (objRegisterErrors == 0) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((user) => {
        return res.status(201).json({ message: user });
      })
      .catch((err) => {
        return res.status(400).json({ message: err });
      });
  }
  //return res.status(201).json({ message: " Registered " });
  else res.status(400).json({ message: register });
});

app.post("/login", (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running || Port : ${PORT}`);
});
