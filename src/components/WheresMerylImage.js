import { useState } from 'react';
import '../styles/WheresMerylImage.css';
import ClickBox from './ClickBox';

function WheresMerylImage(props) {
    const { imageSrc } = props;

    const [clickBoxInfo, setClickBoxInfo] = useState({});

    function showClickBox(e) {
        const clickBoxWidth = e.target.width * 0.05;
        const clickBoxBoundaries = getClickBoxBoundaries(e);

        setClickBoxInfo({
            width: clickBoxWidth,
            boundaries: clickBoxBoundaries,
        });
    }

    function getClickBoxBoundaries(e) {
        const coords = getClickedPercentageCoordinates(e);
        const clickBox = makeClickBox(coords);
        console.log(clickBox);
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
            top: y + 2.5,
            right: x + 2.5,
            bottom: y - 2.5,
            left: x - 2.5,
        };

        return clickBox;
    }

    return (
        <div className="wheres-meryl-container">
            <img
                className="wheres-meryl"
                src={imageSrc}
                alt="Look around to find Donna and the Dynamos!"
                onClick={showClickBox}
            />
            <ClickBox info={clickBoxInfo} />
        </div>
    );
}

export default WheresMerylImage;
