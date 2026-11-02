import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <p>This is a practice app for learning React Router concepts.</p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
};

export default About;