const express = require('express');
const connect_db = require("./db")



const route = require("./routes/user")
const note_route = require("./routes/notes")

const server = express();
server.use(express.json())

connect_db();

server.use("/user", route)
server.use("/notes", note_route)


server.listen(3000, ()=> {
    console.log("Server up and running...");
})

