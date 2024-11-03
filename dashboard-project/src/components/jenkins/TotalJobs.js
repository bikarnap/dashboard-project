import React, { useEffect, useState } from 'react';
import jenkinsService from '../../services/jenkins';
import Card from '../Card';

const TotalJobs = () => {
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTotalJobs = async () => {
      try {
        const jobs = await jenkinsService.getJobs();
        setTotalJobs(jobs.length);
      } catch (err) {
        setError('Failed to load total Jobs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTotalJobs();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <Card 
        label="Total Jenkins Jobs"
        sublabel={totalJobs}
        loading={loading}
    />
  );
};

export default TotalJobs;
