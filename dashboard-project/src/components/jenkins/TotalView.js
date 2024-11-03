import React, { useEffect, useState } from 'react';
import jenkinsService from '../../services/jenkins';
import Card from '../Card';

const TotalViews = () => {
  const [totalViews, setTotalViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTotalViews = async () => {
      try {
        const total = await jenkinsService.getTotalViews();
        setTotalViews(total);
      } catch (err) {
        setError('Failed to load total views');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTotalViews();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <Card 
        label="Total Jenkins Views"
        sublabel={totalViews}
        loading={loading}
    />
  );
};

export default TotalViews;
