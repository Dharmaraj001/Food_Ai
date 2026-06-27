const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dns.resolveSrv("_mongodb._tcp.foodapp.ud0z5qv.mongodb.net", (err, records) => {
    console.log("Error:", err);
    console.log("Records:", records);
});