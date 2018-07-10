// ID of setInterval(global)
var countID;

function inputMilliSec() {
	var given = document.getElementById("set_time");
	hour = parseInt(given["hour"].value);
	minute = parseInt(given["minute"].value);
	second = parseInt(given["second"].value);
	if (isNaN(hour)) hour = 0;
	if (isNaN(minute)) minute = 0;
	if (isNaN(second)) second = 0;
	return (hour*3600+minute*60+second)*1000;
	//Test
	//document.getElementById("countDown").innerHTML = given["hour"].value + given["minute"].value + given["second"].value;
}

function start() {
	document.getElementById("startBtn").disabled = true;
	document.getElementById("pauseBtn").disabled = false;
	document.getElementById("resetBtn").disabled = false;
	// now + input = target time
	var target = Date.now() + inputMilliSec();
	// disable start button avoid mutiple tread
	document.getElementById("startBtn").disabled = true;
	countID = setInterval(showRemain, 100, target);
}

function showRemain(target) {
	document.getElementById("countDown").style.display = "block";
	document.getElementById("set_time").style.display = "none";
	// keep tracking now() and its difference between target time
	var now = Date.now();
	var diff = target-now;
	// convert "remian seconds" to "hour" "minute" "second"
	var remainSec = parseInt(diff/1000);
	var hour = parseInt(remainSec/3600);
	remainSec %= 3600;
	var minute = parseInt(remainSec/60);
	remainSec %= 60;
	var second = parseInt(remainSec);
	if (hour < 10) {
		hour = "0" + hour;
	}
	if (minute < 10) {
		minute = "0" + minute;
	}
	if (second < 10) {
		second = "0" + second;
	}
	document.getElementById("countDown").innerHTML = hour + ":" + minute + ":" + second;
	// time is up, stop timer and "beep"
	if (target <= Date.now()) {
		clearInterval(countID);
		alert("beep beep");
	}
}

function getRemainMilliSec() {
  var timeStr = document.getElementById("countDown").innerHTML;
  var time = timeStr.split(":");
  var milliSec = (parseInt(time[0])*3600 + parseInt(time[1])*60 + parseInt(time[2]))*1000;
  return milliSec;
}

function pause() {
  var btnTxt = document.getElementById("pauseBtn").innerHTML;
  if (btnTxt == "Pause") {
    clearInterval(countID);
    document.getElementById("pauseBtn").innerHTML = "Resume";
  }
  else if (btnTxt == "Resume") {
    var target = Date.now() + getRemainMilliSec();
    document.getElementById("pauseBtn").innerHTML = "Pause";
    countID = setInterval(showRemain, 100, target);
  }
}

function resetTimer() {
	clearInterval(countID);
	document.getElementById("countDown").innerHTML = "00:00:00";
	document.getElementById("countDown").style.display = "none";
	document.getElementById("set_time").style.display = "block";
	document.getElementById("pauseBtn").innerHTML = "Pause";
	document.getElementById("startBtn").disabled = false;
	document.getElementById("pauseBtn").disabled = true;
	document.getElementById("resetBtn").disabled = true;
	document.getElementById("set_time").reset();
}