import React, { useEffect, useState } from 'react';
import jenkinsService from '../../services/jenkins';
import Card from '../Card';

const TotalNodes = () => {
  const [totalNodes, setTotalNodes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTotalNodes = async () => {
      try {
        const total = await jenkinsService.getTotalNodes();
        setTotalNodes(total);
      } catch (err) {
        setError('Failed to load total nodes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTotalNodes();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <Card 
        label="Total Jenkins Nodes"
        sublabel={totalNodes}
        loading={loading}
    />
  );
};

export default TotalNodes;
