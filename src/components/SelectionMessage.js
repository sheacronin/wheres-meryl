import { useEffect, useState } from 'react';
import '../styles/SelectionMessage.css';

function SelectionMessage(props) {
    const { selectionResult } = props;
    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        if (selectionResult[0] === null) return;

        setIsShowing(true);
        setTimeout(() => setIsShowing(false), 5000);
    }, [selectionResult]);

    function getMessageFromResult() {
        const [target, didClick] = selectionResult;

        if (didClick) {
            return `You found ${capitalizeWord(target)}!`;
        } else {
            return `S.O.S.! ${capitalizeWord(target)} wasn't here.`;
        }
    }

    function capitalizeWord(word) {
        let capitalizedWord = word[0].toUpperCase();
        capitalizedWord += word.slice(1);
        return capitalizedWord;
    }

    if (isShowing) {
        return (
            <div id="selection-message" className="fade-in">
                {getMessageFromResult()}
            </div>
        );
    } else {
        return null;
    }
}

export default SelectionMessage;
