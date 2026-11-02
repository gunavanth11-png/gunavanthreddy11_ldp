import { useTheme } from "../context/ThemeContext";

function UseContextDemo() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h2>{theme} Theme</h2>

      <button onClick={toggleTheme}>
        Change Theme
      </button>
    </div>
  );
}

export default UseContextDemo;