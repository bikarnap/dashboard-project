import Row from "./Row";
import TotalVMs from "./xen/TotalVMs";
import TotalRunningVMs from "./xen/TotalRunningVMs";
import TotalHaltedVMs from "./xen/TotalHaltedVMs";
import VmTable from "./xen/VMTable";

const XenDashboard = () => {
 

  return (
    <div>
      <Row>
        <TotalVMs />
        <TotalRunningVMs />
        <TotalHaltedVMs />
      </Row> 
      <VmTable />
    </div>
  );
};

export default XenDashboard;