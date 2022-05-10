import { createContext } from "vm";

import { ReactNode, useState } from "react";

import { ThemeProvider } from "@mui/material";

import { themeCreator } from "./base";

export const ThemeContext = createContext((_themeName: string): void => {
  // do nothing
});

const ThemeProviderWrapper = (props: { children: ReactNode }) => {
  const curThemeName = localStorage.getItem("appTheme") || "PureLightTheme";
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
