// const { Client } = require("pg");

// module.exports = () => {
//   const client = new Client({
//     user: "postgres",
//     host: "127.0.0.1",
//     db: "bookstore11",
//     table: "Users",
//     password: "1234",
//   });
//   client.connect((err, client, done) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("db connect");
//       client.on("notification", async (msg) => {
//         console.log("in this sections");
//         console.log(msg.playload);
//       });
//       const query = client.query("LISTEN new_test");
//     }
//   });
// };
