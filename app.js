const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const http = require("http");
const PORT = 4000;
const booksRoutes = require("./server/routes/books.routes");
const userRoutes = require("./server/routes/user.routes");
const authRoutes = require("./server/routes/auth.routes");

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

// adding routess

app.use("/api/user", userRoutes);
app.use("/api/book", booksRoutes);
app.use("/api/auth", authRoutes);

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Runing on PORT" + " " + PORT);
});
