const Square = (props) => {

    const { chosenEmojis, value, onClick } = props;

    let classes;
    if (value === null) {
        classes = "";
    } else if (value === chosenEmojis.p1.emoji) {
        classes = "text-white bg-blue-500";
    } else {
        classes = "text-white bg-red-500";
    }

    return (
        <button className={`square ` + classes} onClick={onClick}>
            {value}
        </button>
    );
}

export default Square;
