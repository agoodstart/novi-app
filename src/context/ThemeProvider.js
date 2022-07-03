import { createContext, useEffect, useState } from "react";
import ColorTheme from "../ColorTheme";
import styles from '../base/Colors.module.scss';
import { useCallback } from "react";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [textColor, setTextColor] = useState({})
    const [backgroundColor, setBackgroundColor] = useState({});

    const colors = ['primary', 'secondary', 'tertiary', 'quaternary', 'quintenary', 'black', 'white', 'gray'];
    const variants = ['main', 'dark', 'light', 'alpha'];

    const createColors = (split) => {
        let colorMap = {};

        for (const [key, value] of Object.entries(split)) {
            const classNameArr = key.split('-')

            colors.forEach(color => {
                if(classNameArr.includes(color)) {
                    colorMap[color] = {
                        ...colorMap[color],
                    };

                    if(color === "white" && classNameArr.includes(color)) {
                        colorMap.white = value;
                    }

                    if(color === "black" && classNameArr.includes(color)) {
                        colorMap.black.main = value;
                    }


                    variants.forEach(variant => {         
                        if(classNameArr.includes(color) && classNameArr.includes(variant)) {
                            if(variant === "alpha") {
                                const alphaPercentage = classNameArr[classNameArr.length - 1];
                                colorMap[color][variant] = {
                                    ...colorMap[color][variant],
                                    [alphaPercentage]: value
                                }
                            } else {
                                colorMap[color] = {
                                    ...colorMap[color],
                                    [variant]: value
                                };
                            }
                        }
                    });

                }
            })
        }

        return colorMap;
    }

    const createColorTheme = useCallback(() => {
        let textSplit = {};
        let backgroundSplit = {};

        for (const [key, value] of Object.entries(styles)) {
            if(key.startsWith("bg")) {
                backgroundSplit[key] = value;
            } else if(key.startsWith("text")) {
                textSplit[key] = value;
            }
        }

        const backgroundColors = createColors(backgroundSplit);
        const textColors = createColors(textSplit);

        setTextColor(textColors);
        setBackgroundColor(backgroundColors);
    }, []);

    useEffect(() => {
        createColorTheme();
    }, [createColorTheme]);

    useEffect(() => {
        console.log(textColor);
    }, [textColor])

    return (
        <ThemeContext.Provider value={{ colors: ColorTheme }}>
            {children}
        </ThemeContext.Provider>
    )
};