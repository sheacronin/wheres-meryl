import '../styles/LeaderBoard.css';

function LeaderBoard(props) {
    const { highScores } = props;

    return (
        <table id="leaderboard">
            <tr>
                <th colSpan="2" id="leaderboard-title">
                    Leaderboard
                </th>
            </tr>
            <tr>
                <th className="time">Time</th>
                <th className="name">Name</th>
            </tr>
            {highScores.map((highScore) => (
                <tr key={highScore.time + '_' + highScore.name}>
                    <td className="time">{highScore.time}</td>
                    <td className="name">{highScore.name}</td>
                </tr>
            ))}
        </table>
    );
}

export default LeaderBoard;
