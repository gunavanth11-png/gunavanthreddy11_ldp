import { Box } from "@mui/material";
import SideNavigation from "./components/organism/SideNavigation/SideNavigation";


function App() {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "24px",
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
      }}
    >

      <SideNavigation />

    </Box>
  );
}

export default App;