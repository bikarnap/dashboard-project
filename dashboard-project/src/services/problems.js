import axios from 'axios'

const zabbixAPIUrl = 'add the jenkins server address here/api_jsonrpc.php'
const authToken = 'add authentication token here'

const getProblems = async () => {
  const payload = {
    jsonrpc: '2.0',
    method: 'problem.get',
    "params": {
      "output": "extend",
      "sortfield": ["eventid"],
      "sortorder": "DESC",
      "recent": true,
    },
    auth: authToken,
    id: 1,
  };
  const response = await axios.post(zabbixAPIUrl, payload);
  return response.data.result;
}

const getTriggers = async (objectid) => {
  const payload = {
    "jsonrpc": "2.0",
    "method": "trigger.get",
    "params": {
      "output": "extend",
      "triggerids": objectid,
      "selectHosts": "extend"
    },
    "auth": authToken,
    "id": 2
  } 
  const response = await axios.post(zabbixAPIUrl, payload);
  return response.data.result[0];
}

const getHostInterface = async (hostid) => {
  const payload = {
    "jsonrpc": "2.0",
    "method": "hostinterface.get",
    "params": {
        "output": "extend",
        "hostids": hostid
    },
    "auth": authToken,
    "id": 3
  }
  const response = await axios.post(zabbixAPIUrl, payload);
  return response.data.result[0];
}

const getHostGroup = async (hostid) => {
  const payload = {
    "jsonrpc": "2.0",
    "method": "hostgroup.get",
    "params": {
        "output": "extend",
        "hostids": hostid
    },
    "auth": authToken,
    "id": 4
  }
  const response = await axios.post(zabbixAPIUrl, payload);
  return response.data.result[0];
}

const getTriggerDetails = async (problem) => {
  const trigger = await getTriggers(problem['objectid']);
  const hostInterface = await getHostInterface(trigger['hosts'][0]['hostid']);
  const hostGroup = await getHostGroup(trigger['hosts'][0]['hostid']);
  let enabled = 'Enabled';
  if (trigger['hosts'][0]['status'] === "1") {
    enabled = 'Disabled';
  }
  const details = {
    hostname: trigger['hosts'][0]['host'],
    ip: hostInterface['ip'],
    description: trigger['description'],
    status: enabled,
    groupname: hostGroup['name']
  }
  return details;
}

const getProblemDetails = async () => {
  const problems = await getProblems();
  const problemDetails = await Promise.all(
    problems.map(async problem => {
      const details = await getTriggerDetails(problem)
      return {...problem, ...details}
    })
  );
  // console.log('pdetails', problemDetails)
  return problemDetails;
}

const problemsService = {
  getProblems,
  getTriggers,
  getHostInterface,
  getHostGroup,
  getTriggerDetails,
  getProblemDetails
};

export default problemsService;