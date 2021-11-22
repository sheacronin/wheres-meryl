import { useRef } from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import './App.css';
import Timer from './components/Timer';
import WheresMerylImage from './components/WheresMerylImage';
import SelectionMessage from './components/SelectionMessage';
// eslint-disable-next-line no-unused-vars
import app from './firebaseInit';
import wheresMeryl1 from './img/wheres-meryl-1.jpg';
import Popup from './components/Popup';

function App() {
    const [foundCharacters, setFoundCharacters] = useState([]);
    const [timeInSeconds, setTimeInSeconds] = useState(0);
    const [selectionResult, setSelectionResult] = useState([null, false]);
    const [showPopup, setShowPopup] = useState(false);

    const timerIntervalID = useRef(null);

    useEffect(() => {
        timerIntervalID.current = setInterval(runTimer, 1000);
    }, []);

    function runTimer() {
        setTimeInSeconds((prevState) => prevState + 1);
    }

    useEffect(() => {
        console.log(foundCharacters.length);
        // check for a win
        if (foundCharacters.length === 3) {
            console.log('Stopping Timer!');
            clearInterval(timerIntervalID.current);
            setShowPopup(true);
        }
    }, [foundCharacters]);

    function resetGame() {
        setShowPopup(false);
        setTimeInSeconds(0);
        timerIntervalID.current = setInterval(runTimer, 1000);
        setFoundCharacters([]);
    }

    return (
        <div id="app">
            <header>
                <h1>WHERE'S MERYL?</h1>
                <p>
                    Scroll around this image of Greece to find Donna and the
                    Dynamos from hit film <em>Mamma Mia</em>!
                </p>
                <Timer timeInSeconds={timeInSeconds} />
                <SelectionMessage selectionResult={selectionResult} />
            </header>
            {showPopup && (
                <Popup timeInSeconds={timeInSeconds} resetGame={resetGame} />
            )}
            <WheresMerylImage
                imageSrc={wheresMeryl1}
                setFoundCharacters={setFoundCharacters}
                foundCharacters={foundCharacters}
                setSelectionResult={setSelectionResult}
            />
        </div>
    );
}

export default App;
