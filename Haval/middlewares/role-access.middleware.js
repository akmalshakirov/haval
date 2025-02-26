const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { model } = require("mongoose");
dotenv.config();

const roleAccessMiddleware = function ([roles]) {
  return async function (req, res, next) {
    try {
      
          const authHeader = req.headers['authorization'];
          if(!authHeader) {
              return res.status(404).send({
                  error: "Token not found!"
              })
          }
          const token = authHeader.split(' ')[1];
      
              if (!token) {
                  return res.status(401).json({ message: "Token is missing" });
              }
      
              const { role } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      
              console.log("ROLE:",role);
              
              if(!roles.includes(role)) {
                return res.status(403).send({
                  error: "Sizga ruxsat yo'q!"
                })
              }
              

      next();  

    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Ichki server xatoligi!",
      });
    }
  };
};

module.exports = { roleAccessMiddleware }