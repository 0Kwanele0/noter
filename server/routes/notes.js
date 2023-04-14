const express = require("express");

const note_route = express.Router();

note_route.get("/", (req, res) => {
    res.send("notes");
});

module.exports = note_route;
