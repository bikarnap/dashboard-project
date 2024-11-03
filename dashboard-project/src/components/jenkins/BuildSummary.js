// components/BuildSummary.js
import React, { useEffect, useState } from 'react';
import jenkinsService from '../../services/jenkins';
import ChartCard from '../ChartComponent';

const BuildSummary = () => {
  const [successCount, setSuccessCount] = useState(0);
  const [failureCount, setFailureCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuilds = async () => {
      setLoading(true);
      try {
        const builds = await jenkinsService.fetchAllBuilds();
        const success = builds.filter(build => build.result === 'SUCCESS').length;
        const failure = builds.filter(build => build.result === 'FAILURE').length;
        setSuccessCount(success);
        setFailureCount(failure);
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
    labels: ['Successful', 'Failed'],
    datasets: [
      {
        label: '# of Builds',
        // data: [severities.not_classified, severities.information, severities.warning, severities.average, severities.high, severities.disaster],
        data: [successCount, failureCount],
        backgroundColor: [
          '#7499ff', // Green
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
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* <h3>Build Summary for </h3>
      <p>Successful Builds: {successCount}</p>
      <p>Failed Builds: {failureCount}</p> */}
      <ChartCard
        type="pie"
        title="Jenkins Builds: Success Vs Failure"
        data={pieChartData}
      />
    </div>
  );
};

export default BuildSummary;
