const express=require("express")
const router=express.Router()
const sql=require("../connection")




router.get("", (req, res) => {
    // res.sendFile(__dirname+"/public/index.html");
    res.render("index");
});

router.get("/index", (req, res) => {
    // res.sendFile(__dirname+"/public/index.html");
    res.render("index");
});

router.get("/welcome", (req, res) => {

    sql.query("SELECT * from candidates", (err, result) => {
        if (result) {
            res.render("welcome",{data:result})
        }})

});


router.get("/admin", (req, res) => {


    sql.query("SELECT * from time ", (err, result1) => {
     if(result1){
         sql.query("SELECT * from candidates", (err, result2) => {      
             if (result2) {
                 sql.query("SELECT * FROM feedback", (err, result3) => {
                     if (result2) {
                         sql.query("SELECT * FROM registration", (err, result4) => {
                             if (result4) {
                                 res.render("admin",{data1:result2,data2:result3,datat:result1,data4:result4})
                             }})                        
                     }})     }
            console.log(err)})
     }
     console.log(err)})
 
    })

    router.get("/done", (req, res) => {
        a=[];
        sql.query("SELECT * from feedback", (err, result) => {
            if (result) {
                res.render("done",{feeds:result}) 
            }})
        
    });

    router.get('/data', (req, res) => {
    
        sql.query("SELECT * from time", (err, results) => {
          if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Error querying database' });
            return;
          }
          res.json(results);
        });
      });

module.exports=router