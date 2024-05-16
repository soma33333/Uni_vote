const sql = require("./connection")
const express = require("express")
const path = require("path")
const app= new express()
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()});

const bcrypt = require('bcrypt');//passwors_protecter
const saltRounds = 10;// Typically a value between 10 and 12

// toparse string based client request body into JavaScript Object
const bodyparser = require("body-parser")
const { count } = require("console")
const urlencodedparser = bodyparser.urlencoded({ extended: false });


//to set the view engine
app.set("view engine", "hbs");

//to use static files
app.use(express.static('public'))

app.get("", (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
});

app.get("/index", (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
});


app.get("/welcome", (req, res) => {

    sql.query("SELECT * from candidates", (err, result) => {
        if (result) {
            res.render("welcome",{data:result})
        }})

});



app.get("/admin", (req, res) => {


   sql.query("SELECT * from time ", (err, result1) => {
    if(result1){
        sql.query("SELECT * from candidates", (err, result2) => {
           
            if (result2) {
               
                sql.query("SELECT * FROM feedback", (err, result3) => {
                    if (result2) {
                        res.render("admin",{data1:result2,data2:result3,datat:result1})
                    }})     }
           console.log(err)})
    }
    console.log(err)})

   })




app.get("/done", (req, res) => {
    a=[];
    sql.query("SELECT * from feedback", (err, result) => {
        if (result) {
            res.render("done",{feeds:result}) 
        }})
    
});

app.get('/data', (req, res) => {
    sql.query("SELECT * from time", (err, results) => {
        
      if (err) {
        console.error('Error querying database: ' + err.stack);
        res.status(500).json({ error: 'Error querying database' });
        return;
      }
      console.log(results)
      res.json(results);
    });
  });





//ADMIN
app.post("/admin", urlencodedparser, upload.array("pic",2), (req, res) => {


const admin_id = req.body.admin_id;
const admin_name = req.body.admin_name;
const admin_code=req.body.admin_code;
const admin_password = req.body.admin_pass;


var compare1;
sql.query("SELECT * FROM admin WHERE  id=?  ", [admin_id], (err, result) => {
    console.log("ddd")
    if (result.length > 0) {
        compare1=result[0].password;
        bcrypt.compare(admin_password, compare1, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return;
            }
        
        if (result) {
            console.log('Passwords match! User authenticated.');

            const storedHashedPassword = "$2b$10$GMiw2iAhpN8klYuN.vtQC.1MrWbtvkHnzFlKFSd4QXzh/Jgkst8jm";
            const userInputPassword = admin_code;
            
            bcrypt.compare(userInputPassword, storedHashedPassword, (err, result) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return;
                }
            
            if (result) {
                console.log("ooo")
                // sql.query("SELECT * from time ", (err, result1) => {
                //     if(result1.length>0){
                //         sql.query("SELECT * from time ,candidates", (err, result) => {
                //             if (result) {
                //                res.render("admin",{data:result,day:result[0].day,
                //                    hr:result[0].hr,min:result[0].min,sec:result[0].sec})
                                   
                //            }
                //            console.log(err)})
                //     }
                //     else{
                //         sql.query("SELECT * from candidates", (err, result) => {
                //             if (result) {
                //                res.render("admin",{data:result})}})
                
                //     }
                //    })
                sql.query("SELECT * from time ", (err, result1) => {
                    if(result1){
                        sql.query("SELECT * from candidates", (err, result) => {
                            console.log(result)
                            if (result) {
                                console.log("can");
                                sql.query("SELECT * FROM feedback", (err, result2) => {
                                    if (result2) {
                                        console.log("feed");
                                        res.render("admin",{data1:result,data2:result2,datat:result1})
                                    }})     }
                           console.log(err)})
                    }
                    console.log(err)})

                console.log('Passwords match! User authenticated.');
            } else {
                // Passwords don't match, authentication failed
                console.log('Passwords do not match! Authentication failed.');
            }
            });

        } else {
            // Passwords don't match, authentication failed
            console.log("pp")
            console.log('Passwords do not match! Authentication failed.');
        }
        });

    }})



    
    const time=req.body.dlt_time;
    if(time!=undefined){
        sql.query("DELETE  FROM time",(err,result)=>{
            if(result){
                // sql.query("SELECT * from time ", (err, result1) => {
                //     if(result1.length>0){
                //         sql.query("SELECT * from time ,candidates", (err, result) => {
                //             if (result) {
                //                res.render("admin",{data:result,day:result[0].day,
                //                    hr:result[0].hr,min:result[0].min,sec:result[0].sec})
                                   
                //            }
                //            console.log(err)})
                //     }
                //     else{
                //         sql.query("SELECT * from candidates", (err, result) => {
                //             if (result) {
                //                res.render("admin",{data:result})}})
                
                //     }
                //    })
                sql.query("SELECT * from time ", (err, result1) => {
                    if(result1){
                        sql.query("SELECT * from candidates", (err, result) => {
                            console.log(result)
                            if (result) {
                                console.log("can");
                                sql.query("SELECT * FROM feedback", (err, result2) => {
                                    if (result2) {
                                        console.log("feed");
                                        res.render("admin",{data1:result,data2:result2,datat:result1})
                                    }})     }
                           console.log(err)})
                    }
                    console.log(err)})

            }})
    }


    const  day=req.body.day;
    const  hr=req.body.hr;
    const  min=req.body.min;
    const  sec=req.body.sec;
    if(hr!=undefined &&  min!=undefined && sec!=undefined){
        sql.query("INSERT INTO time   (day,hr,min,sec) VALUES (?,?,?,?)  ",[day,hr,min,sec], (err, result) => {
            if (result) {

                // sql.query("SELECT * from time ", (err, result1) => {
                //     if(result1.length>0){
                //         sql.query("SELECT * from time ,candidates", (err, result) => {
                //             if (result) {
                //                res.render("admin",{data:result,day:result[0].day,
                //                    hr:result[0].hr,min:result[0].min,sec:result[0].sec})
                                   
                //            }
                //            console.log(err)})
                //     }
                //     else{
                //         sql.query("SELECT * from candidates", (err, result) => {
                //             if (result) {
                //                res.render("admin",{data:result})}})
                
                //     }
                //    })
                sql.query("SELECT * from time ", (err, result1) => {
                    if(result1){
                        sql.query("SELECT * from candidates", (err, result) => {
                            console.log(result)
                            if (result) {
                                console.log("can");
                                sql.query("SELECT * FROM feedback", (err, result2) => {
                                    if (result2) {
                                        console.log("feed");
                                        res.render("admin",{data1:result,data2:result2,datat:result1})
                                    }})     }
                           console.log(err)})
                    }
                    console.log(err)})
            }
            if(err){
                console.log(err)
            }
        })
    }


    const dltcan=req.body.num;
    console.log(dltcan)
    if(dltcan!=undefined){
        sql.query("SELECT * from time ", (err, result1) => {
            // if(result1.length>0){
            //     sql.query("SELECT * from time ,candidates", (err, result) => {
            //         if (result) {
            //            res.render("admin",{data:result,day:result[0].day,
            //                hr:result[0].hr,min:result[0].min,sec:result[0].sec,note:"VOTING HAS STARTED ...you cannot dlt"})
                           
            //        }
                
            //     })
                
            //     }
            // sql.query("SELECT * from time ", (err, result1) => {
                if(result1.length>0){
                    sql.query("SELECT * from candidates", (err, result) => {
                        console.log(result)
                        if (result) {
                            console.log("can");
                            sql.query("SELECT * FROM feedback", (err, result2) => {
                                if (result2) {
                                    console.log("feed");
                                    res.render("admin",{data1:result,data2:result2,datat:result1,note:"dlttt"})
                                }})     }
                       console.log(err)})
                }
                   
            else{
                    sql.query("DELETE  FROM candidates WHERE idno=? ",[dltcan],(err,result)=>{
                        if(result){

                        // sql.query("SELECT * from candidates", (err, result) => {
                        //             if (result) {
                        //                res.render("admin",{data:result})}
                                    
                        //             })
                        sql.query("SELECT * from time ", (err, result1) => {
                            if(result1){
                                sql.query("SELECT * from candidates", (err, result) => {
                                    console.log(result)
                                    if (result) {
                                        console.log("can");
                                        sql.query("SELECT * FROM feedback", (err, result2) => {
                                            if (result2) {
                                                console.log("feed");
                                                res.render("admin",{data1:result,data2:result2,datat:result1})
                                            }})     }
                                   console.log(err)})
                            }
                            console.log(err)})

                        }})
                    
                   }
                })}



///DLT FEED


const dltfeed=req.body.feed;
    if(dltfeed!=undefined){
        sql.query("SELECT * from time ", (err, result1) => {
            
                if(result1.length>0){
                    sql.query("SELECT * from candidates", (err, result) => {
                        console.log(result)
                        if (result) {
                            console.log("can");
                            sql.query("SELECT * FROM feedback", (err, result2) => {
                                if (result2) {
                                    console.log("feed");
                                    res.render("admin",{data1:result,data2:result2,datat:result1,note:"cannnot"})
                                }})     }
                       console.log(err)})
                }
                   
            else{
                    sql.query("DELETE  FROM feedback WHERE feedid=? ",[dltfeed],(err,result)=>{
                        if(result){
                        sql.query("SELECT * from time ", (err, result1) => {
                            if(result1){
                                sql.query("SELECT * from candidates", (err, result) => {
                                    console.log(result)
                                    if (result) {
                                        sql.query("SELECT * FROM feedback", (err, result2) => {
                                            if (result2) {
                                                console.log("feed");
                                                res.render("admin",{data1:result,data2:result2,datat:result1})
                                            }})     }
                                   console.log(err)})
                            }
                            console.log(err)})

                        }})
                    
                   }
                })}







    
    if(req.body.can_num!=undefined){
        sql.query("SELECT * from time ", (err, result1) => {
            // if(result1.length>0){
            //     sql.query("SELECT * from time ,candidates", (err, result) => {
            //         if (result) {
            //            res.render("admin",{data:result,day:result[0].day,
            //                hr:result[0].hr,min:result[0].min,sec:result[0].sec,note:"VOTING HAS STARTED ...CANNOT ADD CANDIDATES"})
                           
            //        }
            //        console.log(err)})
            // }
            // sql.query("SELECT * from time ", (err, result1) => {
                if(result1.length>0){
                    sql.query("SELECT * from candidates", (err, result) => {
                        console.log(result)
                        if (result) {
                            console.log("can");
                            sql.query("SELECT * FROM feedback", (err, result2) => {
                                if (result2) {
                                    console.log("feed");
                                    res.render("admin",{data1:result,data2:result2,datat:result1,note:"jjjgdshjio"})
                                }})     }
                       console.log(err)})
                }
                // console.log(err)})
        
        else{

        
            const picid1 =req.files[0].buffer.toString("base64");
            const picid2 =req.files[1].buffer.toString("base64");
            const num=req.body.can_num;
            const name=req.body.can_name;
          
            // console.log(picid)
            sql.query(" INSERT INTO candidates (idno,name,votes,image,symbol) VALUES (?,?,?,?,?)",[num,name,0,picid1,picid2], (err, result) => {
                if (result) {
                    // sql.query("SELECT * from candidates", (err, result) => {
                    //                 if (result) {
                    //                     console.log(result)
                    //                    res.render("admin",{data:result})}
                    //                 if(err){
                    //                     console.log(err)
                    //                 }})
                    sql.query("SELECT * from time ", (err, result1) => {
                        if(result1){
                            sql.query("SELECT * from candidates", (err, result) => {
                                console.log(result)
                                if (result) {
                                    console.log("can");
                                    sql.query("SELECT * FROM feedback", (err, result2) => {
                                        if (result2) {
                                            console.log("feed");
                                            res.render("admin",{data1:result,data2:result2,datat:result1})
                                        }})     }
                               console.log(err)})
                        }
                        console.log(err)})
                }
                else{
                    console.log(err)
                }
            })

        }})
        
           }  
        
})




//REGISTER
app.post("/index", urlencodedparser, (req, res) => {


    var  hash_pass;

    const id = req.body.id;
    const name = req.body.name;
    const phono = req.body.phoneno;
    const password = req.body.password;
    const conpassword = req.body.conpassword;
    const counter=0;

    const admin_id = req.body.admin_id;
    const admin_name = req.body.admin_name;
    const admin_code=req.body.admin_code;
    const admin_phono = req.body.admin_pno;
    const admin_password = req.body.admin_pass;
    const admin_conpassword = req.body.admin_con_pass;

    //ADMIN
    if(admin_code!=undefined){
            console.log("1")
             bcrypt.genSalt(saltRounds, (err, salt) => {
            if(salt){
               bcrypt.hash(admin_code, salt, (err, hash) => {
                console.log("2")
             
             const storedHashedPassword = "$2b$10$GMiw2iAhpN8klYuN.vtQC.1MrWbtvkHnzFlKFSd4QXzh/Jgkst8jm";
             const userInputPassword = admin_code;
             bcrypt.compare(userInputPassword, storedHashedPassword, (err, result) => {
                 if (err) {
                     console.error('Error comparing passwords:', err);
                     return;
                 }
             
                 if (result) {
                     if (admin_password == admin_conpassword) {
                         bcrypt.genSalt(saltRounds, (err, salt) => {//This salt will be unique for each password hash, enhancing security:
                             if(salt){
                                 bcrypt.hash(admin_password, salt, (err, hash) => {
                                    if(hash){
                                     hash_pass=hash;
                                     sql.query("INSERT INTO admin (id,name,phono,password) VALUES (?,?,?,?)", [admin_id, admin_name, admin_phono, hash_pass],
                                     (err, result) => {
                                         console.log("enter admin")
                                         if (result) {//if registration success ,allows  user to login
                                             console.log("enterrradmin")
                                             res.sendFile(__dirname+"/public/index.html");
                                         } 
                                     })
                                    }
                                       });
                           
                             }
                         
                         })
                 
                 
                     }
                 // Passwords match, authentication successful
                 console.log('Passwords match! User authenticated.');
                 } else {
                 // Passwords don't match, authentication failed
                 console.log('Passwords do not match! Authentication failed.');
             }
             });
            }); }
          
            });

    }

 
    //USER
    if (password == conpassword) {

        bcrypt.genSalt(saltRounds, (err, salt) => {//This salt will be unique for each password hash, enhancing security:
            if (err) {
                // Handle error
                return;
            }
            if(salt){
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                     // Handle error
                    return;
                   }
                   if(hash){
                    hash_pass=hash;
                    
                    console.log(hash_pass)
                    sql.query("INSERT INTO registration (USN,name,phono,password,voted) VALUES (?,?,?,?,?)", [id, name, phono, hash_pass, counter],
                    (err, result) => {
                        console.log("ente")
                        if (result) {//if registration success ,allows  user to login
                            console.log("enterrr")
                            res.sendFile(__dirname+"/public/index.html");
                        } else {
                            // res.sendFile(__dirname+"/public/index.html");
                        }
                    })
                   }
          
                  // Hashing successful, 'hash' contains the hashed password
                  console.log('Hashed password:', hash);
                      });
          
            }
        
        })


    }
})



//LOGIN
var userid, e;
var a=[];
app.post("/welcome", urlencodedparser, (req, res) => {

    sql.query("SELECT * from time", (err, result) => {//vote time not  yet   started
        if (result.length>0) {
            const id = req.body.id;
            const password = req.body.password;
            var compare;
           
                sql.query("SELECT * FROM registration WHERE USN=?  ", [id], (err, result) => {
                    
                    if (result.length > 0) {
                        compare=result[0].password;
                        e = result[0].voted;
                       
                        bcrypt.compare(password, compare, (err, result) => {
                            if (err) {
                                // Handle error
                                console.error('Error comparing passwords:', err);
                                return;
                            }
                        
                        if (result) {
                            // Passwords match, authentication successful
                            console.log('Passwords match! User authenticated.');
        
                           
                            if (e == 1) {//login---if vote is completed---feedback  page
                
                                sql.query("SELECT * from feedback", (err, result) => {
                                    if (result) {
                                        res.render("done",{feeds:result}) 
                                    }})
                           
                            }
                          
                            if(e==0) {//login---allows user to  vote
                                sql.query("SELECT * from candidates", (err, result) => {
                                    if (result) {
                                        res.render("welcome",{data:result})
                                    }})
                            }
        
        
        
                        } else {
                            // Passwords don't match, authentication failed
                            console.log('Passwords do not match! Authentication failed.');
                        }
                        });
        
                    }})
        }
        else{
            res.sendFile(__dirname+"/public/index.html");
        }
        })



    userid= req.body.id; 
    if(req.body.time==3){//if countdown expires---displays result

        sql.query("SELECT * from candidates", (err, result1) => {
            if (result1) {
                sql.query("SELECT name, votes FROM candidates WHERE votes = (SELECT Max(votes) FROM candidates)",(err,result2)=>{
                    if(result2){
                        res.render("result",{data:result1,name:result2[0].name,votes:result2[0].votes})
                    }
             })
               
            }})

    }
  
    

    });
       
        
 

//FEEDBACK
app.post("/done", urlencodedparser, (req, res) => {


    const id = userid;
    console.log(id)
    if(req.body.del==1){//to delete the current user's feedback
        console.log("enter...")
        sql.query("DELETE  FROM feedback WHERE feedid=? ",[id], (err, result) => {
            if (result) {
                console.log('dlted')

            }})
            var a=[];
            sql.query("SELECT * from feedback", (err, result) => {
                if (result) {//displays all  feedback
                    res.render("done",{feeds:result})    
                }})
                
    }
    var d;
    sql.query("SELECT * FROM registration WHERE USN=? ", [id], (err, result) => {
        if (result.length > 0) {
            d = result[0].voted;

            if (d == 1) {//voted
              console.log("aaaa")
                if( req.body.feed!=undefined){//if users provide---insert's into db
                    const feed = req.body.feed+"---"+userid;
                    sql.query("INSERT INTO feedback (feedid,message) VALUES (?,?)", [id, feed],
                        (err, result) => {
                            if (result) {
                                console.log("insert")
                            }  
                        })
                       
                }
               


                var a=[];//display feedback
                sql.query("SELECT * from feedback", (err, result) => {
                    if (result) {
                        res.render("done",{feeds:result}) 

                    }})
        


            }

            else {//to update vote count
                const idno = req.body.voo;
              

                sql.query("UPDATE candidates SET votes=votes+1 WHERE idno=?", [idno], (err, result) => {
                    if (result) {
                        console.log("succces1")
                    }
                })

                sql.query("UPDATE registration SET voted=1 WHERE USN=?", [id], (err, result) => {
                    if (result) {//to update such that user cannot  vote more than once  
                        console.log("success2");
                    }
                })
                var a=[];
                sql.query("SELECT * from feedback", (err, result) => {
                    if (result) {//displays feedback
                       
                     res.render("done",{feeds:result})    
                    }})
            }  }

    })
})


app.listen(3000, () => {
    console.log("listening")
});
