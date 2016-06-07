function getTimeHours(seconds) {
  return Math.floor(seconds / 3600);
}

function getTimeMinutes(seconds) {
  var m = Math.floor((seconds % 3600) / 60);
  return m;
}

function getTimeSeconds(seconds) {
  var s = seconds % 60;
  return s < 10 ? '0' + s : s;
}

function getTime(seconds) {
  var hours = getTimeHours(seconds);
  var minutes = getTimeMinutes(seconds);
  var seconds = getTimeSeconds(seconds);
  var time = '';

  if (hours) {
    time += hours + ':';

    if (minutes < 10) {
      time += '0';
    }
  }

  time += minutes + ':' + seconds;

  return time;
}

function getNextBreakTime(levels, currentLevelId) {
  var seconds = 0;

  for (var i = currentLevelId || 0; i < levels.length; i++) {
    var level = levels[i];

    if (level.break) {
      break;
    } else {
      seconds += level.length;
    }
  }

  return seconds;
}

function getEndOfLevelTime(levels, currentLevelId) {
  var seconds = 0;

  if (!levels.length) {
    return 0;
  }

  for (var i = 0; i <= currentLevelId; i++) {
    var level = levels[i];
    seconds = level.length;
  }

  return seconds;
}

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "80px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

$(document).ready(function() {
  $("#playBtn").click(function() {
    $("#playBtn").toggleClass("opacUp");
    if( $("#pauseBtn").hasClass("opacUp")){
      $("#pauseBtn").toggleClass("opacUp");
    }
  });
});

$(document).ready(function() {
  $("#pauseBtn").click(function() {
    $("#pauseBtn").toggleClass("opacUp");
    if(  $("#playBtn").hasClass("opacUp")){
      $("#playBtn").toggleClass("opacUp");
    }

  });
});