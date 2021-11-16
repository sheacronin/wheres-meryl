import '../styles/ClickBox.css';
import donna from '../img/donna.png';
import tanya from '../img/tanya.png';
import rosie from '../img/rosie.png';

function ClickBox(props) {
    const {
        width,
        boundaries,
        setSelectedTarget,
        showingClickBox,
        foundCharacters,
    } = props;

    if (!width) return null;

    const style = {
        top: boundaries.bottom + '%',
        left: boundaries.right + '%',
        width: width,
        height: width,
    };

    function isAlreadyFound(character) {
        if (foundCharacters.includes(character)) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className="click-box" style={style} hidden={!showingClickBox}>
            <div className="image-selection">
                <h3>Who is here?</h3>
                <button
                    onClick={() => setSelectedTarget('donna')}
                    disabled={isAlreadyFound('donna') ? true : false}
                >
                    <img src={donna} alt="Donna, played by Meryl Streep" />
                </button>
                <button
                    onClick={() => setSelectedTarget('tanya')}
                    disabled={isAlreadyFound('tanya') ? true : false}
                >
                    <img
                        src={tanya}
                        alt="Tanya, played by Christine Baranski"
                    />
                </button>
                <button
                    onClick={() => setSelectedTarget('rosie')}
                    disabled={isAlreadyFound('rosie') ? true : false}
                >
                    <img src={rosie} alt="Rosie, played by Julie Walters" />
                </button>
            </div>
        </div>
    );
}

export default ClickBox;
