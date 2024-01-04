import { createContext, ReactNode, useState, useCallback } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: (value: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

function ThemeProvider({ children }: ProviderProps) {
  const [theme, setTheme] = useState('');

  const customSetTheme = useCallback((value: string) => {
      setTheme(value);
  },[setTheme]);

  const value: ThemeContextType = {
    theme,
    setTheme: customSetTheme,
  };


  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
