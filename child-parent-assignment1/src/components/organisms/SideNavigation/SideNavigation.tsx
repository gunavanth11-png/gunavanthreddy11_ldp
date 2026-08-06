import IconWithTypography from "../../molecules/IconWithTypography/IconWithTypography";
import Avatar from "../../molecules/Avatar/Avatar";

import home from "../../../assets/icons/home.svg";
import users from "../../../assets/icons/users.svg";
import gavel from "../../../assets/icons/gavel.svg";
import document from "../../../assets/icons/document.svg";
import chart from "../../../assets/icons/chart.svg";
import account from "../../../assets/icons/account.svg";
import screening from "../../../assets/icons/screening.svg";

import profile from "../../../assets/images/profile.png";

const sideNavStyles = {
  width: "250px",
  height: "100vh",
  background: "#fff",
  borderRight: "1px solid #eee",
  padding: "24px 16px",
};

const titleStyles = {
  color: "#3218B8",
  fontSize: "20px",
  fontWeight: 700,
};

const dividerStyles = {
  borderTop: "1px solid #eee",
  paddingTop: "16px",
};

const iconTypographyProps = {
  gap: "14px",
  height: "48px",
  padding: "0 14px",
  borderRadius: "8px",
  activeBackgroundColor: "#F1EEFF",
  inactiveBackgroundColor: "transparent",
};

const typographyProps = {
  color: "#454545",
  activeColor: "#5B3DF5",
  fontSize: "14px",
  fontWeight: 500,
  activeFontWeight: 600,
  fontFamily: "Inter, sans-serif",
};

const iconProps = {
  width: "20px",
  iconHeight: "20px",
  activeFilter:
    "brightness(0) saturate(100%) invert(30%) sepia(90%) saturate(3000%)",
  inactiveFilter: "none",
};

const avatarProps = {
  gap: "10px",
  imageWidth: "38px",
  imageHeight: "38px",
  borderRadius: "50%",
  nameColor: "#333333",
  nameFontSize: "14px",
  nameFontWeight: 600,
  companyColor: "#999999",
  companyFontSize: "12px",
};

const menu = [
  { text: "Home", icon: home, active: false },
  { text: "Candidates", icon: users, active: true },
  { text: "Adverse Actions", icon: gavel, active: false },
  { text: "Logs", icon: document, active: false },
  { text: "Analytics", icon: chart, active: false },
  { text: "Account", icon: account, active: false },
  { text: "Screenings", icon: screening, active: false },
];

const SideNavigation = () => {
  return (
    <div
      style={{
        ...sideNavStyles,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={titleStyles}>RECRUIT</h2>

      {menu.map((item) => (
        <IconWithTypography
          key={item.text}
          icon={item.icon}
          text={item.text}
          active={item.active}
          {...iconTypographyProps}
          {...iconProps}
          {...typographyProps}
        />
      ))}

      <div style={{ flex: 1 }} />

      <div style={dividerStyles}>
        <Avatar
          image={profile}
          name="James Rodriguez"
          company="James.co"
          {...avatarProps}
        />
      </div>
    </div>
  );
};

export default SideNavigation;