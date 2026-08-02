const jwt = require("jsonwebtoken");


function verifyToken(req,res,next){

    const authHeader =
    req.headers.authorization;


    if(!authHeader){

        return res.status(401).json({

            success:false,

            message:"No token provided"

        });

    }
    const token =
    req.cookies.token;


    if(!token){

        return res.status(401).json({

            success:false,

            message:"No token provided"

        });

    }

   

}



module.exports = verifyToken;