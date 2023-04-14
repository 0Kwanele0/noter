const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database.");
    } catch (err) {
        console.log("Error while connecting to database!");
    }
}

module.exports = main;
