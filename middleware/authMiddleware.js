const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const authmiddleware = async (req, res, next) => {
    try {
        const token = req.header("authorization");

        if (!token) {
            return res.status(401).json({
                message: "No token found"
            });
        }
    

        const actualToken = token.split(" ")[1];
console.log("TOKEN RECEIVED:", actualToken);
        const decoded = jwt.verify(
            actualToken,
            process.env.JWT_SECRET
        );

        req.user = decoded.id;

        next();

    }
catch (error) {
    console.log("JWT ERROR:", error);
    
    return res.status(401).json({
        message: error.message
    });
}


};

module.exports = authmiddleware;

