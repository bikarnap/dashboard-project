import React, { useEffect, useState } from 'react';
import jenkinsService from '../../services/jenkins';
import Card from '../Card';

const TotalBuilds = () => {
  const [totalBuilds, setTotalBuilds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTotalBuilds = async () => {
      try {
        const total = await jenkinsService.getTotalBuilds();
        setTotalBuilds(total);
      } catch (err) {
        setError('Failed to load total builds');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTotalBuilds();
  }, []);

  if (error) return <div>{error}</div>;

  return (
   <Card label="Total builds in Jenkins" sublabel={totalBuilds} loading={loading}/>
  );
};

export default TotalBuilds;
