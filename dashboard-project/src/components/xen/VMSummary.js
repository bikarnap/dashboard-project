// components/VMSummary.js
import React, { useEffect, useState } from 'react';
import xenService from '../../services/xen';
import ChartCard from '../ChartComponent';
import SkeletonCard from '../SkeletonCard';
import '../SkeletonCard.css'
import SkeletonPieChart from '../SkeletonPieChart';

const VMSummary = () => {
  const [haltedVMs, setHaltedVMs] = useState(0);
  const [runningVMs, setRunningVMs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuilds = async () => {
      setLoading(true);
      try {
        const offVMs = await xenService.getHaltedVMs('<xenserver_IP>');
        const onVMs = await xenService.getRunningVMs('<xenserver_IP>');
        setHaltedVMs(offVMs.length);
        setRunningVMs(onVMs.length);
      } catch (err) {
        setError('Failed to load build data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, []);

  const pieChartData = {
    labels: ['Running', 'Halted'],
    datasets: [
      {
        label: '# of VMs',
        // data: [severities.not_classified, severities.information, severities.warning, severities.average, severities.high, severities.disaster],
        data: [runningVMs, haltedVMs],
        backgroundColor: [
          '#39684b', // Green
          '#97aab3', // Red
        ],
        // borderColor: [
        //     '#C0392B', // Slightly darker red for the border
        //     '#229954', // Slightly darker green for the border
        //     '#D68910', // Slightly darker orange for the border
        // ],
        borderWidth: 1,
      },
    ],
  };
  

  if (loading) return <div className='chart-wrapper'><SkeletonPieChart /></div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* <h3>Build Summary for </h3>
      <p>Successful Builds: {successCount}</p>
      <p>Failed Builds: {failureCount}</p> */}
      <ChartCard
        type="pie"
        title="Xen VMs: Running Vs. Halted"
        data={pieChartData}
      />
    </div>
  );
};

export default VMSummary;
