import React, { useEffect, useState } from 'react';
import Card from '../Card';
import zabbixService from '../../services/zabbix';

const TotalProblems = () => {
  const [totalProblems, setTotalProblems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTotalHosts = async () => {
      try {
        const total = await zabbixService.getProblems();
        setTotalProblems(total);
      } catch (err) {
        setError('Failed to load problems');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTotalHosts();
  }, []);

  if (error) return <div>{error}</div>;

  return (
   <Card label="Total Problems" sublabel={totalProblems.length} loading={loading}/>
  );
};

export default TotalProblems;
