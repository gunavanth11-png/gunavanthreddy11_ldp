type PropsType = {
    name: string;
};

function Child({ name }: PropsType) {
    return <h3>Hello, {name}</h3>;
}

function Props() {
    return (
        <div>
            <Child name="Gunavanth" />
            <Child name="Rahul" />
            <Child name="Sara" />
        </div>
    );
}

export default Props;