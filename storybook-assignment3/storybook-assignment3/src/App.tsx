import { useState } from "react";
import "./App.css";
import Button from "./components/atoms/Button/Button";
import Typography from "./components/atoms/Typograpghy/Typograpghy";
import SidebarItem from "./components/molecules/SidebarItem/SidebarItem";
import StatCard from "./components/molecules/StatCard/StatCard";
import HomeIconSvg from "./assets/icons/Home.svg";
import CalendarIconSvg from "./assets/icons/statcard.svg";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="app-container">
      <div>
        <Typography variant="h1" text="Design System Showcase" />
        <Typography
          variant="body1"
          color="secondary"
          text="Assignment 3: Atomic Design Components (Atoms & Molecules) with 100% Design Tokens and Zero Inline Styles."
        />
      </div>

      {/* Atoms: Typography */}
      <section className="section-card">
        <Typography variant="h2" text="Atoms: Typography" />
        <div className="showcase-row">
          <Typography variant="h1" text="Heading 1" />
          <Typography variant="h2" text="Heading 2" />
          <Typography variant="h3" text="Heading 3" />
          <Typography variant="body1" text="Body Regular" />
          <Typography variant="body2" text="Body Secondary" color="secondary" />
          <Typography variant="caption" text="Caption Label" color="muted" />
          <Typography variant="body1" text="Accent Highlight" color="accent" weight="bold" />
        </div>
      </section>

      {/* Atoms: Button */}
      <section className="section-card">
        <Typography variant="h2" text="Atoms: Button" />
        <div className="showcase-row">
          <Button variant="primary" size="medium" title="Primary Button" />
          <Button variant="secondary" size="medium" title="Secondary Button" />
          <Button variant="outline" size="medium" title="Outline Button" />
          <Button variant="ghost" size="medium" title="Ghost Button" />
          <Button variant="primary" size="small" title="Small" />
          <Button variant="primary" size="large" title="Large" />
          <Button variant="primary" size="medium" title="Disabled" disabled />
        </div>
      </section>

      {/* Molecules: SidebarItem */}
      <section className="section-card">
        <Typography variant="h2" text="Molecules: SidebarItem" />
        <div className="sidebar-showcase-container">
          <SidebarItem
            icon={<img src={HomeIconSvg} alt="" />}
            title="Dashboard"
            active={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          />
          <SidebarItem
            icon={<img src={CalendarIconSvg} alt="" />}
            title="Calendar"
            active={activeTab === "calendar"}
            onClick={() => setActiveTab("calendar")}
          />
          <SidebarItem
            icon={<img src={HomeIconSvg} alt="" />}
            title="Analytics"
            active={activeTab === "analytics"}
            onClick={() => setActiveTab("analytics")}
          />
          <SidebarItem
            icon={<img src={HomeIconSvg} alt="" />}
            title="Settings (Disabled)"
            disabled
          />
        </div>
      </section>

      {/* Molecules: StatCard */}
      <section className="section-card">
        <Typography variant="h2" text="Molecules: StatCard" />
        <div className="showcase-grid">
          <StatCard
            icon={<img src={CalendarIconSvg} alt="" />}
            title="Term Cap"
            value="12 Months"
            variant="default"
          />
          <StatCard
            icon={<img src={CalendarIconSvg} alt="" />}
            title="Applications"
            value="85"
            variant="elevated"
          />
          <StatCard
            icon={<img src={CalendarIconSvg} alt="" />}
            title="Selected"
            value="25"
            variant="outlined"
          />
        </div>
      </section>
    </div>
  );
}

export default App;
