import { useRef } from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import './App.css';
import Timer from './components/Timer';
import WheresMerylImage from './components/WheresMerylImage';
// eslint-disable-next-line no-unused-vars
import app from './firebaseInit';
import wheresMeryl1 from './img/wheres-meryl-1.jpg';

function App() {
    const [foundCharacters, setFoundCharacters] = useState([]);
    const [timeInSeconds, setTimeInSeconds] = useState(0);

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
        }
    }, [foundCharacters]);

    return (
        <div>
            <header>
                <h1>Where's Meryl?</h1>
                <p>
                    Scroll around this image of Greece to find Donna and the
                    Dynamos from hit film Mamma Mia!
                </p>
                <Timer timeInSeconds={timeInSeconds} />
            </header>
            <WheresMerylImage
                imageSrc={wheresMeryl1}
                setFoundCharacters={setFoundCharacters}
                foundCharacters={foundCharacters}
            />
        </div>
    );
}

export default App;
