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
    const { timeInSeconds } = props;

    const [name, setName] = useState('');
    const [showLeaderBoard, setShowLeaderBoard] = useState(false);
    const [highScores, setHighScores] = useState([]);
    const [isHighScore, setIsHighScore] = useState(false);

    // TODO: on mount, check if time is < the 10th entry in high scores
    useEffect(() => {
        console.log('running effect');
        checkIfHighScore(timeInSeconds).then((result) => {
            console.log(result);
            if (result === true) {
                setIsHighScore(true);
            } else {
                setShowLeaderBoard(true);
            }
        });
    }, [timeInSeconds]);

    // TODO: then determine which place this time is in and cut off the 10th highest score

    function handleChange(e) {
        setName(e.target.value);
    }

    function onSubmitName(e) {
        e.preventDefault();
        setHighScore(name, timeInSeconds);
        setShowLeaderBoard(true);
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
                {isHighScore && (
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
            </div>
        </div>
    );
}

export default Popup;
