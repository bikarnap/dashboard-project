import React, { useEffect, useState } from 'react';
import Card from '../Card';
import zabbixService from '../../services/zabbix';

const TotalHosts = () => {
  const [totalHosts, setTotalHosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTotalHosts = async () => {
      try {
        const total = await zabbixService.getHosts();
        setTotalHosts(total);
      } catch (err) {
        setError('Failed to load total hosts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTotalHosts();
  }, []);

  if (error) return <div>{error}</div>;

  return (
   <Card label="Total hosts being monitored" sublabel={totalHosts.length} loading={loading}/>
  );
};

export default TotalHosts;
