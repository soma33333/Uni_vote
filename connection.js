const  mysql=require("mysql2")

const sql=mysql.createConnection(
    {   host:"localhost",
        user:"root",
        password:"soma3333",
        database:"univote"
    });

    module.exports=sql;