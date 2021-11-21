import formatTime from '../formatTime';
import '../styles/Timer.css';

function Timer(props) {
    const { timeInSeconds } = props;

    return <div id="timer">{formatTime(timeInSeconds)}</div>;
}

export default Timer;
