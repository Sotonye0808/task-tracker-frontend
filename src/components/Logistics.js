// Logistics.js
import React, { useState, useEffect } from 'react';

const Logistics = () => {
  const [stats, setStats] = useState({
    daily: { tasksAdded: 0, tasksRemoved: 0 },
    weekly: { tasksAdded: 0, tasksRemoved: 0 },
    monthly: { tasksAdded: 0, tasksRemoved: 0 }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.11.196.111:5000/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Your Stats</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card bg-primary">
            <div className="card-body">
              <h3 className="card-title">Daily</h3>
              <p className="card-text">Tasks added: {stats.daily.tasksAdded}</p>
              <p className="card-text">Tasks removed: {stats.daily.tasksRemoved}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-secondary">
            <div className="card-body">
              <h3 className="card-title">Weekly</h3>
              <p className="card-text">Tasks added: {stats.weekly.tasksAdded}</p>
              <p className="card-text">Tasks removed: {stats.weekly.tasksRemoved}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-info">
            <div className="card-body">
              <h3 className="card-title">Monthly</h3>
              <p className="card-text">Tasks added: {stats.monthly.tasksAdded}</p>
              <p className="card-text">Tasks removed: {stats.monthly.tasksRemoved}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logistics;
