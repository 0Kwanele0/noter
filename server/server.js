const express = require("express");
const dotenv = require("dotenv");
const connect_db = require("./db");
const user_route = require("./routes/user");
const note_route = require("./routes/notes");

dotenv.config();
const server = express();
connect_db();

server.use(express.json());
server.use("/user", user_route);
server.use("/notes", note_route);

server.listen(process.env.PORT || 3000, () => {
    console.log("Server up and running...");
});
