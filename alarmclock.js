var alarmSound = new Audio("alarm.mp3");
document.querySelector("#stop").disabled = true;
// display time in timer

function timeTicking() {
  var inputTime = new Date();
  var displayHours = inputTime.getHours();
  var displayMinutes = inputTime.getMinutes();
  var displaySeconds = inputTime.getSeconds();
  displayHours = addZero(displayHours);
  displayMinutes = addZero(displayMinutes);
  displaySeconds = addZero(displaySeconds);
  var displayTime = displayHours + ":" + displayMinutes + ":" + displaySeconds;
  document.querySelector("#timer").innerHTML = displayTime;
}
setInterval(timeTicking, 100);

// add zero in front of numbers < 10
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Entering options 00 - 23 in hours
function addHour() {
  for (i = 0; i < 24; i++) {
    var option = document.createElement("option");
    option.text = addZero(i);
    document.querySelector("#hour").add(option, null);
  }
}
addHour();

// Entering options 00 - 59 in minutes
function addMin() {
  for (i = 0; i < 60; i++) {
    var option = document.createElement("option");
    option.text = addZero(i);
    document.querySelector("#minute").add(option, null);
  }
}
addMin();

// Entering options 00 - 59 in seconds
function addSec() {
  for (i = 0; i < 60; i++) {
    var option = document.createElement("option");
    option.text = addZero(i);
    document.querySelector("#second").add(option, null); // null = the position of the option where i want to place it. null means at the end
  }
}
addSec();

// Checking the alarm inputs

function checkAlarm() {
  var inputHr = document.querySelector("#hour").value;
  var inputMin = document.querySelector("#minute").value;
  var inputSec = document.querySelector("#second").value;
  var userTimeInput = inputHr + ":" + inputMin + ":" + inputSec;
  document.querySelector("#user_input").innerHTML = userTimeInput;
  document.querySelector("#start").disabled = true;
  addInactiveClass("start");
  document.querySelector(".message").style.visibility = "visible";
}
// Comparing with clock time

function repeat() {
  if (
    document.querySelector("#timer").innerHTML ===
    document.querySelector("#user_input").innerHTML
  ) {
    console.log("alarm hit!");
    alarmSound.play();
    document.querySelector("#start").disabled = false;
    document.querySelector("#stop").disabled = false;
    addActiveClass("stop");
    document.querySelector(".message").style.visibility = "hidden";
    document.querySelector("#user_input").innerHTML = "";

  }
}

// Start alarm button click function and repeatedly Checking

document.querySelector("#start").addEventListener("click", function () {
  checkAlarm();
  if (
    document.querySelector("#timer").innerHTML >
    document.querySelector("#user_input").innerHTML
  ) {
    alert("Time is gone!");
    document.querySelector("#user_input").innerHTML = "";
    document.querySelector("#start").disabled = false;
    addActiveClass("start");
    document.querySelector(".message").style.visibility = "hidden";
  }
  setInterval(repeat, 1000);
});

// Clear button

document.querySelector("#clear").addEventListener("click", function () {
  document.querySelector("#user_input").innerHTML = "";
  document.querySelector("#hour").value = "00";
  document.querySelector("#minute").value = "00";
  document.querySelector("#second").value = "00";
  document.querySelector("#start").disabled = false;
  document.querySelector(".message").style.visibility = "hidden";
  addActiveClass("start");
  addInactiveClass("stop");
});

// Stop button Code
document.querySelector("#stop").addEventListener("click", function () {
  alarmSound.pause();
  document.querySelector("#stop").disabled = true;
  addActiveClass("start");
  addInactiveClass("stop");
});

// adding active class and removing inactive class
function addActiveClass(buttonTag){
  document.querySelector("#" + buttonTag).classList.add("active");
  document.querySelector("#" + buttonTag).classList.remove("inactive");
}

// adding inactive class and removing active class
function addInactiveClass(buttonTag){
  document.querySelector("#" + buttonTag).classList.add("inactive");
  document.querySelector("#" + buttonTag).classList.remove("active");
}