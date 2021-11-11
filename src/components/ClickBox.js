import '../styles/ClickBox.css';

function ClickBox(props) {
    const { width, boundaries } = props.info;

    if (!width) return null;

    const style = {
        top: boundaries.bottom + '%',
        left: boundaries.right + '%',
        width: width,
        height: width,
    };

    return <div className="click-box" style={style}></div>;
}

export default ClickBox;
