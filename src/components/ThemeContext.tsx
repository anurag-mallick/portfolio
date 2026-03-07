"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "futuristic" | "midnight";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("midnight");

  useEffect(() => {
    // Sync state with what was set by the blocking script or localStorage
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme;
    const initialTheme: Theme = (savedTheme === "futuristic" || savedTheme === "midnight") 
      ? savedTheme 
      : "midnight";
    
    setThemeState(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
