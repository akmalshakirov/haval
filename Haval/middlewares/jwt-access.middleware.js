const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.jwtAccessMiddleware = function (req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(404).send({
                error: "Token not found!",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token is missing" });
        }

        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired!" });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(400).json({ message: "Invalid token!" });
        }

        return res.status(500).json({ message: "Internal server error!" });
    }
};
