function EventObject() {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  return (
    <input
      type="text"
      onChange={handleChange}
      placeholder="Type here"
    />
  );
}

export default EventObject;