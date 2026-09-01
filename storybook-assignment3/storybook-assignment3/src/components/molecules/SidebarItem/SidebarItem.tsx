import { ReactNode } from "react";
import Typography from "../../atoms/Typograpghy/Typograpghy";

interface SidebarItemProps {
  icon: ReactNode;
  title: string;
  className?: string;
  style?: React.CSSProperties;
}

const SidebarItem = ({ icon, title, className, style }: SidebarItemProps) => {
  return (
    <div className={className} style={style}>
      <div className="sidebar-icon">{icon}</div>

      <Typography
        text={title}
        weight={600}
      />
    </div>
  );
};

export default SidebarItem;