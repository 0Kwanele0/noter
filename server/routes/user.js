const express = require("express");
const user_model = require("../models/User");
const bcrypt = require("bcrypt");

const route = express.Router();

// fetch all users
route.get("/", async (req, res) => {
    try {
        const data = await user_model.find();
        res.send("Thanks");
    } catch (error) {
        console.log("erro fetching");
        res.status(404).send("Not found");
    }
});

route.get("/:id", (req, res) => {
    user_model
        .find({ _id: req.params.id })
        .then((data) => {
            if (data.length > 0) {
                res.send(data);
            } else {
                throw new Error();
            }
        })
        .catch((err) => {
            res.status(404).send("not found");
        });
});

route.post("/", async (req, res) => {
    try {
        bcrypt.genSalt(10, (err, salt) => {
            if (!err) {
                bcrypt.hash(req.body.password, 10, async (err, hash) => {
                    if (!err) {
                        create_user(res, req.body.username, hash);
                    } else {
                        throw "Unable to hash";
                    }
                });
            } else {
                throw "Unable to salt";
            }
        });
    } catch (error) {
        res.send(error.message);
        console.log(error);
    }
});

route.put("/:id", (req, res) => {
    user_model
        .updateOne({ _id: req.params.id }, { username: req.body.username })
        .then((data) => {
            if (data.acknowledged == false) {
                throw new Error();
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(202).send("not updated");
        });
});

//
route.delete("/:id", (req, res) => {
    user_model
        .deleteOne({ _id: req.params.id })
        .then((d) => {
            res.send("deleted");
        })
        .catch((err) => {
            res.send(err);
        });
});

async function create_user(res, username, password) {
    try {
        const user = await new user_model({
            username: username,
            password: password,
        });
        await user
            .save()
            .then((d) => {
                res.send(d);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

module.exports = route;
