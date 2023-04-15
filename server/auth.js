const jwt = require("jsonwebtokens");
const dotenv = require("dotenv");
dotenv.config();

function authorize(req, res, next) {
    const token = req.hearders("x-auth-token");

    if (token) {
        try {
            jwt.verify(token, process.env.JWT_TOKEN);
            next();
        } catch (err) {
            res.status(404).send("Wrong Token");
        }
    } else {
        res.status(404).send("Token needed");
    }
}

module.exports = authorize;
