import { FaHome, FaCalendarAlt } from "react-icons/fa";

import SidebarItem from "./components/molecules/SidebarItem";
import StatCard from "./components/molecules/StatCard";

import Button from "./components/atoms/Button";

function App() {
  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        fontFamily: "Arial",
      }}
    >
      <SidebarItem
        icon={<FaHome />}
        title="Home"
      />

      <StatCard
        icon={<FaCalendarAlt />}
        title="Term Cap"
        value="12 Months"
      />

      <Button title="New Cash Kick" />
    </div>
  );
}

export default App;