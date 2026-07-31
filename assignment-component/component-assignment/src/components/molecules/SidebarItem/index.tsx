import { ReactNode } from "react";
import Typography from "../../atoms/Typography";

interface SidebarItemProps {
  icon: ReactNode;
  title: string;
}

const SidebarItem = ({ icon, title }: SidebarItemProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px",
        width: "220px",
        borderRadius: "10px",
        border: "1px solid #E5E7EB",
      }}
    >
      <div style={{ fontSize: "22px" }}>{icon}</div>

      <Typography
        text={title}
        weight={600}
      />
    </div>
  );
};

export default SidebarItem;