function formatTime(timeInSeconds) {
    let minutes = 0;
    let seconds = timeInSeconds;

    if (timeInSeconds > 60) {
        minutes = Math.floor(timeInSeconds / 60);
        seconds = timeInSeconds % 60;
    }

    if (minutes < 10) {
        minutes = addZeroBefore(minutes);
    }

    if (seconds < 10) {
        seconds = addZeroBefore(seconds);
    }

    return `${minutes}:${seconds}`;

    function addZeroBefore(num) {
        return '0' + num;
    }
}

export default formatTime;
