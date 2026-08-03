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

const getList = async(req,res)=>{

    try{


        const result =
        await pool.query(

            `
            SELECT *
            FROM lists
            WHERE id = $1
            AND user_id = $2
            `,

            [

                req.params.id,

                req.user.id

            ]

        );



        if(
            result.rows.length === 0
        ){

            return res.status(404).json({

                success:false,

                message:
                "List not found"

            });

        }



        res.json({

            success:true,

            list:
            result.rows[0]

        });



    }catch(error){

        console.error(error);


        res.status(500).json({

            success:false,

            message:
            "Server error"

        });

    }

};


module.exports = {

    getLists,
    createList,
    getList
};