const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const http = require("http");
const PORT = 4000;
// env config
require("dotenv").config();
// cron job
const cron = require("node-cron");

// routes
const booksRoutes = require("./server/routes/books.routes");
const userRoutes = require("./server/routes/user.routes");
const authRoutes = require("./server/routes/auth.routes");
// error handler
const {
  notFound,
  errorHandler,
} = require("./server/middlewares/errorHandling");
// swaggar implementation
const swaggarDocs = require("swagger-ui-express");
const { swagerDocument } = require("./server/helpers/docmentations");
const EventEmitter = require("events");

// import cron job
const cronJob = require("./server/mail/nodemailer");

cronJob;

// db-trigers

// const event = new EventEmitter();

// event.on("Hello", () => {
//   console.log("hello");
// });

// event.emit("Hello");

// event.on("portName", () => {
//   console.log(`this is the PortName ${PORT}`);
// });

// event.emit("portName");

// event.on("add", (a, b) => {
//   console.log(a + b);
// });
// event.emit("add", 1, 2);

// const dbTriger = require("./server/config/triggers");
// cron.schedule("* * * * * *", () => {
//   console.log("running a task every seconds");
// });
// cron.schedule("4 * * * *", () => {
//   console.log("running a task on 4 minutes");
// });

// cron.schedule("10-15 * * * * *", () => {
//   console.log("range");
// });

// express setup
const app = express();
// create server
const server = http.createServer(app);

// logger for console
app.use(logger("dev"));

// db trigners
// dbTriger();

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

// swagger routes

app.use("/swagger-docs", swaggarDocs.serve);
// swagger setup
app.use("/swagger-docs", swaggarDocs.setup(swagerDocument));

app.use(notFound);
app.use(errorHandler);

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Runing on PORT" + " " + PORT);
});
