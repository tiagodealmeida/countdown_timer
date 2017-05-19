window.onload = function() {
  clock.innerHTML = '<span>00</span><span>00</span><span>00</span><span>00</span>';
}

document.getElementById("fiveMins").addEventListener("click", startFiveMins)

function startFiveMins() {
  deadline = Date.now() + 5 * 1000 * 60;
  startTimer("clock", deadline)
}

document.getElementById("fifteenMins").addEventListener("click", startFifteenMins)

function startFifteenMins() {
  deadline = Date.now() + 15 * 1000 * 60;
  startTimer("clock", deadline)
}

document.getElementById("thirtyMins").addEventListener("click", startThirtyMins)

function startThirtyMins() {
  deadline = Date.now() + 30 * 1000 * 60;
  startTimer("clock", deadline)
}

function updateTimer(deadline){
  var time = deadline - Date.now();
  return {
    'days': Math.floor( time/(1000*60*60*24) ),
    'hours': Math.floor( (time/(1000*60*60)) % 24 ),
    'minutes': Math.floor( (time/1000/60) % 60 ),
    'seconds': Math.floor( (time/1000) % 60 ),
    'total' : time
  };
}

function animateClock(span){
  span.className = "turn";
  setTimeout(function(){
    span.className = "";
  },700);
}

function startTimer(id, deadline){
  var timerInterval = setInterval(function(){
    var clock = document.getElementById(id);
    var timer = updateTimer(deadline);
    console.log(timer);

    clock.innerHTML = '<span>' + timer.days + '</span>'
                    + '<span>' + timer.hours + '</span>'
                    + '<span>' + timer.minutes + '</span>'
                    + '<span>' + timer.seconds + '</span>';

    //animations
    var spans = clock.getElementsByTagName("span");
    animateClock(spans[3]);
    if(timer.seconds == 59) animateClock(spans[2]);
    if(timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
    if(timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]);

    //check for end of timer
    if(timer.total < 1){
      clearInterval(timerInterval);
      clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
    }

  }, 1000);
}
