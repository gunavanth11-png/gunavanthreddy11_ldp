import { Box } from "@mui/material";
import SideNavigation from "./components/organism/SideNavigation";

function App() {
  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
      <SideNavigation />
    </Box>
  );
}

export default App;