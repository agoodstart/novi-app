import { createContext } from "react";
import ColorTheme from "../ColorTheme";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
      return (
          <ThemeContext.Provider value={{ colors: ColorTheme }}>
              {children}
          </ThemeContext.Provider>
      )
};