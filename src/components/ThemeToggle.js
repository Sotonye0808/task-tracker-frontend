//ThemeToggle.js
import React from 'react';

const ThemeToggle = ({ toggleTheme }) => {
    return (
            <label>
                <input type="checkbox" className='form-check-input' onChange={toggleTheme} />
                Toggle Theme
            </label>
    );
};

export default ThemeToggle;
