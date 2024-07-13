
const express=require("express")
const router2=express.Router()
const sql=require("../connection")


const bodyParser = require('body-parser'); 

const app = express();

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse application/json
app.use(express.json());


const urlencodedparser = bodyParser.urlencoded({ extended: false });


router2.post("/dltcan",  urlencodedparser, (req, res) => {


    const dltcan=req.body.num;
    console.log(dltcan)
    if(dltcan!=undefined){
        sql.query("SELECT * from time ", (err, result1) => {
  
                if(result1.length>0){
                    sql.query("SELECT * from candidates", (err, result) => {
                        if (result) {
                            sql.query("SELECT * FROM feedback", (err, result2) => {
                                if (result2) {
                                    sql.query("SELECT * from registration", (err, result4) => {
                                        if(result4){
                                            res.render("admin",{data1:result,data2:result2,datat:result1,data4:result4,note:"VOTING HAS ALREADY BEGUN!   CANDIDATE LIST CANNOT BE MODIFIED! "})
                                        }
                                    })
                                    
                                }})     }
                       console.log(err)})
                }
                   
            else{
                    sql.query("DELETE  FROM candidates WHERE idno=? ",[dltcan],(err,result)=>{
                        if(result){
                            sql.query("SELECT * from time ", (err, result1) => {
                                if(result1){
                                    sql.query("SELECT * from candidates", (err, result2) => {      
                                        if (result2) {
                                            sql.query("SELECT * FROM feedback", (err, result3) => {
                                                if (result2) {
                                                    sql.query("SELECT * FROM registration", (err, result4) => {
                                                        if (result4) {
                                                            res.render("admin",{data1:result2,data2:result3,datat:result1,data4:result4,note:"Deletion Completed"})
                                                        }})                        
                                                }})     }
                                       console.log(err)})
                                }
                                console.log(err)})
                           
                        }})
                    
                   }
                })}


})



module.exports=router2