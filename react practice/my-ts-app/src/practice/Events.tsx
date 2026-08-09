function Events() {
    const handleClick = () => {
        alert("Button Clicked!");
    };

    return (
        <>
            <h3>Events Example</h3>

            <button onClick={handleClick}>
                Click Me
            </button>
        </>
    );
}

export default Events;