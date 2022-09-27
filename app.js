const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const http = require("http");
const PORT = 4000;

// express setup
const app = express();
// create server
const server = http.createServer(app);

// logger for console
app.use(logger("dev"));

// bodyparser for req body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("welcome to api Center");
});

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Runing on PORT" + " " + PORT);
});
