
function startTimer(duration, display) {


    var timer = duration, minutes, seconds;
    setInterval(function () {
        if (!$('#time').hasClass('pauseInterval')) {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
            }


        } else {
            console.log('Stopped counting');
        }
    }, 1000);
    }

window.onload = function () {
    var blind = 60 * 20,
        display = document.querySelector('#time');
    startTimer(blind, display);
};


 $('#pause').click(function() {
     console.log('button yeaaah');
 $('#time').toggleClass('pauseInterval');
 });

$(document).keydown(function(e) {
    if (e.which === 32) {
        $('#time').toggleClass('pauseInterval');
    }
});

$('#time').hover(function() { //mouse enter
        $(this).addClass('pauseInterval');
    },function() { //mouse leave
        $(this).removeClass('pauseInterval');
    }
);

