import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import CandidatesPage from "./components/pages/CandidatesPage/CandidatesPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CandidatesPage />
    </ThemeProvider>
  );
}

export default App;