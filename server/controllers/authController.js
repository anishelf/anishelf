const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    createUser,
    findUserByEmail
}
=
require("../models/userModel");



const register = async(req,res)=>{

    try{

        const {
            username,
            email,
            password
        }
        =
        req.body;



        const existingUser =
        await findUserByEmail(email);



        if(existingUser){

            return res.status(400).json({

                success:false,

                message:"Email already exists"

            });

        }



        const hash =
        await bcrypt.hash(
            password,
            10
        );



        const user =
        await createUser(
            username,
            email,
            hash
        );



        res.json({

            success:true,

            user

        });



    }catch(error){

        console.error(error);

        res.status(500).json({

            success:false,

            message:"Registration failed"

        });

    }

};




const login = async(req,res)=>{

    try{

        const {
            email,
            password
        }
        =
        req.body;



        const user =
        await findUserByEmail(email);



        if(!user){

            return res.status(400).json({

                success:false,

                message:"Invalid credentials"

            });

        }



        const match =
        await bcrypt.compare(
            password,
            user.password_hash
        );



        if(!match){

            return res.status(400).json({

                success:false,

                message:"Invalid credentials"

            });

        }



        const token =
        jwt.sign(

            {
                id:user.id
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"7d"
            }

        );



        res.cookie(
            "token",
            token,
            {
                httpOnly:true,

                secure:true,

                sameSite:"none",

                maxAge:
                7 * 24 * 60 * 60 * 1000
            }
        );


        res.json({

            success:true,

            user:{

                id:user.id,

                username:user.username,

                email:user.email

            }

        });


    }catch(error){

        console.error(error);

        res.status(500).json({

            success:false

        });

    }

};



module.exports = {

    register,

    login

};