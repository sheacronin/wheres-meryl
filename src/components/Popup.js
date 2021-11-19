import { useEffect, useState } from 'react/cjs/react.development';
import { getLeaderboard, setHighScore } from '../firestoreData';
import '../styles/Popup.css';

function Popup(props) {
    const { time } = props;

    const [name, setName] = useState('');
    const [showLeaderBoard, setShowLeaderBoard] = useState(false);
    const [highScores, setHighScores] = useState([]);

    // TODO: on mount, check if time is < the 10th entry in high scores

    // TODO: then determine which place this time is in and cut off the 10th highest score

    function handleChange(e) {
        setName(e.target.value);
    }

    function onSubmitName(e) {
        e.preventDefault();
        setHighScore(name, time);
        setShowLeaderBoard(true);
    }

    useEffect(() => {
        getLeaderboard().then((scores) => setHighScores(scores));
    }, [showLeaderBoard]);

    return (
        <div id="popup-overlay">
            <div id="popup-content">
                <h3>You Found Donna and the Dynamos in {time}!</h3>
                <form>
                    <input type="text" value={name} onChange={handleChange} />
                    <button onClick={onSubmitName}>Submit</button>
                </form>
                {showLeaderBoard &&
                    highScores.map((highScore) => (
                        <div key={highScore.time + '_' + highScore.name}>
                            {highScore.name}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Popup;
