import '../styles/LeaderBoard.css';
import formatTime from '../formatTime';

function LeaderBoard(props) {
    const { highScores } = props;

    return (
        <table id="leaderboard">
            <thead>
                <tr>
                    <th colSpan="2" id="leaderboard-title">
                        Leaderboard
                    </th>
                </tr>
                <tr>
                    <th className="time">Time</th>
                    <th className="name">Name</th>
                </tr>
            </thead>
            <tbody>
                {highScores.map((highScore) => (
                    <tr key={highScore.time + '_' + highScore.name}>
                        <td className="time">{formatTime(highScore.time)}</td>
                        <td className="name">{highScore.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default LeaderBoard;
