import IconWithTypography from "../../molecules/IconWithTypography/IconWithTypography";
import ProfileCard from "../../molecules/ProfileCard/ProfileCard";
import Typography from "../../atoms/Typography/Typography";
import "./SideNavigation.css";

interface SideNavigationProps {
  title?: string;
  menuOptions: Array<{ text: string; icon: string; active?: boolean }>;
  user: {
    name: string;
    company: string;
    image: string;
  };
  onLogout?: () => void;
}

const SideNavigation = ({ title = "RECRUIT", menuOptions, user, onLogout }: SideNavigationProps) => {
  return (
    <div className="side-nav">
      <div className="side-nav-title">
        <Typography variant="title">{title}</Typography>
      </div>

      <div className="side-nav-menu">
        {menuOptions.map((item) => (
          <IconWithTypography
            key={item.text}
            icon={item.icon}
            text={item.text}
            active={item.active}
          />
        ))}
      </div>

      <div className="side-nav-spacer" />

      <div className="side-nav-divider">
        <ProfileCard
          image={user.image}
          name={user.name}
          company={user.company}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
};

export default SideNavigation;