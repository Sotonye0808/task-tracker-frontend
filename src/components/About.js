// src/pages/About.js
import React from 'react';

const About = () => {
  return (
    <div>
      <br />
        <h3>Track Your Tasks</h3> 
        
        <p>This is a very crude version of this application. Unusual behaviour may be observed and design is rather lazy. A much updated version is to be released soon!</p>

        
        <p>This is a simple task tracker app built using React. It allows users to track their tasks by adding, deleting, and marking tasks as complete.</p>
        
        <h4>Features</h4>
        <ul>
          <li>Add new tasks: Users can add tasks by entering a task name and optionally specifying a day and time.</li>
            <li>Delete tasks: Users can remove tasks from the list.</li>
            <li>Toggle reminder: Users can toggle a reminder for a task, which will display a reminder notification.
          </li>
          <li>Responsive design: The app is responsive and works well on both desktop and mobile devices.</li>
          <li>Local storage: Task data is stored locally in the browser, so tasks persist even after refreshing the page.</li>
          
        </ul>
        <h4>Usage</h4>
        <ol>
          <li>Clone the repository to your local machine or open this <a href="https://sotonye0808.github.io/task-tracker">Link</a> </li>
          <li>Navigate to the project directory in your terminal.</li>
          <li>Run npm install to install dependencies.</li>
          <li>Run npm start to start the development server.</li>
          <li>Open your browser and navigate to http://localhost:3000 to view the app.</li>
        </ol>
        
        <h4>Technologies Used</h4>
        <ul>
          <li>React</li>
          <li>JavaScript</li>
          <li>HTML/CSS</li>
        </ul>
        <hr />
        <br />
        
        <p>Copyright © 2024</p><p>Version 2.0.1</p>
    </div>
  );
};

export default About;
