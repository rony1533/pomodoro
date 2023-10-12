const txtTime = document.getElementById("txtTime");
var interval;
var restInterval;
var isContinuo = false;
var minutes = 0;
var seconds = 0;

function activeContinuo() {
    isContinuo = !isContinuo;
}

function play() {
    document.getElementById('timerContainer').classList.remove("clockStop");
    txtTime.innerHTML = "Iniciando...";

    interval = setInterval(() => {

        timer();

        if (minutes == 25) {
            playNotification();
            txtTime.innerHTML = "Tempo de descanso..."
            minutes = 0;
            seconds = 0;
            setTimeout(() => {
                restTime();
            }, 1500);
            clearInterval(interval)
        }

    }, 1000);

}

function restTime() {

    restInterval = setInterval(() => {
        timer(0);

        if (minutes == 5) {
            if (isContinuo) {
                playNotification();
                txtTime.innerHTML = "Começando novamente..."
                setTimeout(() => {
                    play();
                    clearInterval(restInterval);
                }, 1000);
            } else {
                playNotification();
                txtTime.innerHTML = "Finalizado! :)"
                clearInterval(restInterval);
            }
        }

    }, 1000);
}

function timer() {
    var secondsFormatted = `${seconds}`.padStart(2, '0');
    var minutesFormatted = `${minutes}`.padStart(2, '0');

    txtTime.innerHTML = minutesFormatted + ':' + secondsFormatted;

    if (seconds == 60) {
        minutes++;
        seconds = 0;
    } else {
        seconds++;
    }
}

function stop() {
    clearInterval(interval);
    clearInterval(restInterval);
    txtTime.innerHTML = "Parado";
    document.getElementById('timerContainer').classList.add("clockStop");
}

function playNotification(params) {
    var audio = new Audio('./sounds/notification.wav');
    audio.play();
}
