const express = require("express");
const app = express();
const axios = require("axios").default;
const func = require("./functions");

// mySql initialization 🗃️
const mysql = require("mysql");
const db = require("./database");
const connection = mysql.createConnection(db);

// Body-parser 🍀
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Firebase initialization 🚀
const firebase = require("firebase");
const firebaseConfigs = require("./firebaseConfigs");
firebase.initializeApp(firebaseConfigs);

app.post("/register", (req, res) => {
  const _user = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };
  const register = func.register(_user);
  const objRegisterErrors = Object.keys(register).length;

  if (objRegisterErrors == 0) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(_user.email, _user.password)
      .then((user) => {
        const uid = user.user.uid;
        connection.connect((err) => {
          if (err) console.log(err);
          else {
            console.log("Database Connected");

            // Create user to sql database server

            var sql = `INSERT INTO users (uid, username, firstName, lastName, email) VALUE ('${uid}', '${_user.username}', '${_user.firstName}', '${_user.lastName}', '${_user.email}')`;
            connection.query(sql, (_err, result) => {
              if (_err) console.log(_err);
              console.log(result);
            });
          }
        });

        return res.status(201).json({ message: user });
      })
      .catch((err) => {
        return res.status(400).json({ message: err });
      });
  } else res.status(400).json({ message: register });
});

app.post("/login", (req, res) => {
  const _user = {
    email: req.body.email,
    password: req.body.password,
  };

  firebase
    .auth()
    .signInWithEmailAndPassword(_user.email, _user.password)
    .then((user) => {
      return res.status(201).json({ message: user });
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });
});

app.get("/users", async (req, res) => {
  var sql = "SELECT * FROM users";
  connection.query(sql, (err, res) => {
    if (err) console.log(err);
    console.log(res);
  });
  res.json("Done ...");
});

app.get("/testQRCode", async (req, res) => {
  const URL =
    "http://api.qrserver.com/v1/create-qr-code/?data=https://github.com/BlueBearrii&size=100x100";
  const getAPI = await axios.get(URL);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running || Port : ${PORT}`);
});
