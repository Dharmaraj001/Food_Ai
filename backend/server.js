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
const connectdatabase = require("./config/database");

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

connectdatabase();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});