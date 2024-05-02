// TaskForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [reminder, setReminder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || isSubmitting) return;

    setIsSubmitting(true);

    const newTask = {
      // Omit id here to let the server handle it
      title,
      description,
      date,
      reminder,
    };

    onSubmit(newTask);

    // Clear form fields after submission
    setTitle('');
    setDescription('');
    setDate('');
    setReminder(false);
    setIsSubmitting(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTaskTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter task title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formTaskDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formTaskDate">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formTaskReminder">
        <Form.Check type="checkbox" label="Set Reminder" checked={reminder} onChange={(e) => setReminder(e.target.checked)} />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding Task...' : 'Add Task'}
      </Button>
    </Form>
  );
};

export default TaskForm;
