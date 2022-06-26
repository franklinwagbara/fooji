import { createTheme } from "@material-ui/core/styles";

const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#D7263D",
    },
    secondary: {
      main: "#FF9000",
    },
    background: {
      paper: "#fafafa",
      default: "#E3E3E3",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

export default mainTheme;
