// App.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import About from './components/About';
import Logistics from './components/Logistics';
import ThemeToggle from './components/ThemeToggle';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [tasksAdded, setTasksAdded] = useState(0);
  const [tasksRemoved, setTasksRemoved] = useState(0);const [theme, setTheme] = useState('light');

  //code to call updateUserStats.js to update user stats based on the action "reset"
  useEffect(() => {
    const updateUserStats = async () => {
      try {
        const response = await fetch('http://10.11.196.111:5000/updateUserStats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'reset' }),
        });
        if (!response.ok) {
          throw new Error('Could not reset user stats');
        }
        // Fetch updated tasks
        fetchTasks();
      } catch (error) {
        console.error('Error resetting user stats:', error);
      }
    };
  
    updateUserStats(); // Call the function immediately
  
  }, []); // Empty dependency array to run the effect only once
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = `${theme}-mode`;
    document.getElementById('root').className = `${theme}-mode`;
  }, [theme]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://10.11.196.111:5000/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch('http://10.11.196.111:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      const data = await response.json();
      setTasks([...tasks, data]);
      setTasksAdded(tasksAdded + 1);
      //wish to make request to update user stats
      const responseStats = await fetch('http://10.11.196.111:5000/updateUserStats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'add' }),
      });

      if (!responseStats.ok) {
        throw new Error('Failed to update user stats');
      }
      //fetch updated tasks
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleRemoveTask = async (taskId) => {
    try {
      const response = await fetch(`http://10.11.196.111:5000/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove task');
      }
      setTasks(tasks.filter((task) => task._id !== taskId));
      setTasksRemoved(tasksRemoved + 1);
      //wish to make request to update user stats
      const responseStats = await fetch('http://10.11.196.111:5000/updateUserStats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'remove' }),
      });

      if (!responseStats.ok) {
        throw new Error('Failed to update user stats');
      }
      //fetch updated tasks
      fetchTasks();
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div >
      <Router>
        <Container className={`mt-4 ${theme}-mode`}>
          <Row>
            <Col className='col-8'>
              <h1>TASK TRACKER</h1>
              <br />
              <Routes>
                <Route  path="/task-tracker-app" element={<TaskList tasks={tasks} onRemove={handleRemoveTask} />} />
                <Route  path="/task-tracker-frontend" element={<TaskList tasks={tasks} onRemove={handleRemoveTask} />} />
                <Route  path="/" element={<TaskList tasks={tasks} onRemove={handleRemoveTask}  />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/stats"
                  element={<Logistics tasksAdded={tasksAdded} tasksRemoved={tasksRemoved} />}
                />
                <Route path="/task-form" element={<TaskForm onSubmit={handleAddTask} />} />
              </Routes>
            </Col>
            <Col>
              <nav className='navbar'>
                <ul>
                  <li>
                    <Link to="/">Tasks</Link>
                  </li>
                  <li>
                    <Link to="/task-form">Add Task</Link>
                  </li>
                  <li>
                    <Link to="/stats">Stats</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <ThemeToggle toggleTheme={toggleTheme} />
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
          <Button className='fixed' variant="info" onClick={handleGoBack}>
            Go Back
            </Button>
        </Container>
      </Router>
      <div className='footer'>
            <p>Task Tracker &copy; {new Date().getFullYear()}
            <br />
            Version <strong>2.0.1</strong></p>
            
      </div>
    </div>
  );
}

export default App;
