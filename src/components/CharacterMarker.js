import '../styles/CharacterMarker.css';
import donna from '../img/donna.png';
import tanya from '../img/tanya.png';
import rosie from '../img/rosie.png';
import { getTargetPositionBox } from '../firestoreData';
import { useEffect, useState } from 'react';

const images = { donna, tanya, rosie };

function CharacterMarker(props) {
    const { characterName } = props;
    const [characterPosition, setCharacterPosition] = useState(null);

    useEffect(() => {
        getTargetPositionBox(characterName).then((targetBox) =>
            setCharacterPosition(targetBox)
        );
    }, [characterName]);

    if (characterPosition) {
        const style = {
            top: `calc(${characterPosition.top}% - 120px)`,
            left: `calc(${
                (characterPosition.right + characterPosition.left) / 2
            }% - 40px)`,
        };

        return (
            <div className="character-marker" style={style}>
                <img src={images[characterName]} alt={characterName} />
            </div>
        );
    } else {
        return null;
    }
}

export default CharacterMarker;
