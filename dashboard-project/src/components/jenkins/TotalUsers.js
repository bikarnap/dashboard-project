import React, { useEffect, useState } from 'react';
import jenkinsService from '../../services/jenkins';
import Card from '../Card';

const TotalUsers = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTotalUsers = async () => {
      try {
        const total = await jenkinsService.getTotalUsers();
        setTotalUsers(total);
      } catch (err) {
        setError('Failed to load total users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTotalUsers();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <Card 
        label="Total Jenkins users"
        sublabel={totalUsers}
        loading={loading}
    />
  );
};

export default TotalUsers;
