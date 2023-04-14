const express = require('express');
const user_model = require("../models/User");
const bcrypt = require('bcrypt');

const route = express.Router();

// fetch all users
route.get("/", async (req, res)=> {
    try {
        const data = await user_model.find();
        console.log(data);

        res.send("Thanks");

    } catch(error) {
        console.log("erro fetching")
        res.status(404).send("Not found");
    }
})


route.get("/:id", (req, res)=> {
    res.send("hello world")
})

route.post("/", async (req, res)=> {
    try {
        bcrypt.genSalt(10, (err, salt)=> {
            if (!err){
                bcrypt.hash(req.body.password, 10, async (err, hash)=> {
                    if (!err) {
                        create_user(res, req.body.username, hash)
                    } else {
                        throw "Unable to hash"
                    }
                })
            } else{
                throw "Unable to salt"
            }
        })

    } catch(error) {
        res.send(error.message)
        console.log(error)
    }

})


route.put("/:id", (req, res)=> {

})

route.delete("/:id", (req, res)=> {

})

async function create_user(res, username, password) {
    try {
        const user = await new user_model({username: username, password: password})
        const data = await user.save() 
        res.send(user)
    } catch(err) {
        res.status(400).send({message: err.message})
    }
}

module.exports = route;
