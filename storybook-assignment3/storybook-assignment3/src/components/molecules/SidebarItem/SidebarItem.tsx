import type { ReactNode } from "react";
import Typography from "../../atoms/Typograpghy/Typograpghy";

export interface SidebarItemProps {
  icon: ReactNode;
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const SidebarItem = ({
  icon,
  title,
  active = false,
  disabled = false,
  onClick,
  className = "",
}: SidebarItemProps) => {
  const itemClasses = [
    "sidebar-item",
    active ? "sidebar-item--active active" : "",
    disabled ? "sidebar-item--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={itemClasses}
      onClick={onClick}
      disabled={disabled}
      aria-current={active ? "page" : undefined}
    >
      <span className="sidebar-item__icon sidebar-icon" aria-hidden="true">
        {icon}
      </span>

      <Typography
        as="span"
        className="sidebar-item__title"
        text={title}
        variant="body2"
        weight={active ? "semibold" : "medium"}
        color={active ? "accent" : "secondary"}
      />
    </button>
  );
};

export default SidebarItem;