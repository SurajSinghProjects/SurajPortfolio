import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { baselightTheme } from "../../../utils/theme/DefaultColors";

function CustomThemeProvider({ children }) {
  return (
    <div>
      <ThemeProvider theme={baselightTheme}>
        {" "}
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </div>
  );
}

export default CustomThemeProvider;
