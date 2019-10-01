(function () {
  'use strict';

  let progressHandle;

  function progress() {
    // Add a dot each second
    $('#status').text(function (index, text) {
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
    generateScramble();
  }

  function generateScramble() {
    // Hide the initialization status on first scramble
    $('#status').hide();

    // Generate a scramble
    if (selectedEvent == 333) {
    Cube.asyncScramble(function (alg) {
      let safeAlgo = alg.replace(/\s+/g, ''); // remove spaces
      let url = `http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&pzl=3&alg=x2${safeAlgo}`;
      $('#randomstate .result').html(`${alg}<br><img src=\"${url}\">`);
      scramble = alg
    })
    } else if (selectedEvent == 222) {
      scramble = scramblers["222"].getRandomScramble().scramble_string
    }
  }


  let start;

  $(function () {
    $('#status').text('Initializing');

    // Start measuring time
    start = new Date;

    // Start adding dots
    progressHandle = setInterval(progress, 1000);

    // Start precomputing
    Cube.asyncInit('./lib/worker.js', initialized);
  });
})();

function generateScramble2(){
    if (selectedEvent == 333) {
    Cube.asyncScramble(function (alg) {
      let safeAlgo = alg.replace(/\s+/g, ''); // remove spaces
      let url = `http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&pzl=3&alg=x2${safeAlgo}`;
      $('#randomstate .result').html(`${alg}<br><img src=\"${url}\">`);
      scramble = alg
    })
    } else if (selectedEvent == 222) {
      let alg = scramblers["222"].getRandomScramble().scramble_string
      let safeAlgo = alg.replace(/\s+/g, '')
      let url = `http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&pzl=2&alg=x2${safeAlgo}`;
      $('#randomstate .result').html(`${alg}<br><img src=\"${url}\">`);
      scramble = alg
    } else if (selectedEvent == 444) {
      let alg = scramblers["444"].getRandomScramble().scramble_string
      let safeAlgo = alg.replace(/\s+/g, '')
      let url = `http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&pzl=4&alg=x2${safeAlgo}`;
      $('#randomstate .result').html(`${alg}<br><img src=\"${url}\">`);
      scramble = alg
    } else if (selectedEvent == 555) {
      let alg = scramblers["555"].getRandomScramble().scramble_string
      let safeAlgo = alg.replace(/\s+/g, '')
      let url = `http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&pzl=5&alg=x2${safeAlgo}`;
      $('#randomstate .result').html(`${alg}<br><img src=\"${url}\">`);
      scramble = alg
    } else if (selectedEvent == 666) {
      let alg = scramblers["666"].getRandomScramble().scramble_string
      let safeAlgo = alg.replace(/\s+/g, '')
      let url = `http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&pzl=6&alg=x2${safeAlgo}`;
      $('#randomstate .result').html(`${alg}<br><img src=\"${url}\">`);
      scramble = alg
    }
}

//timer
var status = 0;
var timertrue = 0;
var scramble;
var inspection;
var inspectionrunning;
var bugdelay;

function start() {
  status = 1;
  newStartTime = new Date().getTime();
  document.getElementById('timerLabel').innerHTML = 'timing';

}
function stop() {
  document.getElementById('timerLabel').innerHTML = (new Date().getTime() - newStartTime) / 1000;
  status = 0;

  //bugdelay to stop starting the timer when stopping it with multiple keys
  bugdelay = true
  const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  sleep(1000).then(() => {
  bugdelay = false
  })
}
function reset() {
  status = 0;
  document.getElementById('timerLabel').innerHTML = '0.000';
}

document.onkeyup = function (event) {
    if (event.keyCode == 32 && timertrue == 1 && !bugdelay) {
      if (status == 0 && !inspection) {
        reset();
        start();
        timertrue = 2;
      } else if (status == 0 && inspectionrunning) {
        inspectionrunning = false
        reset();
        start();
        timertrue = 2;
      }
      else if (status == 0 && inspection) {
        startInspection()
      }
    }
};
document.onkeydown = function (event) {
    if (status == 1) {
      stop();
      saveTime();
      generateScramble2();
    }
    if (timertrue == 0) {
      timertrue = 1;
    }
    if (timertrue == 2 && !inspectionrunning) {
      timertrue = 0;
    }
};

function startInspection() {
var timeleft = 15
inspectionrunning = true
document.getElementById("timerLabel").innerHTML = timeleft;
var x = setInterval(function() {
if (inspectionrunning == true) {
timeleft = timeleft -1
document.getElementById("timerLabel").innerHTML = timeleft;
} else {
  clearInterval(x);
}
}, 1000)
}

var selectedEvent;
//switch between sessions

function switchEvent(p) {
  if (p != selectedEvent) {
  document.getElementById("selectedsession").innerHTML = p
  check()
  selectedEvent = p
  clearTable()
  makeTable(p)
  generateScramble2()
  }
}

//saving times
var times333;
var scrambles333;
var times222;
var scrambles222;
var times444;
var scrambles444;
var times555;
var scrambles555;
var times666;
var scrambles666;
var tbody = document.getElementById("tbody"), row, cell1, cell2, cell3, cell4;

function check() { //resets everything to saved values or NULL
  if (!localStorage.savedtimes333) {
    times333 = []
  }
  else {
    var savings333 = localStorage.savedtimes333.split(",")
    times333 = savings333
  }

  if (!localStorage.savedscrambles333) {
    scrambles333 = []
  }
  else {
    scrambles333 = localStorage.savedscrambles333.split(",")
  }

  if (!localStorage.savedtimes222) {
    times222 = []
  }
  else {
    times222 = localStorage.savedtimes222.split(",")
  }
  if (!localStorage.savedscrambles222) {
    scrambles222 = []
  }
  else {
    scrambles222 = localStorage.savedscrambles222.split(",")
  }

  if (!localStorage.savedtimes444) {
    times444 = []
  }
  else {
    times444 = localStorage.savedtimes444.split(",")
  }
  if (!localStorage.savedscrambles444) {
    scrambles444 = []
  }
  else {
    scrambles444 = localStorage.savedscrambles444.split(",")
  }

  if (!localStorage.savedtimes555) {
    times555 = []
  }
  else {
    times555 = localStorage.savedtimes555.split(",")
  }
  if (!localStorage.savedscrambles555) {
    scrambles555 = []
  }
  else {
    scrambles555 = localStorage.savedscrambles555.split(",")
  }

  if (!localStorage.savedtimes666) {
    times666 = []
  }
  else {
    times666 = localStorage.savedtimes666.split(",")
  }
  if (!localStorage.savedscrambles666) {
    scrambles666 = []
  }
  else {
    scrambles666 = localStorage.savedscrambles666.split(",")
  }

  if (!localStorage.savedinspection) {
    inspection = false
  }
  else {
    if (localStorage.savedinspection == 'true') {
    inspection = localStorage.savedinspection
    document.getElementById("OnInspection").style.fontWeight = "bold"
    }
    else if (localStorage.savedinspection == 'false') {
    inspection = false
    document.getElementById("OffInspection").style.fontWeight = "bold"
         //this because localStorage saves booleans as strings, so (inspection) will return true instead of false
    }
  }
  document.getElementById("currentAo5").innerHTML = "Ao5: --.--"
  document.getElementById("currentAo12").innerHTML = "Ao12: --.--"
  document.getElementById("ao5atm").innerHTML = "--.--"
  document.getElementById("ao12atm").innerHTML = "--.--"
}

function saveTime() {
  check(); //check if there are times/scrambles saved
  clearTable(); //empty the current list of times/scrambles
  if (selectedEvent == 333) {
    times333.push(document.getElementById("timerLabel").innerHTML) //add new time to time-array
    scrambles333.push(scramble) //add new scramble to scramble-array
    localStorage.savedtimes333 = times333 //resave new times
    localStorage.savedscrambles333 = scrambles333 //resave new scrambles
    makeTable(333);//make new list of times/scrambles
  }
  else if (selectedEvent == 222) {
    times222.push(document.getElementById("timerLabel").innerHTML) //add new time to time-array
    scrambles222.push(scramble) //add new scramble to scramble-array
    localStorage.savedtimes222 = times222 //resave new times
    localStorage.savedscrambles222 = scrambles222 //resave new scrambles
    makeTable(222);//make new list of times/scrambles
  }
  else if (selectedEvent == 444) {
    times444.push(document.getElementById("timerLabel").innerHTML) //add new time to time-array
    scrambles444.push(scramble) //add new scramble to scramble-array
    localStorage.savedtimes444 = times444 //resave new times
    localStorage.savedscrambles444 = scrambles444 //resave new scrambles
    makeTable(444);//make new list of times/scrambles
  }
  else if (selectedEvent == 555) {
    times555.push(document.getElementById("timerLabel").innerHTML) //add new time to time-array
    scrambles555.push(scramble) //add new scramble to scramble-array
    localStorage.savedtimes555 = times555 //resave new times
    localStorage.savedscrambles555 = scrambles555 //resave new scrambles
    makeTable(555);//make new list of times/scrambles
  }
  else if (selectedEvent == 666) {
    times666.push(document.getElementById("timerLabel").innerHTML) //add new time to time-array
    scrambles666.push(scramble) //add new scramble to scramble-array
    localStorage.savedtimes666 = times666 //resave new times
    localStorage.savedscrambles666 = scrambles666 //resave new scrambles
    makeTable(666);//make new list of times/scrambles
  }
}

function clearTable() {
  document.getElementById("tbody").innerHTML = ""
}

function makeTable(p) { //makes table + calculates averages
  if (p == 333) {
    for (var i = 0; i < times333.length; i++) {
      row = tbody.insertRow()
      cell1 = row.insertCell()
      cell1.innerHTML = times333[i]
      cell2 = row.insertCell()
      cell2.innerHTML = scrambles333[i]
      if (i >= 4) {
        var t333ao5 = [times333[i], times333[i - 1], times333[i - 2], times333[i - 3], times333[i - 4]];
        floatTimes(t333ao5)
        const arrSum = arr => arr.reduce((a, b) => a + b, 0)
        const arrMin = arr => Math.min(...arr)
        const arrMax = arr => Math.max(...arr)
        var ao5 = ((arrSum(t333ao5) - arrMin(t333ao5) - arrMax(t333ao5)) / 3).toFixed(3)
        document.getElementById("currentAo5").innerHTML = "Ao5: " + ao5
        document.getElementById("ao5atm").innerHTML = ao5
        cell3 = row.insertCell()
        cell3.innerHTML = ao5
      }
      if (i>=11){
        var t333ao12 = [times333[i], times333[i-1], times333[i-2], times333[i-3], times333[i-4], times333[i-5], times333[i-6], times333[i-7], times333[i-8], times333[i-9], times333[i-10], times333[i-11]];
        floatTimes(t333ao12);
        const arrSum = arr => arr.reduce((a,b) => a + b, 0)
        const arrMin = arr => Math.min(...arr)
        const arrMax = arr => Math.max(...arr)
        var ao12 = ((arrSum(t333ao12) - arrMin(t333ao12) - arrMax(t333ao12)) / 10).toFixed(3)
        document.getElementById("currentAo12").innerHTML = "Ao12: " + ao12
        document.getElementById("ao12atm").innerHTML = ao12
        cell4 = row.insertCell()
        cell4.innerHTML = ao12
      }
    }
  }
  else if (p == 222) {
    for (var i = 0; i < times222.length; i++) {
      row = tbody.insertRow()
      cell1 = row.insertCell()
      cell1.innerHTML = times222[i]
      cell2 = row.insertCell()
      cell2.innerHTML = scrambles222[i]
      if (i >= 4) {
        var t222ao5 = [parseFloat(times222[i]), parseFloat(times222[i - 1]), parseFloat(times222[i - 2]), parseFloat(times222[i - 3]), parseFloat(times222[i - 4])];
        const arrSum = arr => arr.reduce((a, b) => a + b, 0)
        const arrMin = arr => Math.min(...arr)
        const arrMax = arr => Math.max(...arr)
        var ao5 = ((arrSum(t222ao5) - arrMin(t222ao5) - arrMax(t222ao5)) / 3).toFixed(3)
        document.getElementById("currentAo5").innerHTML = "Ao5: " + ao5
        document.getElementById("ao5atm").innerHTML = ao5
        cell3 = row.insertCell()
        cell3.innerHTML = ao5
      }
      if (i>=11){
        var t222ao12 = [times222[i], times222[i-1], times222[i-2], times222[i-3], times222[i-4], times222[i-5], times222[i-6], times222[i-7], times222[i-8], times222[i-9], times222[i-10], times222[i-11]];
        floatTimes(t222ao12);
        const arrSum = arr => arr.reduce((a,b) => a + b, 0)
        const arrMin = arr => Math.min(...arr)
        const arrMax = arr => Math.max(...arr)
        var ao12 = ((arrSum(t222ao12) - arrMin(t222ao12) - arrMax(t222ao12)) / 10).toFixed(3)
        document.getElementById("currentAo12").innerHTML = "Ao12: " + ao12
        document.getElementById("ao12atm").innerHTML = ao12
        cell4 = row.insertCell()
        cell4.innerHTML = ao12
      }
    }
  }
    else if (p == 444) {
    for (var i = 0; i < times444.length; i++) {
      row = tbody.insertRow()
      cell1 = row.insertCell()
      cell1.innerHTML = times444[i]
      cell2 = row.insertCell()
      cell2.innerHTML = scrambles444[i]
      if (i >= 4) {
        var t444ao5 = [parseFloat(times444[i]), parseFloat(times444[i - 1]), parseFloat(times444[i - 2]), parseFloat(times444[i - 3]), parseFloat(times444[i - 4])];
        const arrSum = arr => arr.reduce((a, b) => a + b, 0)
        const arrMin = arr => Math.min(...arr)
        const arrMax = arr => Math.max(...arr)
        var ao5 = ((arrSum(t444ao5) - arrMin(t444ao5) - arrMax(t444ao5)) / 3).toFixed(3)
        document.getElementById("currentAo5").innerHTML = "Ao5: " + ao5
        document.getElementById("ao5atm").innerHTML = ao5
        cell3 = row.insertCell()
        cell3.innerHTML = ao5
      }
      if (i>=11){
        var t444ao12 = [times444[i], times444[i-1], times444[i-2], times444[i-3], times444[i-4], times444[i-5], times444[i-6], times444[i-7], times444[i-8], times444[i-9], times444[i-10], times444[i-11]];
        floatTimes(t444ao12);
        const arrSum = arr => arr.reduce((a,b) => a + b, 0)
        const arrMin = arr => Math.min(...arr)
        const arrMax = arr => Math.max(...arr)
        var ao12 = ((arrSum(t444ao12) - arrMin(t444ao12) - arrMax(t444ao12)) / 10).toFixed(3)
        document.getElementById("currentAo12").innerHTML = "Ao12: " + ao12
        document.getElementById("ao12atm").innerHTML = ao12
        cell4 = row.insertCell()
        cell4.innerHTML = ao12
      }
    }
  }
  else if (p == 555) {
    for (var i = 0; i < times555.length; i++) {
      row = tbody.insertRow()
      cell1 = row.insertCell()
      cell1.innerHTML = times555[i]
      cell2 = row.insertCell()
      cell2.innerHTML = scrambles555[i]
      if (i >= 4) {
        var t555ao5 = [parseFloat(times555[i]), parseFloat(times555[i - 1]), parseFloat(times555[i - 2]), parseFloat(times555[i - 3]), parseFloat(times555[i - 4])];
        const arrSum = arr => arr.reduce((a, b) => a + b, 0)
        const arrMin = arr => Math.min(...arr)
        const arrMax = arr => Math.max(...arr)
        var ao5 = ((arrSum(t555ao5) - arrMin(t555ao5) - arrMax(t555ao5)) / 3).toFixed(3)
        document.getElementById("currentAo5").innerHTML = "Ao5: " + ao5
        document.getElementById("ao5atm").innerHTML = ao5
        cell3 = row.insertCell()
        cell3.innerHTML = ao5
      }
      if (i>=11){
        var t555ao12 = [times555[i], times555[i-1], times555[i-2], times555[i-3], times555[i-4], times555[i-5], times555[i-6], times555[i-7], times555[i-8], times555[i-9], times555[i-10], times555[i-11]];
        floatTimes(t555ao12);
        const arrSum = arr => arr.reduce((a,b) => a + b, 0)
        const arrMin = arr => Math.min(...arr)
        const arrMax = arr => Math.max(...arr)
        var ao12 = ((arrSum(t555ao12) - arrMin(t555ao12) - arrMax(t555ao12)) / 10).toFixed(3)
        document.getElementById("currentAo12").innerHTML = "Ao12: " + ao12
        document.getElementById("ao12atm").innerHTML = ao12
        cell4 = row.insertCell()
        cell4.innerHTML = ao12
      }
    }
  }
  else if (p == 666) {
    for (var i = 0; i < times666.length; i++) {
      row = tbody.insertRow()
      cell1 = row.insertCell()
      cell1.innerHTML = times666[i]
      cell2 = row.insertCell()
      cell2.innerHTML = scrambles666[i]
      if (i >= 4) {
        var t666ao5 = [parseFloat(times666[i]), parseFloat(times666[i - 1]), parseFloat(times666[i - 2]), parseFloat(times666[i - 3]), parseFloat(times666[i - 4])];
        const arrSum = arr => arr.reduce((a, b) => a + b, 0)
        const arrMin = arr => Math.min(...arr)
        const arrMax = arr => Math.max(...arr)
        var ao5 = ((arrSum(t666ao5) - arrMin(t666ao5) - arrMax(t666ao5)) / 3).toFixed(3)
        document.getElementById("currentAo5").innerHTML = "Ao5: " + ao5
        document.getElementById("ao5atm").innerHTML = ao5
        cell3 = row.insertCell()
        cell3.innerHTML = ao5
      }
      if (i>=11){
        var t666ao12 = [times666[i], times666[i-1], times666[i-2], times666[i-3], times666[i-4], times666[i-5], times666[i-6], times666[i-7], times666[i-8], times666[i-9], times666[i-10], times666[i-11]];
        floatTimes(t666ao12);
        const arrSum = arr => arr.reduce((a,b) => a + b, 0)
        const arrMin = arr => Math.min(...arr)
        const arrMax = arr => Math.max(...arr)
        var ao12 = ((arrSum(t666ao12) - arrMin(t666ao12) - arrMax(t666ao12)) / 10).toFixed(3)
        document.getElementById("currentAo12").innerHTML = "Ao12: " + ao12
        document.getElementById("ao12atm").innerHTML = ao12
        cell4 = row.insertCell()
        cell4.innerHTML = ao12
      }
    }
  }
}

function floatTimes(p){
for (var i=0; i<p.length; i++){
	p[i] = parseFloat(p[i])
}
}

function removetimes() {
  clearTable();
  localStorage.removeItem("savedtimes" + selectedEvent)
  localStorage.removeItem("savedscrambles" + selectedEvent)
  check()
  makeTable(selectedEvent)
}

//stop it from scrolling down when pressing space
window.onkeydown = function(e) { 
  return !(e.keyCode == 32);
};

function settings() {
  if (document.getElementById("settingsmenu").style.visibility == "visible") {
    document.getElementById("settingsmenu").style.visibility = "hidden"
  } else {
    document.getElementById("settingsmenu").style.visibility = "visible"
  }
}
function closeSettings() {
    document.getElementById("settingsmenu").style.visibility = "hidden"
}

function inspectionf(){
  if (inspection) {
    inspection = false
    document.getElementById("OffInspection").style.fontWeight = "bold"
    document.getElementById("OnInspection").style.fontWeight = ""
  }
  else if (!inspection){
    inspection = true
    document.getElementById("OnInspection").style.fontWeight = "bold"
    document.getElementById("OffInspection").style.fontWeight = ""
  }
  localStorage.savedinspection = inspection
}

function showAll() {
document.getElementById("invisibleHeaderRight").style.visibility = "visible"
document.getElementById("invisibleHeaderRight2").style.visibility = "visible"
}

function hideAll() {
document.getElementById("invisibleHeaderRight").style.visibility = "hidden"
document.getElementById("invisibleHeaderRight2").style.visibility = "hidden"
}

check();
selectedEvent = 333
makeTable(333);
