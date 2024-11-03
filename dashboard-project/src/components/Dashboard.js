import Row from "./Row";
import TotalBuilds from "./jenkins/TotalBuilds"
import TotalJobs from "./jenkins/TotalJobs";
import TotalNodes from "./jenkins/TotalNodes";
import TotalPlugins from "./jenkins/TotalPlugins";
import TotalViews from "./jenkins/TotalView";
import TotalHosts from "./zabbix/TotalHosts";
import TotalProblems from "./zabbix/TotalProblems";
import TotalPools from "./xen/TotalPools";
import TotalVMs from "./xen/TotalVMs";
import BuildSummary from "./jenkins/BuildSummary";
import "./ChartCard.css";
import VMSummary from "./xen/VMSummary";
import ProblemsChart from "./zabbix/ProblemsChart";

const Dashboard = () => {
  return (
    <div>
      <div>
        <Row>
          <TotalJobs />
          <TotalBuilds />
          <TotalProblems />
        </Row>
        <Row>
          <TotalNodes />
          <TotalPlugins />
          <TotalViews />
        </Row>
      </div>

      <Row>
        <TotalPools />
        <TotalHosts />
        <TotalVMs />
      </Row>
      
      <div className="chart-wrapper">
        <VMSummary />
        <ProblemsChart />
        <BuildSummary />
      </div>
    </div>
  );
};

export default Dashboard;
