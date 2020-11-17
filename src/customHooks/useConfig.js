import { useState } from 'react';
const VALID_THEMES = [
  "theme-1",
  "theme-2",
  "theme-3",
  "theme-4",
  "theme-5",
  "theme-6",
]

function useConfig() {

  const defaultTheme = VALID_THEMES[0];
  const storedTheme = localStorage.getItem("user-theme");
  const initialTheme = storedTheme === null ? defaultTheme : storedTheme;

  const [theme, setTheme] = useState(initialTheme);

  const changeTheme = (newTheme) => {
    if(VALID_THEMES.includes(newTheme)) {
      setTheme(newTheme);
      localStorage.setItem("user-theme", newTheme);
    } else {
      throw new Error("The theme '" + newTheme + "' does not exist.");
    }
  }

  const clearTheme = () => {
    localStorage.removeItem("user-theme");
    setTheme(defaultTheme);
  }

  const config = {
    theme: theme,
    setTheme: changeTheme,
    clearTheme: clearTheme,
    VALID_THEMES: VALID_THEMES
  }

  return config

}

export default useConfig;