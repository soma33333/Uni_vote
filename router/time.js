const express=require("express")
const router1=express.Router()
const sql=require("../connection")


const bodyParser = require('body-parser'); 

const app = express();

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse application/json
app.use(express.json());


const urlencodedparser = bodyParser.urlencoded({ extended: false });


router1.post("/time",  urlencodedparser, (req, res) => {

const  day=req.body.day;
const  hr=req.body.hr;
const  min=req.body.min;
const  sec=req.body.sec;
if(hr!=undefined &&  min!=undefined && sec!=undefined){
    sql.query("SELECT * from time ", (err, result1) => {
                if(result1.length>0){

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

                }
            else{
                sql.query("INSERT INTO time   (day,hr,min,sec) VALUES (?,?,?,?)  ",[day,hr,min,sec], (err, result) => {
                    if (result) {
        
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
                    }
                    if(err){
                        console.log(err)
                    }
                })

            }})


}
});

module.exports=router1