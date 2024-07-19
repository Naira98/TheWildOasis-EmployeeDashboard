import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkMoeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('prefers-color-scheme: dark'),
    "isDarkMode"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((isDark) => !isDark);

  return (
    <DarkMoeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkMoeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkMoeContext);
  if (context === undefined)
    throw new Error("Context was used outside the provider");
  return context;
};

export default DarkModeProvider;
