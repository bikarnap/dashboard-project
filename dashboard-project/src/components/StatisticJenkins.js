import { useState, useEffect } from "react";

import jenkinsService from '../services/jenkins';
import Statistic from "./Statistic";

const StatisticsJenkins= () => {
  const [nodes, setNodes] = useState(0);
 
  useEffect(() => {
    jenkinsService.getTotalNodes()
      .then(response => {
        setNodes(response)
      })
  }, [])
 
  return (
    <table>   
      <thead></thead>
      <tbody>
        <Statistic 
          statisticName="Total nodes"
          value={nodes}
        />
      </tbody>   
    </table>
  );
};

export default StatisticsJenkins;