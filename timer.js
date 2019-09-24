var status = 0; 
    var time = 0;
    var timertrue = 0;
                  
    function start(){
        status = 1;
        d1 = new Date();
        newStartTime = d1.getTime();
        document.getElementById("startBtn").disabled = true;
        document.getElementById('timerLabel').innerHTML = 'timing';
        
    }
    function stop(){
    	d1 = new Date();
        document.getElementById('timerLabel').innerHTML = (d1.getTime() - newStartTime) / 1000;
        status = 0;
        document.getElementById("startBtn").disabled = false;
    }
    function reset(){
        status = 0;
        time = 0;
        document.getElementById('timerLabel').innerHTML = '0.000';
        document.getElementById("startBtn").disabled = false;
    }

    document.onkeyup = function(event) { 
        if (event) {
            if (event.keyCode == 32 && timertrue == 1) {
                if (status == 0) {
                	reset();
                    start();
                }
 
                 if (timertrue == 1) {
                timertrue = 2;
                } 
               
            }           
        } 
    }; 
    document.onkeydown = function(event) { 
        if (event) {
            if (event.keyCode == 32) {
                if(status == 1) {
                    stop();
		generateScramble()
				}
 				if (timertrue == 0) {
                timertrue = 1;
                }
                if (timertrue == 2) {
                timertrue = 0;
                } 
            }
        } 
    };
