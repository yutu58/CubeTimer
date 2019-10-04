function readytodownload(){
  var element = document.createElement('File');
  element.value = allTimes.join("NEXT") + "OTHER" + allScrambles.join("NEXT")
  download("Times_download",element.value)
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function upload(){
  var x = document.getElementById("uploadarea").value.split("OTHER")
  var y = x[0].split("NEXT")
  var z = x[1].split("NEXT")
  for (var i=0; i<events.length; i++) {
    localStorage.setItem("savedtimes" + events[i] , y[i])
    localStorage.setItem("savedscrambles" + events[i] , z[i])
  }
  clearTable()
  check()
  makeTable(selectedEvent)
}