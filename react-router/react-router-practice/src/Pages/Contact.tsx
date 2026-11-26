import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div>
      <h1>Contact</h1>
      {submitted ? (
        <p>Thanks! Redirecting to Home...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your name" required />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Contact;