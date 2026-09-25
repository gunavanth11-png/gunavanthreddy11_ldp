function FormSubmit() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Form Submitted");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormSubmit;