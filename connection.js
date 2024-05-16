const  mysql=require("mysql")

const sql=mysql.createConnection(
    {   host:"localhost",
        user:"root",
        password:"3333",
        database:"soma"
    });

    module.exports=sql;