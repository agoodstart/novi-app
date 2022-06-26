import { createContext } from "react";
import ColorTheme from "../ColorTheme";
import styles from '../base/colors.scss';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    console.log(styles);
      return (
          <ThemeContext.Provider value={{ colors: ColorTheme }}>
              {children}
          </ThemeContext.Provider>
      )
};