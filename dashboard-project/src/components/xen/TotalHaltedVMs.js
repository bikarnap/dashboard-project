import React, { useEffect, useState } from 'react';
import Card from '../Card';
import xenService from '../../services/xen';

const TotalHaltedVMs = () => {
  const [totalVMs, setTotalVMs] = useState(() => {
    const total = window.sessionStorage.getItem('totalHaltedVMs');
    return total !== null ? JSON.parse(total) : 0;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTotalVMs = async () => {
      let vms = 0;
      try {
          const total = await xenService.getHaltedVMs(pools[i].masterIP);
          vms += total.length;
        setTotalVMs(vms);
        window.sessionStorage.setItem('totalHaltedVMs', vms)
      } catch (err) {
        setError('Failed to load total VMs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTotalVMs();
  }, []);

  if (error) return <div>{error}</div>;

  return (
   <Card label="Total Halted VMs" sublabel={totalVMs} loading={loading}/>
  );
};

export default TotalHaltedVMs;
