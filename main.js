(function() {
  'use strict';

  let progressHandle;

  function progress() {
    // Add a dot each second
    $('#status').text(function(index, text) {
      return `${text} .`;
    });
  }

  function initialized() {
    // Precomputing finished, stop adding dots
    clearInterval(progressHandle);

    // Show the duration of initialization
    let end = new Date;
    let duration = (end - start) / 1000;
    $('#status').text(`Initialization done in  ${duration} seconds. Press space twice to start.`);

    // Show the scrambler
    $('#randomstate').css('visibility', 'visible');
    $('#randomstate button').on('click', generateScramble);
  }

	function generateScramble() {
    // Hide the initialization status on first scramble
    $('#status').hide();

    // Generate a scramble
    Cube.asyncScramble(function(alg) {
      let safeAlgo = alg.replace(/\s+/g, ''); // remove spaces
      let url = `http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&pzl=3&alg=x2${safeAlgo}`;
      $('#randomstate .result').html(`${alg}<br><img src=\"${url}\">`);
    })
}
	
	
  let start;

  $(function() {
    $('#status').text('Initializing');

    // Start measuring time
    start = new Date;

    // Start adding dots
    progressHandle = setInterval(progress, 1000);

    // Start precomputing
    Cube.asyncInit('./lib/worker.js', initialized);
  });
})();

//timer
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
            
                if(status == 1) {
                    stop();
                    saveTime();
			$('#status').hide()
		Cube.asyncScramble(function(alg) {	
      let safeAlgo = alg.replace(/\s+/g, ''); // remove spaces	
      let url = `http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&pzl=3&alg=x2${safeAlgo}`;	
      $('#randomstate .result').html(`${alg}<br><img src=\"${url}\">`);	
	scramble = alg	
    });
		}
 				if (timertrue == 0) {
                timertrue = 1;
                }
                if (timertrue == 2) {
                timertrue = 0;
                } 
            
        } 
    };

var selectedEvent;
//switch between sessions

function switchEvent(p){
document.getElementById("selectedsession").innerHTML = p
selectedEvent = p
clearTable()
makeTable(p)
//generate 2x2 scramble
}

//saving times
var times333;
var scrambles333;
var times222;
var scrambles222;
var tbody = document.getElementById("tbody"), row, cell1, cell2;

function check() {
	if (!localStorage.savedtimes333){
		times333 = []
	}
	else {
		var savings333 = localStorage.savedtimes333.split(",")
		times333 = savings333
	}
    
    if(!localStorage.savedscrambles333){
    	scrambles333 = []
	}
    else {
    	scrambles333 = localStorage.savedscrambles333.split(",")
	}
    
    if (!localStorage.savedtimes222){
		times222 = []
	}
	else {
		times222 = localStorage.savedtimes222.split(",")		
	}
    
    if(!localStorage.savedscrambles222){
    	scrambles222 = []
	}
    else {
    	scrambles222 = localStorage.savedscrambles222.split(",")
	}
    
}

function saveTime(){
check(); //check if there are times/scrambles saved
clearTable(); //empty the current list of times/scrambles
if (selectedEvent == 333){
	times333.push(document.getElementById("timerLabel").innerHTML) //add new time to time-array
	scrambles333.push(scramble) //add new scramble to scramble-array
	localStorage.savedtimes333 = times333 //resave new times
	localStorage.savedscrambles333 = scrambles333 //resave new scrambles
	makeTable(333);//make new list of times/scrambles
	}
if (selectedEvent == 222){
	times222.push(document.getElementById("timerLabel").innerHTML) //add new time to time-array
	scrambles222.push(scramble) //add new scramble to scramble-array
	localStorage.savedtimes222 = times222 //resave new times
	localStorage.savedscrambles222 = scrambles222 //resave new scrambles
	makeTable(222);//make new list of times/scrambles
}
}

function clearTable(){
document.getElementById("tbody").innerHTML = ""
}

function makeTable(p) {
if (p == 333){
	for (var i=0; i<times333.length; i++){
    		row = tbody.insertRow()  
    		cell1 = row.insertCell()
    		cell1.innerHTML = times333[i]
    		cell2 = row.insertCell() 
    		cell2.innerHTML = scrambles333[i]
	}
}
else if (p == 222){
	for (var i=0; i<times222.length; i++){
   		row = tbody.insertRow()  
    		cell1 = row.insertCell()
    		cell1.innerHTML = times222[i]
    		cell2 = row.insertCell() 
    		cell2.innerHTML = scrambles222[i]
	}
}
}

function removetimes(){
	clearTable();
   	localStorage.removeItem("savedtimes" + selectedEvent)
    localStorage.removeItem("savedscrambles" + selectedEvent)
}

check();
selectedEvent = 333
makeTable(333);
