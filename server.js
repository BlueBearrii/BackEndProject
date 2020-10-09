const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const func = require("./functions");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

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

  if (objRegisterErrors == 0)
    return res.status(201).json({ message: " Registered " });
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
