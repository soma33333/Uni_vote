

    if(window.history.replaceState){
        window.history.replaceState(null,null,window.location.href);
    }

            window.history.forward(); 
            function noBack() { 
                window.history.forward(); 
            } 



            var day;
            var hr;
            var  min;
            var sec;
            

  
            fetch('/data')
            .then(response => response.json())
            .then(data => {
                day=data[0].day;
                hr=data[0].hr;
                min=data[0].min;
                sec=data[0].sec;
              console.log(data); // Do something with the retrieved data

              const currentDate = new Date();
              const countDownDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day, hr,min,sec).getTime();
  
  
          var distance,count=0;
          // Update the count down every 1 second
          var x = setInterval(function() {
          // Get today's date and time
          var now = new Date().getTime();
          // Find the distance between now and the count down date
          distance = countDownDate - now;
  
          // Time calculations for days, hours, minutes and seconds
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
          // Display the result in the element with id="demo"
          document.getElementById("demo").innerHTML = days + "d   " + hours + "h   "
          + minutes + "m   " + seconds + "s   ";
  
          // If the count down is finished, write some text
          if (distance < 0) {
              console.log(distance)
              // clearInterval(x);
              document.getElementById("demo").innerHTML = "EXPIRED";
              while(count==0){
                  function formAutoSubmit () {
                  var frm = document.getElementById("timer");
                  frm.submit();
              }   
              formAutoSubmit();
              count++;
              }
          }
          }, 1000);



            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
          

    



      