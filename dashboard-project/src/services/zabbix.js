import axios from 'axios';
import pLimit from 'p-limit';

const zabbixAPIUrl = 'add the jenkins server address here/api_jsonrpc.php'
const authToken = 'add authentication token here'
let cachedTotalBuilds = null;
let lastFetchTime = null;

const CACHE_DURATION = 5 * 60 * 1000; // Cache duration in milliseconds (e.g., 5 minutes)
//limiting the number of concurrent requests using a concurrency control library p-limit
const limit = pLimit(5);

const zabbixService = {
  // Get problems
  getProblems: async () => {
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
    try {
      const response = await axios.post(zabbixAPIUrl, payload);
      return response.data.result || [];
    } catch (error) {
      console.log('Error fetching problems', error);
      throw error;
    }
  },

  getHosts: async () => {
    const payload = {
      jsonrpc: '2.0',
      method: 'host.get',
      "params": {
        "output": "extend",
        "sortfield": "host",
      },
      auth: authToken,
      id: 5,
    };
    try {
      const response = await axios.post(zabbixAPIUrl, payload);

      if (response && response.data && response.data.result) {
        return response.data.result;
      } else {
        console.error('Invalid response format:', response);
        return [];
      }
      // return response.data.result || [];
    } catch (error) {
      console.log('Error fetching hosts', error);
      throw error;
    }
    
  }
}

export default zabbixService;