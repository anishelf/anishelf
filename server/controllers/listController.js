const pool = require("../db/db");


const getLists = async(req,res)=>{

    try{


        const result =
        await pool.query(

            `
            SELECT *
            FROM lists
            WHERE user_id = $1
            ORDER BY created_at DESC
            `,

            [
                req.user.id
            ]

        );



        res.json({

            success:true,

            lists:
            result.rows

        });



    }catch(error){


        console.error(error);



        res.status(500).json({

            success:false,

            message:
            "Failed to fetch lists"

        });

    }

};

const createList = async(req,res)=>{

    try{


        const {
            name,
            description
        } = req.body;



        const result =
        await pool.query(

            `
            INSERT INTO lists
            (
                user_id,
                name,
                description
            )
            VALUES
            (
                $1,
                $2,
                $3
            )
            RETURNING *
            `,

            [
                req.user.id,
                name,
                description
            ]

        );



        res.status(201).json({

            success:true,

            list:
            result.rows[0]

        });



    }catch(error){


        console.error(error);



        res.status(500).json({

            success:false,

            message:
            "Failed to create list"

        });

    }

};


module.exports = {

    getLists,
    createList

};