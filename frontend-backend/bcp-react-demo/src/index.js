import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const THEME = createTheme({
  typography: {
    fontFamily: "Hind Vadodara",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});
window.process = {};
ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={THEME}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
