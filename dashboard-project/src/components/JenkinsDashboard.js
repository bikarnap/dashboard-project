import Row from "./Row";
import TotalBuilds from "./jenkins/TotalBuilds";
import TotalJobs from "./jenkins/TotalJobs";
import TotalNodes from "./jenkins/TotalNodes";
import JenkinsJobBuildsTable from "./JenkinsJobBuildsTable";

const JenkinsDashboard = () => {
  return (
    <div>
      <Row>
        <TotalBuilds />
        <TotalJobs />
        <TotalNodes />
      </Row>
      <JenkinsJobBuildsTable />
    </div>
  );
};

export default JenkinsDashboard;