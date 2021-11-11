import { useEffect, useState } from 'react';
import '../styles/WheresMerylImage.css';
import ClickBox from './ClickBox';
// eslint-disable-next-line no-unused-vars
import app from '../firebaseInit';
import { getFirestore, getDoc, doc } from 'firebase/firestore';

const db = getFirestore();

function WheresMerylImage(props) {
    const { imageSrc } = props;

    const [clickBoxBoundaries, setClickBoxBoundaries] = useState({});
    const [clickBoxWidth, setClickBoxWidth] = useState({});
    const [selectedTarget, setSelectedTarget] = useState('');

    function showClickBox(e) {
        const width = e.target.width * 0.05;
        const boundaries = getClickBoxBoundaries(e);

        setClickBoxWidth(width);
        setClickBoxBoundaries(boundaries);
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

        checkIfClickedTarget(selectedTarget);

        async function checkIfClickedTarget(target) {
            const targetRef = doc(db, 'images/1/character-positions', target);
            const targetSnap = await getDoc(targetRef);

            if (targetSnap.exists()) {
                console.log('Document data:', targetSnap.data());
            } else {
                console.log('No such document!');
            }

            const targetBox = targetSnap.data();
            console.log(clickBoxBoundaries);

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
    }, [selectedTarget, clickBoxBoundaries]);

    return (
        <div className="wheres-meryl-container">
            <img
                className="wheres-meryl"
                src={imageSrc}
                alt="Look around to find Donna and the Dynamos!"
                onClick={showClickBox}
            />
            <ClickBox
                width={clickBoxWidth}
                boundaries={clickBoxBoundaries}
                setSelectedTarget={setSelectedTarget}
            />
        </div>
    );
}

export default WheresMerylImage;
