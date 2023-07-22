// ThemeSwitch.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label className="btn ts-container" type="checkbox">
      <input checked={theme === 'dark'} onChange={toggleTheme} type="checkbox" />
      <span className="slider"></span>
      {/* Display the current theme */}
      {/* {theme === 'dark' ? 'Dark Mode' : 'Light Mode'} */}
    </label>
  );
};

export default ThemeSwitch;
