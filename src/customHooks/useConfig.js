import { useState } from 'react';

function useConfig() {

  const [theme, setTheme] = useState("theme-1");

  const config = {
    theme: theme,
    setTheme: setTheme
  }

  return config

}

export default useConfig;