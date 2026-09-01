import SideNavigation from "./components/organisms/SideNavigation/SideNavigation";
import { SIDEBAR_MENU_OPTIONS } from "./utils/constants";
import profile from "./assets/images/profile.png";

const App = () => {
  const user = {
    name: "James Rodriguez",
    company: "James.co",
    image: profile,
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <SideNavigation 
      menuOptions={SIDEBAR_MENU_OPTIONS} 
      user={user} 
      onLogout={handleLogout} 
    />
  );
};

export default App;