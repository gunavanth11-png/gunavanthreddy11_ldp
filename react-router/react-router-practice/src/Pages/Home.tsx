import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/contact");
  };

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome! Practice navigating between pages here.</p>

      <ul>
        <li>
          <Link to="/about">Go to About</Link>
        </li>
        <li>
          <Link to="/products">Go to Products</Link>
        </li>
      </ul>

      <button onClick={goToContact}>Contact Us (programmatic nav)</button>
    </div>
  );
};

export default Home;