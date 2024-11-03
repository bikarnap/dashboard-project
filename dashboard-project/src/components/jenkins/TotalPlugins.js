import React, { useEffect, useState } from 'react';
import jenkinsService from '../../services/jenkins';
import Card from '../Card';

const TotalPlugins = () => {
  const [totalPlugins, setTotalPlugins] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTotalPlugins = async () => {
      try {
        const total = await jenkinsService.getTotalPlugins();
        setTotalPlugins(total);
      } catch (err) {
        setError('Failed to load total plugins');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTotalPlugins();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <Card label="Total Jenkins Plugins"
        sublabel={totalPlugins}
        loading={loading}
    />
  );
};

export default TotalPlugins;
