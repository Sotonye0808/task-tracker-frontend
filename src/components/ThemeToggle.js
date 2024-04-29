import React from 'react';

const ThemeToggle = ({ toggleTheme }) => {
    return (
        <div>
            <label>
                <input type="checkbox" className='form-check-input' onChange={toggleTheme} />
                Toggle Theme
            </label>
        </div>
    );
};

export default ThemeToggle;
