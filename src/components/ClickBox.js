import '../styles/ClickBox.css';
import meryl from '../img/meryl.png';

function ClickBox(props) {
    const { width, boundaries, setSelectedTarget } = props;

    if (!width) return null;

    const style = {
        top: boundaries.bottom + '%',
        left: boundaries.right + '%',
        width: width,
        height: width,
    };

    return (
        <div className="click-box" style={style}>
            <div className="image-selection">
                <h3>Who is here?</h3>
                <img
                    src={meryl}
                    alt="Donna, played by Meryl Streep"
                    onClick={() => setSelectedTarget('donna')}
                />
                <img src="#" alt="Tanya" />
                <img src="#" alt="Rosie" />
            </div>
        </div>
    );
}

export default ClickBox;
