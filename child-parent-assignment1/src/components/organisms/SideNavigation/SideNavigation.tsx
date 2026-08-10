import IconWithTypography from "../../molecules/IconWithTypography/IconWithTypography";
import ProfileCard from "../../molecules/ProfileCard/ProfileCard";
import { SIDEBAR_MENU_OPTIONS } from "../../../utils/constants";
import profile from "../../../assets/images/profile.png";

const styles = {
  sideNav: {
    width: "250px",
    height: "100vh",
    background: "#fff",
    borderRight: "1px solid #eee",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column" as const,
  },

  title: {
    color: "#3218B8",
    fontSize: "20px",
    fontWeight: 700,
  },

  divider: {
    borderTop: "1px solid #eee",
    paddingTop: "16px",
  },

  spacer: {
    flex: 1,
  },

  iconTypographyProps: {
    gap: "14px",
    height: "48px",
    padding: "0 14px",
    borderRadius: "8px",
    activeBackgroundColor: "#F1EEFF",
    inactiveBackgroundColor: "transparent",
  },

  typographyProps: {
    color: "#454545",
    activeColor: "#5B3DF5",
    fontSize: "14px",
    fontWeight: 500,
    activeFontWeight: 600,
    fontFamily: "Inter, sans-serif",
  },

  iconProps: {
    width: "20px",
    iconHeight: "20px",
    activeFilter:
      "brightness(0) saturate(100%) invert(30%) sepia(90%) saturate(3000%)",
    inactiveFilter: "none",
  },
};

const SideNavigation = () => {
  return (
  <div style={styles.sideNav}>
    <div style={styles.title}>RECRUIT</div>

    {SIDEBAR_MENU_OPTIONS.map((item) => (
      <IconWithTypography
        key={item.text}
        icon={item.icon}
        text={item.text}
        active={item.active}
        {...styles.iconTypographyProps}
        {...styles.iconProps}
        {...styles.typographyProps}
      />
    ))}

    <div style={styles.spacer} />

    <div style={styles.divider}>
      <ProfileCard
        image={profile}
        name="James Rodriguez"
        company="James.co"
      />
    </div>
  </div>
  );
};

export default SideNavigation;
