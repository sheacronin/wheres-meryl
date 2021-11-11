import '../styles/WheresMerylImage.css';

function WheresMerylImage(props) {
    const { imageSrc } = props;

    function getClickBoxFromClickEvent(e) {
        const coords = getClickedPercentageCoordinates(e);
        const clickBox = makeClickBox(coords);
        console.log(clickBox);
        return clickBox;
    }

    function getClickedPercentageCoordinates(e) {
        const xPercentage = getClickedPercentage(e.clientX, e.target.width);
        const yPercentage = getClickedPercentage(e.clientY, e.target.height);

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
        <img
            className="wheres-meryl"
            src={imageSrc}
            alt="Look around to find Donna and the Dynamos!"
            onClick={getClickBoxFromClickEvent}
        ></img>
    );
}

export default WheresMerylImage;
