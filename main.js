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
    if (selectedEvent == 333 || selectedEvent == 108 || selectedEvent == 106) {
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
    } else if (selectedEvent == 444 || selectedEvent == 110) {
      let alg = scramblers["444"].getRandomScramble().scramble_string
      let safeAlgo = alg.replace(/\s+/g, '')
      let url = `http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&pzl=4&alg=x2${safeAlgo}`;
      $('#randomstate .result').html(`${alg}<br><img src=\"${url}\">`);
      scramble = alg
    } else if (selectedEvent == 555 || selectedEvent == 111) {
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
    } else if (selectedEvent == 777) {
      let alg = scramblers["777"].getRandomScramble().scramble_string
      let safeAlgo = alg.replace(/\s+/g, '')
      let url = `http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&pzl=7&alg=x2${safeAlgo}`;
      $('#randomstate .result').html(`${alg}<br><img src=\"${url}\">`);
      scramble = alg
    } else if (selectedEvent == 102) {
      var scrabble = scramblers["pyram"].getRandomScramble()
      let alg = scrabble.scramble_string
      $('#randomstate .result').html(`${alg}
      <br><div id="drawn"></div>`)
      scramblers["pyram"].drawScramble("drawn", scrabble.state, 250, 250)
      scramble = alg
    } else if (selectedEvent == 104) {
      var scrabble = scramblers["sq1"].getRandomScramble()
      let alg = scrabble.scramble_string
      $('#randomstate .result').html(`${alg}
      <br><div id="drawn"></div>`)
      scramblers["sq1"].drawScramble("drawn", scrabble.state, 250, 250)
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
  document.getElementById('timerLabel').innerHTML = ((new Date().getTime() - newStartTime) / 1000).toFixed(3);
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
      saveTime(selectedEvent);
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
  document.getElementById("to" + p).className = "highlighted"
  document.getElementById("to" + selectedEvent).className = "clickable"
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
var times777;
var scrambles777;
var times101;
var scrambles101;
var times102;
var scrambles102;
var times103;
var scrambles103;
var times104;
var scrambles104;
var times105;
var scrambles105;
var times106;
var scrambles106;
var times107;
var scrambles107;
var times108;
var scrambles108;
var times109;
var scrambles109;
var times110;
var scrambles110;
var times111;
var scrambles111;
var times112;
var scrambles112;
var penalty;
var tbody = document.getElementById("tbody"), row, cell1, cell2, cell3, cell4;

var allTimes = [times333,times222,times444,times555,times666,times777,times101,times102,times103,times104,times105,times106,times107,times108,times109,times110,times111,times112]
var allScrambles = [scrambles333,scrambles222,scrambles444,scrambles555,scrambles666,scrambles777,scrambles101,scrambles102,scrambles103,scrambles104,scrambles105,scrambles106,scrambles107,scrambles108,scrambles109,scrambles110,scrambles111,scrambles112]
var events = [333,222,444,555,666,777,101,102,103,104,105,106,107,108,109,110,111,112]

function check() { //resets everything to saved values or NULL
  for (var i=0; i<events.length; i++) {
    if (localStorage.getItem("savedtimes" + events[i])){
    allTimes[i] = localStorage.getItem("savedtimes" + events[i]).split(",")
    } else if (!localStorage.getItem("savedtimes" + events[i])){
      allTimes[i] = []
    }
    if (localStorage.getItem("savedscrambles" + events[i])){
    allScrambles[i] = localStorage.getItem("savedscrambles" + events[i]).split(",")
    } else if (!localStorage.getItem("savedscrambles" + events[i])){
      allScrambles[i] = []
    }
  }

  if (!localStorage.savedinspection) {
    inspection = false
    document.getElementById("OffInspection").style.fontWeight = "bold"
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

function saveTime(p) {
  penalty = false;
  check(); //check if there are times/scrambles saved
  clearTable(); //empty the current list of times/scrambles
      var j = events.indexOf(p)
      allTimes[j].push(parseFloat(document.getElementById("timerLabel").innerHTML))
      allScrambles[j].push(scramble)
      localStorage.setItem("savedtimes" + p, allTimes[j])
      localStorage.setItem("savedscrambles" + p, allScrambles[j])
      makeTable(p)
}

function clearTable() {
  document.getElementById("tbody").innerHTML = ""
}

function makeTable(p) { //makes table + calculates averages
    var k = events.indexOf(p)
    for (var i = 0; i < allTimes[k].length; i++) {
      row = tbody.insertRow()
      cell1 = row.insertCell()
      var z = parseFloat(allTimes[k][i])
      cell1.innerHTML = z.toFixed(3)
      cell2 = row.insertCell()
      cell2.innerHTML = allScrambles[k][i]
      if (i >= 4) {
        var tao5 = [allTimes[k][i], allTimes[k][i - 1], allTimes[k][i - 2], allTimes[k][i - 3], allTimes[k][i - 4]];
        floatTimes(tao5)
        const arrSum = arr => arr.reduce((a, b) => a + b, 0)
        const arrMin = arr => Math.min(...arr)
        const arrMax = arr => Math.max(...arr)
        var ao5 = ((arrSum(tao5) - arrMin(tao5) - arrMax(tao5)) / 3).toFixed(3)
        document.getElementById("currentAo5").innerHTML = "Ao5: " + ao5
        document.getElementById("ao5atm").innerHTML = ao5
        cell3 = row.insertCell()
        cell3.innerHTML = ao5
      }
      if (i>=11){
        var tao12 = [allTimes[k][i], allTimes[k][i-1], allTimes[k][i-2], allTimes[k][i-3], allTimes[k][i-4], allTimes[k][i-5], allTimes[k][i-6], allTimes[k][i-7], allTimes[k][i-8], allTimes[k][i-9], allTimes[k][i-10], allTimes[k][i-11]];
        floatTimes(tao12);
        const arrSum = arr => arr.reduce((a,b) => a + b, 0)
        const arrMin = arr => Math.min(...arr)
        const arrMax = arr => Math.max(...arr)
        var ao12 = ((arrSum(tao12) - arrMin(tao12) - arrMax(tao12)) / 10).toFixed(3)
        document.getElementById("currentAo12").innerHTML = "Ao12: " + ao12
        document.getElementById("ao12atm").innerHTML = ao12
        cell4 = row.insertCell()
        cell4.innerHTML = ao12
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

function showupload() {
    if (document.getElementById("uploadmenu").style.visibility == "visible") {
    document.getElementById("uploadmenu").style.visibility = "hidden"
  } else {
    document.getElementById("uploadmenu").style.visibility = "visible"
  }
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

function removelasttime(){

}

function nopenalty() {
var p = selectedEvent
if (penalty) {
clearTable();
check();
var k = events.indexOf(p)
allTimes[k][(allTimes[k].length-1)] = parseFloat(allTimes[k][allTimes[k].length-1]) - 2
penalty = false;
localStorage.setItem("savedtimes" + p, allTimes[k])
localStorage.setItem("savedscrambles" + p, allScrambles[k])
makeTable(p)
document.getElementById("timerLabel").innerHTML = (parseFloat(document.getElementById("timerLabel").innerHTML) - 2).toFixed(3)
}
}

function penalty2() {
var p = selectedEvent
if (!penalty && document.getElementById("timerLabel").innerHTML != "0.000") {
clearTable();
check();
var k = events.indexOf(p)
allTimes[k][(allTimes[k].length-1)] = parseFloat(allTimes[k][allTimes[k].length-1]) + 2
penalty = true;
localStorage.setItem("savedtimes" + p, allTimes[k])
localStorage.setItem("savedscrambles" + p, allScrambles[k])
makeTable(p)
document.getElementById("timerLabel").innerHTML = (parseFloat(document.getElementById("timerLabel").innerHTML) + 2).toFixed(3)
}
}

function penaltyDNF() {

}
