import React, { useEffect, useState } from 'react';
import Card from '../Card';
import xenService from '../../services/xen';

const TotalRunningVMs = () => {
  const [totalVMs, setTotalVMs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTotalVMs = async () => {
      let vms = 0;
      try {
        const pools = await xenService.getPools();
        for (let i = 0; i < pools.length; i++) {
          const total = await xenService.getRunningVMs(pools[i].masterIP);
          vms += total.length;         
          
        }
        setTotalVMs(vms);
        // window.sessionStorage.setItem('totalRunningVMs')
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
   <Card label="Total Running VMs" sublabel={totalVMs} loading={loading}/>
  );
};

export default TotalRunningVMs;
