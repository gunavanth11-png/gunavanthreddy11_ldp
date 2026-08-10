import { FaHome, FaCalendarAlt } from "react-icons/fa";
import "./App.css";

import SidebarItem from "./components/molecules/SidebarItem";
import StatCard from "./components/molecules/StatCard";
import Button from "./components/atoms/Button";

function App() {
  return (
    <div className="app">
      <SidebarItem
        icon={<FaHome />}
        title="Home"
        className="sidebar-item"
      />

      <StatCard
        icon={<FaCalendarAlt />}
        title="Term Cap"
        value="12 Months"
        className="stat-card"
      />

      <Button
        title="New Cash Kick"
        className="app-button"
      />
    </div>
  );
}

export default App;
