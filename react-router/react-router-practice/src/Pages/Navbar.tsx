import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    marginRight: "1.2rem",
    textDecoration: "none",
    color: isActive ? "#e63946" : "#333",
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
      <NavLink to="/" style={linkStyle} end>
        Home
      </NavLink>
      <NavLink to="/about" style={linkStyle}>
        About
      </NavLink>
      <NavLink to="/products" style={linkStyle}>
        Products
      </NavLink>
      <NavLink to="/contact" style={linkStyle}>
        Contact
      </NavLink>
    </nav>
  );
};

export default Navbar;