const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const func = require("./register");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", (req, res) => {
  var name = req.body.name;
  const user = {
    name: name,
  };

  func.register(name)
    ? res.status(201).json({ message: " Registered " })
    : res.status(400).json({ message: " Something went wrong " });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running || Port : ${PORT}`);
});
