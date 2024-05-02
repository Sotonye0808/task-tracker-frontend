// TaskList.js
import React, { useState } from 'react';
import { ListGroup, Button, Modal } from 'react-bootstrap';

const TaskList = ({ tasks, onRemove }) => {
  const [showDetails, setShowDetails] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [taskToRemove, setTaskToRemove] = useState(null);

  const handleTaskClick = (index) => {
    setShowDetails(index === showDetails ? null : index);
  };

  const handleRemove = (task) => {
    setTaskToRemove(task);
    setShowConfirmation(true);
  };

  const confirmRemove = () => {
    onRemove(taskToRemove._id); // Pass the task ID to be removed to the parent component
    setShowConfirmation(false);
  };

  return (
    <div>
      <h2>Task List</h2>
      <ListGroup>
        {tasks.map((task, index) => (
          <ListGroup.Item
            className='task-item'
            key={task._id || index} // Use task._id as the key
            onClick={() => handleTaskClick(index)}
            style={{
              fontWeight: task.reminder ? 'bold' : 'normal',
              cursor: 'pointer',
              textTransform: task.reminder ? 'uppercase' : 'none',
            }}
          >
            {task.title}
            {showDetails === index && (
              <div>
                <p>Description: {task.description}</p>
                <p>Date & Time: {new Date(task.date).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}</p>
                <Button variant="danger" onClick={() => handleRemove(task)}>
                  Remove
                </Button>
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove the task "{taskToRemove && taskToRemove.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;
