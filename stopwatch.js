var intervalID;
var splitCount = 1;

function startpause() {
  document.getElementById("reset").disabled = false;
  document.getElementById("split").disabled = false;
  var state = document.getElementById("start").innerHTML;
  var startTime = Date.now();
  // if watch is resumed, get previous time
  if (getResume() != 0)
    startTime -= getResume();
  if (state == "Start") {
    document.getElementById("start").innerHTML = "Pause";
    intervalID = setInterval(showTime, 10, startTime);
  }
  else if (state == "Pause") {
    document.getElementById("start").innerHTML = "Start";
    clearTimeout(intervalID);
  }
}

function split() {
  var current = document.getElementById("showTime").innerHTML;
  document.getElementById("showSplit").innerHTML += "Split " + splitCount + ": " + current + "<br>";
  splitCount++;
}

function reset() {
  clearInterval(intervalID);
  splitCount = 1;
  document.getElementById("reset").disabled = true;
  document.getElementById("split").disabled = true;
  document.getElementById("showSplit").innerHTML = "";
  document.getElementById("start").innerHTML = "Start";
  document.getElementById("showTime").innerHTML = "00:00:00.000";
  clearInterval(intervalID);
}

function showTime(origin) {
  var hour = 0;
  var minute = 0;
  var second = 0;
  var ms = 0;
  // keep tracking "now", and the time elapsed since "start"
  var now = Date.now();
  var elapsed = now - origin;
  // convert time from millisecond
  ms = elapsed % 1000;
  var sec = parseInt(elapsed/1000);
  hour = parseInt(sec/3600);
  sec -= hour*3600;
  minute = parseInt(sec/60);
  second = sec - minute*60;
  // formating out put
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  if (ms < 100) {
    ms = "0" +ms;
  }
  else if (ms < 10) {
    ms = "00" + ms
  }
  document.getElementById("showTime").innerHTML = hour + ":" + minute + ":" + second + "." + ms;
}

function getResume() {
  // get previous time when watch is resumed.
  var previous = document.getElementById("showTime").innerHTML.split(":");
  var hour = parseInt(previous[0]);
  var minute = parseInt(previous[1]);
  var second = parseInt(previous[2].split(".")[0]);
  var ms = parseInt(previous[2].split(".")[1]);
  return (hour*3600 + minute*60 + second)*1000 + ms;
}