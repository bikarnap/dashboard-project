import Row from "./Row";
import Card from './Card';
import DropDownSelect from "./DropDownSelect";
import Heading from "./Heading";
import PaginatedTable from "./PaginatedTable";
import { useEffect, useState } from "react";
import zabbixService from "../services/legacy/zabbix copy";
import utilities from "../utilities";
import ClearFilter from "./ClearFilter";

const ZabbixDashboard = ({ problems = [] }) => {
  const [totalHostCount, setTotalHostCount] = useState(0);
  const [xenserverCount, setXenserverCount] = useState(0);
  const [severityFilter, setSeverityFilter] = useState('');
  const [hostFilter, setHostFilter] = useState('');
  const [ipFilter, setIpFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');

  useEffect(() => {
    zabbixService.getHosts()
      .then(hosts => {
        const xenHosts = hosts.filter(host => host.host.toLowerCase().includes('xenserver')) || [];
        setXenserverCount(xenHosts.length);
        setTotalHostCount(hosts.length);
      })    
  }, [])

 
  const severities =  [
    {
      count: (problems.filter(problem => problem.severity === '5')).length,
      severity: 'disaster',
      className: 'zabbix-severity-disaster',
      id: 5
    },
    {
      count: (problems.filter(problem => problem.severity === '4')).length,
      severity: 'high',
      className: 'zabbix-severity-high',
      id: 4
    },
    {
      count: (problems.filter(problem => problem.severity === '3')).length,
      severity: 'warning',
      className: 'zabbix-severity-warning',
      id: 3
    },
    {
      count: (problems.filter(problem => problem.severity === '2')).length,
      severity: 'average',
      className: 'zabbix-severity-average',
      id: 2
    },
    {
      count: (problems.filter(problem => problem.severity === '1')).length,
      severity: 'information',
      className: 'zabbix-severity-information',
      id: 1
    },
    {
      count: (problems.filter(problem => problem.severity === '0')).length,
      severity: 'not classified',
      className: 'zabbix-severity-not-classified',
      id: 0
    },
  ]

  let problemsToShow = severityFilter && !severityFilter.toLowerCase().includes('severity')
    ? problems.filter(problem => utilities.zabbixSeverityMappings[problem.severity].toLowerCase() === severityFilter.toLowerCase())
    : problems
  
  problemsToShow = hostFilter && !hostFilter.toLowerCase().includes('host')
    ? zabbixService.filterProblems(problemsToShow, 'hostname', hostFilter)
    : problemsToShow
  
  problemsToShow = ipFilter && !ipFilter.toLowerCase().includes('ip')
    ? zabbixService.filterProblems(problemsToShow, 'ip', ipFilter)
    : problemsToShow

  problemsToShow = groupFilter && !groupFilter.toLowerCase().includes('group')
    ? zabbixService.filterProblems(problemsToShow, 'groupname', groupFilter)
    : problemsToShow
  

  const probHosts = problems.map(problem => problem.hostname)
  const groups = problems.map(problem => problem.groupname)

  const handleClearFilter = (e) => {
    setSeverityFilter('');
    setHostFilter('');
    setIpFilter('');
    setGroupFilter('')
  }
  return (
    <div>
      <Row>
        <Card 
          label="xenserver hosts"
          sublabel={xenserverCount}
        />
        <Card 
          label="total hosts"
          sublabel={totalHostCount}
        />
        <Card 
          label="total problems"
          sublabel={problems.length}
        />
      </Row>
      <Row>
        <Heading heading="h2" text="Problem by severity" />
      </Row>
      <Row>
        {severities.map(severity => (
           <Card 
              className={severity.className}
              key={severity.id}
              label={severity.severity}
              sublabel={severity.count}
            />
        ))}
      </Row>
      <Row>
        filters
      </Row>
      <Row>
        <DropDownSelect 
          filterName="Select severity"
          handleSelectOption={(e) => setSeverityFilter(e.target.value)}
          label={severityFilter}
          options={Object.keys(utilities.zabbixSeverityMappings).map(k => utilities.zabbixSeverityMappings[k])}
        />
        <DropDownSelect 
          filterName="Select host"
          handleSelectOption={(e) => setHostFilter(e.target.value)}
          label={hostFilter}
          options={zabbixService.getAllIHostnames(probHosts)}
        />
        <DropDownSelect 
          filterName="Select IP"
          handleSelectOption={(e) => setIpFilter(e.target.value)}
          label={ipFilter}
          options={zabbixService.getAllIps(problems)}
        />
        <DropDownSelect 
          filterName="Select group"
          handleSelectOption={(e) => setGroupFilter(e.target.value)}
          label={groupFilter}
          options={zabbixService.getUniqueValues(groups)}
        />
        <ClearFilter 
          handleClick={handleClearFilter}
        />
      </Row>
      <PaginatedTable data={problemsToShow} />    
    </div>
  );
};

export default ZabbixDashboard;