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
  const [tasksRemoved, setTasksRemoved] = useState(0);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.className = `${theme}-mode`;
    document.getElementById('root').className = `${theme}-mode`;
  }, [theme]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks');
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
      const response = await fetch('http://localhost:5000/tasks', {
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
      const responseStats = await fetch('http://localhost:5000/updateUserStats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'add' }),
      });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleRemoveTask = async (taskToRemove) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskToRemove._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove task');
      }
      setTasks(tasks.filter((task) => task._id !== taskToRemove._id));
      setTasksRemoved(tasksRemoved + 1);
      //wish to make request to update user stats
      const responseStats = await fetch('http://localhost:5000/updateUserStats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'remove' }),
      });
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Router>
      <Container className={`mt-4 ${theme}-mode`}>
        <Row>
          <Col className='col-8'>
            <h1>TASK TRACKER</h1>
            <br />
            <Routes>
              <Route exact path="/" element={<TaskList tasks={tasks} onRemove={handleRemoveTask} />} />
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
  );
}

export default App;
