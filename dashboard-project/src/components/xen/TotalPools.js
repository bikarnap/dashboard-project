import React, { useEffect, useState } from 'react';
import Card from '../Card';
import xenService from '../../services/xen';

const TotalPools = () => {
  const [totalPools, setTotalPools] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTotalPools = async () => {
      try {
        const total = await xenService.getPools();
        setTotalPools(total);
      } catch (err) {
        setError('Failed to load total pools');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTotalPools();
  }, []);

  if (error) return <div>{error}</div>;

  return (
   <Card label="Total xen pools" sublabel={totalPools.length} loading={loading}/>
  );
};

export default TotalPools;
