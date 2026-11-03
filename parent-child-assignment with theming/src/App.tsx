import { Box } from "@mui/material";
import SideNavigation from "./components/organism/SideNavigation/SideNavigation";
import { styles } from "./utils/styles";

const App = () => {
  return (
    <Box sx={styles.appContainer}>
      <SideNavigation />
    </Box>
  );
};

export default App;