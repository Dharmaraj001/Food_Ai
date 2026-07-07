// const app = require("./app");

// const connectdatabase = require("./config/database")



// const dotenv = require("dotenv")



// dotenv.config({path: "./config/config.env"}); 



// connectdatabase();



// PORT = process.env.PORT

// app.listen(PORT, () => {

//     console.log(`Server started on port ${PORT}`)

// })



const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);


const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

// Setting up config file
dotenv.config({ path: "./config/config.env" });

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");

  server.close(() => {
    process.exit(1);
  });
});