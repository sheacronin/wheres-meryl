import '../styles/WheresMerylImage.css';

function WheresMerylImage(props) {
    const { imageSrc } = props;

    function getClickedPercentageCoordinates(e) {
        const xPercentage = getClickedPercentage(e.clientX, e.target.width);
        const yPercentage = getClickedPercentage(e.clientY, e.target.height);

        function getClickedPercentage(clickedCoord, imageDimension) {
            return (clickedCoord / imageDimension) * 100;
        }

        return [xPercentage, yPercentage];
    }

    return (
        <img
            className="wheres-meryl"
            src={imageSrc}
            alt="Look around to find Donna and the Dynamos!"
            onClick={getClickedPercentageCoordinates}
        ></img>
    );
}

export default WheresMerylImage;
