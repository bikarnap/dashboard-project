import axios from 'axios';

const convertTimestampToTimeString = (timestamp, isInMilliSeconds=false) => {
  if (isInMilliSeconds)
    return (new Date(timestamp)).toLocaleString();
  else 
    return (new Date(timestamp * 1000)).toLocaleString();
};

const parseTime = (timeInMilliSeconds) => {
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let millis = 0;
  if (timeInMilliSeconds >= 1000) {
    seconds = Math.floor(timeInMilliSeconds / 1000);
    millis = timeInMilliSeconds % 1000;
  } 
  if (seconds >= 60) {
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
  } 
  if (minutes >= 60) {
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
  } 
  if (hours >= 24) {
    days = Math.floor(hours / 24);
    hours = hours % 24;
  }
  return `${days}d:${hours}h:${minutes}m:${seconds}s:${millis}ms`
}

const getBuildsLengthByStatus = (job) => {
  const succeededBuildsLength = (job.builds.filter(build => build.result === 'SUCCESS')).length;
  const failedBuildsLength = (job.builds.filter(build => build.result === 'FAILURE')).length;
  return {
    succeededBuildsLength,
    failedBuildsLength
  }
};

const getAllJobsLengthByStatus = (jobs) => {
  const lengths = jobs.map(job => getBuildsLengthByStatus(job))
  return lengths.reduce((acc, cur) => {
    acc.succeededBuildsLength += cur.succeededBuildsLength;
    acc.failedBuildsLength += cur.failedBuildsLength;
    return acc;
  }, { succeededBuildsLength: 0, failedBuildsLength: 0 });
 
};

const getJobNameFromBuildUrl = (url) => {
// const jobName = url.split("/")[4];
// console.log(jobName); // "fetch_code"
return url.split("/")[4];
};




const getProblems = async () => {
  const response = await axios.post('http://<zabbix_server>/api_jsonrpc.php', {
    jsonrpc: '2.0',
    method: 'problem.get',
    params: {
      output: ['eventid', 'objectid', 'name', 'severity', 'clock', 'opdata'],
      selectAcknowledges: 'extend',
      sortfield: 'eventid',
      sortorder: 'DESC',
      // limit: 100,
    },
    auth: '<auth_token>',
    id: 1,
  });
  return response.data.result;
  
};



const getHostsByTriggerIds = async () => {
  const problems = await getProblems()
  console.log('prob from utilities', problems)
  await problems.map(async problem => {
    const trigger = await axios.post('http://<zabbix_url>/api_jsonrpc.php', {
      jsonrpc: '2.0',
      method: 'trigger.get',
      params: {
        output: 'extend',
        triggerids: problem['objectid'],
        // filter: { triggerid: triggerIds },
        selectHosts: 'extend',
        // limit: 100,
      },
      auth: '<auth_token>',
      id: 1,
    });
    const interface_ = await axios.post('http://<zabbix_url>/api_jsonrpc.php', {
      jsonrpc: '2.0',
      method: 'hostinterface.get',
      params: {
        output: 'extend',
        hostids: await trigger[0]['hosts'][0]['hostid'],
        // filter: { triggerid: triggerIds },
        // selectHosts: ['host'],
        // limit: 100,
      },
      auth: '<auth_token>',
      id: 1,
    });
    const group = await axios.post('http://<zabbix_url>/api_jsonrpc.php', {
      jsonrpc: '2.0',
      method: 'hostgroup.get',
      params: {
        // output: 'extend',
        hostids: await trigger[0]['hosts'][0]['hostid'],
        // filter: { triggerid: triggerIds },
        // selectHosts: ['host'],
        // limit: 100,
      },
      auth: '<auth_token>',
      id: 1,
    });

    let enabled = "Enabled"
    if (trigger[0]['hosts'][0]['status'] === "1")
      enabled = "Disabled"
    console.log(group[1]['name'],
    trigger[0]['hosts'][0]['host'],
    interface_[0]['ip'],
    trigger[0]['description'],
    enabled)
  })
 
};


const getHostsByObjectIds = async (objectIds) => {
  const response = await axios.post('http://<zabbix_url>/api_jsonrpc.php', {
    jsonrpc: '2.0',
    method: 'host.get',
    params: {
      output: ['hostid', 'name'],
      filter: { hostid: objectIds },
      limit: 100,
    },
    auth: '<auth_token>',
    id: 1,
  });
  return response.data.result;
};

const getAllBuildFromAllJobs = (jobs) => {
  const allBuilds = [];

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const builds = job.builds;
    for (let j = 0; j < builds.length; j++) {
      const build = builds[j];
      allBuilds.push(build);
    }
  }

  return allBuilds;
}

const zabbixSeverityMappings = {
  "0": "Not classified",
  "1": "Information",
  "2": "Warning",
  "3": "Average",
  "4": "High",
  "5": "Disaster"
}

const utilities = {
  convertTimestampToTimeString,
  getAllJobsLengthByStatus,
  getJobNameFromBuildUrl,
  getProblems,
  getHostsByTriggerIds, 
  getHostsByObjectIds,
  getAllBuildFromAllJobs,
  parseTime,
  zabbixSeverityMappings
};

export default utilities;