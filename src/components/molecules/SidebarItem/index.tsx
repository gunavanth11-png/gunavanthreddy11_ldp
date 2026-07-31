import type { ReactNode } from "react";
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
        padding: "12px 16px",
        borderRadius: "8px",
        background: "#F5F5F5",
        width: "220px",
      }}
    >
      <span style={{ fontSize: "18px" }}>{icon}</span>

      <Typography
        text={title}
        size="15px"
        weight={500}
      />
    </div>
  );
};

export default SidebarItem;