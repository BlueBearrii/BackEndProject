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
  const objRegisterLength = Object.keys(register).length;
  
  if (objRegisterLength == 0)
    return res.status(201).json({ message: " Registered " });
  else res.status(400).json({ message: register });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running || Port : ${PORT}`);
});
