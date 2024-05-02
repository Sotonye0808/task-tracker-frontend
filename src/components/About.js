// src/pages/About.js
import React from 'react';

const About = () => {
  return (
    <div>
      <br />
        <h3>Track Your Tasks</h3> 
        <p>This is a simple task tracker app built using React. It allows users to track their tasks by adding and deleting them and also tracking their usage statistics.</p>
        <hr />
        <h4>Features</h4>
        <ul>
          <li>Add new tasks: Users can add tasks by entering a task name and optionally specifying a day and time.</li>
            <li>Delete tasks: Users can remove tasks from the list.</li>
            <li>Toggle reminder: Users can toggle a reminder for a task, which will display their tasks boldly so they won't forget.
          </li>
          <li>Usage statistics: The app tracks the number of tasks added and removed by the user on a daily, weekly, and monthly basis.</li>
          <li>Responsive design: The app is responsive and works well on both desktop and mobile devices.</li>
          <li>Persistent data: Task data is stored uniquely for each user, so tasks persist even after refreshing the page.</li>
        </ul>
        <hr />
        <h4>Tasks That involve tracking time?</h4>
        <p>Is your task a study session and you may need breaks? Or are you cooking something that may take a while?</p>
        <p>Well, I built this <a href="https://sotonye0808.github.io/js-clock">25+5 Clock</a> just for that! (not exactly just for that but it helps)</p>
        <p>Check it out!</p>
        <hr />
        <h4>Author</h4>
        <p>Hi, I'm Sotonye Dagogo, a fullstack developer who loves building web applications.</p>
        <p>Check out my <a href="https://github.com/Sotonye0808">github</a> for more projects.</p>
        <hr />
        <br /><p>Version <strong>2.0.1</strong></p>
    </div>
  );
};

export default About;
