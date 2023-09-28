import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// mui theme settings
export const themeSettings = () => {
  return {
    palette: {
      primary: {
        main: "#141b2d",
      },
      secondary: {
        main: "#4cceac",
      },
      neutral: {
        dark: "#3d3d3d",
        main: "#666666",
        light: "#e0e0e0",
      },
      background: {
        default: '#001a33',
      },
      text: {
        primary: "#e0e0e0",
      }
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export const useTheme = () => {
  const theme = useMemo(() => createTheme(themeSettings()));
  return [theme];
};
