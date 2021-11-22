import { useEffect, useState } from 'react/cjs/react.development';
import formatTime from '../formatTime';
import {
    checkIfHighScore,
    getLeaderboard,
    setHighScore,
} from '../firestoreData';
import '../styles/Popup.css';
import LeaderBoard from './LeaderBoard';

function Popup(props) {
    const { timeInSeconds, resetGame } = props;

    const [name, setName] = useState('');
    const [highScores, setHighScores] = useState([]);
    const [showLeaderBoard, setShowLeaderBoard] = useState(false);
    const [showNameInput, setShowNameInput] = useState(false);

    useEffect(() => {
        console.log('running effect');
        checkIfHighScore(timeInSeconds).then((result) => {
            console.log(result);
            if (result === true) {
                setShowNameInput(true);
            } else {
                setShowLeaderBoard(true);
            }
        });
    }, [timeInSeconds]);

    function handleChange(e) {
        setName(e.target.value);
    }

    function onSubmitName(e) {
        e.preventDefault();
        setHighScore(name, timeInSeconds);
        setShowLeaderBoard(true);
        setShowNameInput(false);
    }

    useEffect(() => {
        getLeaderboard().then((scores) => setHighScores(scores));
    }, [showLeaderBoard]);

    return (
        <div id="popup-overlay">
            <div id="popup-content">
                <h3>
                    You Found Donna and the Dynamos in{' '}
                    {formatTime(timeInSeconds)}!
                </h3>
                {showNameInput && (
                    <form>
                        <p>You made it onto the leaderboard!</p>
                        <label htmlFor="high-score-name">Your Name:</label>
                        <input
                            type="text"
                            value={name}
                            id="high-score-name"
                            name="high-score-name"
                            onChange={handleChange}
                        />
                        <button onClick={onSubmitName}>Submit</button>
                    </form>
                )}
                {showLeaderBoard && <LeaderBoard highScores={highScores} />}
                {showLeaderBoard && (
                    <button id="play-again" onClick={resetGame}>
                        Play Again
                    </button>
                )}
            </div>
        </div>
    );
}

export default Popup;
