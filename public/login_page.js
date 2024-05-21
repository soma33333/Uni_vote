

var a = document.getElementById("admin_login");
var b = document.getElementById("admin_regis");
var c = document.getElementById("user_login");
var d = document.getElementById("user_regis");
var e = document.getElementById("success");

var p = document.getElementById("al");
var q = document.getElementById("ar");
var r = document.getElementById("ul");
var s = document.getElementById("ur");

var x = document.getElementById("ad");
var y = document.getElementById("us");
var z = document.getElementById("time_msg");
var Incorrect = document.getElementById("incorrect");

var hov=document.getElementsByClassName("butt");


p.style.display = "none";
q.style.display = "none";
r.style.display = "none";
s.style.display = "none";

a.style.display = "none";
b.style.display = "none";
c.style.display = "none";
d.style.display = "none";
z.style.display = "none";
e.style.display = "block";




fetch('/data')
.then(response => response.json())
.then(data => {   
  if(data.length>0){
    
  }
  else{
    z.style.display = "block";
  }

})
.catch(error => {
  console.error('Error fetching data:', error);
});







 function admin(){




      x.style.backgroundColor="white";
      y.style.backgroundColor="antiquewhite"

      
      
      p.style.display = "block";
      q.style.display = "block";
      r.style.display = "none";
      s.style.display = "none";
      a.style.display = "none";
      b.style.display = "none";
      c.style.display = "none";
      d.style.display = "none";
      e.style.display = "block";

 }
 
 function user(){

 
    y.style.backgroundColor="white" ;
    x.style.backgroundColor="antiquewhite" ;

      r.style.display = "block";
      s.style.display = "block";
      p.style.display = "none";
      q.style.display = "none";
      a.style.display = "none";
      b.style.display = "none";
      c.style.display = "none";
      d.style.display = "none";
      e.style.display = "block";

 }

function myFunction1() {
  p.style.backgroundColor="gray"
  q.style.backgroundColor="white"
  

      a.style.display = "block";
      b.style.display = "none";
      c.style.display = "none";
      d.style.display = "none";
      e.style.display = "none";
}

function myFunction2() {
  p.style.backgroundColor="white"
  q.style.backgroundColor="gray"
      b.style.display = "block";
      a.style.display = "none";
      c.style.display = "none";
      d.style.display = "none";
      e.style.display = "none";
}

function myFunction3() {

  s.style.backgroundColor="white"
  r.style.backgroundColor="gray"
      c.style.display = "block";
      b.style.display = "none";
      a.style.display = "none";
      d.style.display = "none";
      e.style.display = "none";
}

function myFunction4() {
  r.style.backgroundColor="white"
  s.style.backgroundColor="gray"
      d.style.display = "block";
      b.style.display = "none";
      c.style.display = "none";
      a.style.display = "none";
      e.style.display = "none";
}


function valid(){
 
  if(window.location.href!="localhost:3000/welcome"){
      document.getElementById("msg21").innerText="Incorrect ID or Password";
      setTimeout(pass,3000);
  }

}
function pass(){
  document.getElementById("msg21").innerText="";
 }



 function validadmin(){
 
  if(window.location.href!="localhost:3000/admin"){
      document.getElementById("admsg").innerText="Incorrect Details";
      setTimeout(passad,3000);
  }

}
function passad(){
  document.getElementById("admsg").innerText="";
 }



 function valid1(){
  if (document.getElementById("pass1").value!=document.getElementById("pass2").value){
      document.getElementById("msg1").innerText="Passwords not matching";
      setTimeout(pass1,2000);
  }  


 }
 function pass1(){
  document.getElementById("msg1").innerText="";
 }


 function valid2(){
      if (document.getElementById("admin_pass1").value!=document.getElementById("admin_pass2").value){
          document.getElementById("msg3").innerText="Passwords not matching";
          setTimeout(pass2,2000);
      } 
      else if(document.getElementById("admin_pass2").value!=" ") {
            document.getElementById("msg3").innerText="Incorrect ADMIN_CODE";
            setTimeout(pass2,2000);
        }  
    
    
     }
     function pass2(){
      document.getElementById("msg3").innerText="";
     }



  if(window.location.href=="http://localhost:3000/index"){
      
  alert("REGISTRATION SUCCCESSFUL!...")
  }

