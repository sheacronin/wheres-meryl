import { useEffect, useState } from 'react';
import '../styles/WheresMerylImage.css';
import ClickBox from './ClickBox';
// eslint-disable-next-line no-unused-vars
import app from '../firebaseInit';
import CharacterMarker from './CharacterMarker';
import { getTargetPositionBox } from '../firestoreData';

function WheresMerylImage(props) {
    const {
        imageSrc,
        foundCharacters,
        setFoundCharacters,
        setSelectionResult,
    } = props;

    const [clickBoxBoundaries, setClickBoxBoundaries] = useState({});
    const [clickBoxWidth, setClickBoxWidth] = useState({});
    const [selectedTarget, setSelectedTarget] = useState(null);
    const [showingClickBox, setShowingClickBox] = useState(false);

    function showClickBox(e) {
        const width = e.target.width * 0.05;
        const boundaries = getClickBoxBoundaries(e);

        setClickBoxWidth(width);
        setClickBoxBoundaries(boundaries);
        setShowingClickBox(true);
    }

    function getClickBoxBoundaries(e) {
        const coords = getClickedPercentageCoordinates(e);
        const clickBox = makeClickBox(coords);
        return clickBox;
    }

    function getClickedPercentageCoordinates(e) {
        const xPercentage = getClickedPercentage(e.pageX, e.target.width);
        const yPercentage = getClickedPercentage(e.pageY, e.target.height);

        function getClickedPercentage(clickedCoord, imageDimension) {
            return (clickedCoord / imageDimension) * 100;
        }

        return [xPercentage, yPercentage];
    }

    function makeClickBox(percentageCoords) {
        const [x, y] = percentageCoords;

        const clickBox = {
            top: y - 2.5,
            right: x + 2.5,
            bottom: y + 2.5,
            left: x - 2.5,
        };

        return clickBox;
    }

    useEffect(() => {
        if (!selectedTarget) return;

        checkIfClickedTarget(selectedTarget).then((didClickTarget) => {
            console.log(didClickTarget);
            if (didClickTarget) {
                handleCorrectSelection(selectedTarget);
            } else {
                handleIncorrectSelection(selectedTarget);
            }
        });

        async function checkIfClickedTarget(target) {
            const targetBox = await getTargetPositionBox(target);

            const isInTarget =
                isInHorizontalTarget(targetBox) &&
                isInVerticalTarget(targetBox);

            function isInVerticalTarget(targetBox) {
                if (
                    (clickBoxBoundaries.top > targetBox.top &&
                        clickBoxBoundaries.top < targetBox.bottom) ||
                    (clickBoxBoundaries.bottom > targetBox.top &&
                        clickBoxBoundaries.bottom < targetBox.bottom) ||
                    (clickBoxBoundaries.top < targetBox.top &&
                        clickBoxBoundaries.bottom > targetBox.bottom)
                ) {
                    return true;
                } else {
                    return false;
                }
            }

            function isInHorizontalTarget(targetBox) {
                if (
                    (clickBoxBoundaries.left > targetBox.left &&
                        clickBoxBoundaries.left < targetBox.right) ||
                    (clickBoxBoundaries.right > targetBox.left &&
                        clickBoxBoundaries.right < targetBox.right) ||
                    (clickBoxBoundaries.left < targetBox.left &&
                        clickBoxBoundaries.right > targetBox.right)
                ) {
                    return true;
                } else {
                    return false;
                }
            }

            console.log(isInTarget);
            return isInTarget;
        }

        function handleCorrectSelection(target) {
            setShowingClickBox(false);
            setSelectedTarget(null);

            console.log('found ' + target);
            // place marker on character
            setFoundCharacters((prevState) => [...prevState, target]);

            // TODO: show text that says "You've found [character]!"
            setSelectionResult([target, true]);
        }

        function handleIncorrectSelection(target) {
            setShowingClickBox(false);
            setSelectedTarget(null);

            // show text that says "Sorry, there is no Donna or Dynamo here!"
            setSelectionResult([target, false]);
        }
    }, [
        selectedTarget,
        clickBoxBoundaries,
        setFoundCharacters,
        foundCharacters,
        setSelectionResult,
    ]);

    return (
        <div className="wheres-meryl-container">
            {foundCharacters.map((character) => (
                <CharacterMarker key={character} characterName={character} />
            ))}
            <ClickBox
                width={clickBoxWidth}
                boundaries={clickBoxBoundaries}
                setSelectedTarget={setSelectedTarget}
                showingClickBox={showingClickBox}
                foundCharacters={foundCharacters}
            />
            <img
                className="wheres-meryl"
                src={imageSrc}
                alt="Look around to find Donna and the Dynamos!"
                onClick={showClickBox}
            />
        </div>
    );
}

export default WheresMerylImage;
