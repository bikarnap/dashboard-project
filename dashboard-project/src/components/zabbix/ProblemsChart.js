import React, { useEffect, useState } from 'react';
import Card from '../Card';
import zabbixService from '../../services/zabbix';
import ChartCard from '../ChartComponent';

const ProblemsChart = () => {
  const [problems, setProblems] = useState([]);
  const [problemsCount, setProblemsCount] = useState({
    information: 0,
    warning: 0,
    average: 0,
    high: 0,
    disaster: 0,
    not_classified: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTotalHosts = async () => {
      try {
        const problems = await zabbixService.getProblems();
        setProblems(problems);
       
      } catch (err) {
        setError('Failed to load problems');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTotalHosts();
  }, []);

  useEffect(() => {
    const severityCounts = {
      information: 0,
      warning: 0,
      average: 0,
      high: 0,
      disaster: 0,
      not_classified: 0,
    };
  
    problems.forEach((problem) => {
      switch (problem.severity) {
        case '1':
          severityCounts.information += 1;
          break;
        case '2':
          severityCounts.warning += 1;
          break;
        case '3':
          severityCounts.average += 1;
          break;
        case '4':
          severityCounts.high += 1;
          break;
        case '5':
          severityCounts.disaster += 1;
          break;
        default:
          severityCounts.not_classified += 1;
          break;
      }
    });
  
    setProblemsCount(severityCounts); // Update state with the final count
  }, [problems]); 

  const pieChartData = {
    labels: ['information', 'warning', 'average', 'high', 'disaster', 'not classified'],
    datasets: [
      {
        label: '# of problems',
        // data: [severities.not_classified, severities.information, severities.warning, severities.average, severities.high, severities.disaster],
        data: [problemsCount.information
            , problemsCount.warning
            , problemsCount.average
            , problemsCount.high
            , problemsCount.disaster
            , problemsCount.not_classified],
        backgroundColor: [
          '#7499ff',
          '#ffc859', 
          '#ffa059',
          '#e97659',
          '#e45959',
          '#97aab3'
        ],
        borderWidth: 1,
      },
    ],
  };
  console.log(problemsCount)
  if (error) return <div>{error}</div>;

  return (
   <ChartCard 
    type="bar"
    data={pieChartData}
    title="Problems by Severity"
   />
  );
};

export default ProblemsChart;
