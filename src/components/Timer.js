import '../styles/Timer.css';

function Timer(props) {
    const { time } = props;

    return <div id="timer">{time}</div>;
}

export default Timer;
