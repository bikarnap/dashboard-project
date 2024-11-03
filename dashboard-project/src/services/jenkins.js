import axios from 'axios';
import pLimit from 'p-limit';


const JENKINS_BASE_URL = "add the jenkins base url";
const JENKINS_USERNAME = 'add jenkins user';
const JENKINS_API_TOKEN = 'add api token for the user'

const options = {
  auth: {
    username: JENKINS_USERNAME,
    password: JENKINS_API_TOKEN,
  }
}

let cachedTotalBuilds = null;
let lastFetchTime = null;

const CACHE_DURATION = 5 * 60 * 1000; // Cache duration in milliseconds (e.g., 5 minutes)
//limiting the number of concurrent requests using a concurrency control library p-limit
const limit = pLimit(5);

const jenkinsService = {
  // Get all jobs
  getJobs: async () => {
    try {
      const response = await axios.get(`${JENKINS_BASE_URL}/api/json?tree=jobs[name]`, options);
      return response.data.jobs || [];
    } catch (error) {
      console.log('Error fetching jobs', error);
      throw error;
    }
  },

  // Get builds for a job
  getBuilds: async (jobName) => {
    try {
      const response = await axios.get(`${JENKINS_BASE_URL}/job/${jobName}/api/json?tree=builds[number,status,result, duration,timestamp,url]`, options);
      return (response.data.builds || []).map(build => ({ ...build, jobName }));
    } catch (error) {
      console.log(`Error fetching builds for job ${jobName}`, error);
      return [];
    }
  }, 

  getTotalBuilds: async () => {
    const currentTime = Date.now();

    // Use cached data if it's still valid
    if (cachedTotalBuilds && lastFetchTime && (currentTime - lastFetchTime) < CACHE_DURATION) {
      return cachedTotalBuilds;
    }
    try {
      const jobs = await jenkinsService.getJobs();
      if (!jobs || !Array.isArray(jobs)) {
        throw new Error('Failed to retrieve jobs');
      }

      const buildPromises = jobs.map(job => limit(() => jenkinsService.getBuilds(job.name)));
      const buildsArray = await Promise.all(buildPromises);
      const totalBuilds = buildsArray.reduce((total, builds) => {
        if (Array.isArray(builds)) {
          return total + builds.length;
        } else {
          console.warn('Unexpected value encountered:', builds);
          return total; // Skip this entry
        }
      }, 0);

      return totalBuilds;
    } catch (error) {
      console.error('Error fetching total builds:', error);
      throw error;
    }
  },

  getLatestBuild: async (jobName) => {
    try {
      const response = await axios.get(`${JENKINS_BASE_URL}/job/${jobName}/api/json?tree=builds[number,status,result]{0,1}`, options);
      const builds = response.data.builds || [];
      return builds.length > 0 ? builds[0] : null; // Return the latest build if available
    } catch (error) {
      console.error(`Error fetching latest build for job ${jobName}:`, error);
      return null; // Return null if there's an error
    }
  },

  // Fetch the latest builds for all jobs
  getLatestBuilds: async () => {
    try {
      const jobs = await jenkinsService.getJobs();
      if (!Array.isArray(jobs)) {
        throw new Error('Failed to retrieve jobs');
      }

      // Create an array of promises for fetching the latest build of each job
      const latestBuildPromises = jobs.map(job => limit(() => jenkinsService.getLatestBuild(job.name)));

      // Wait for all promises to resolve
      const latestBuilds = await Promise.all(latestBuildPromises);

      // Filter out null values (jobs with no builds)
      return latestBuilds.filter(build => build !== null);
    } catch (error) {
      console.error('Error fetching latest builds:', error);
      throw error;
    }
  },

 fetchAllBuilds: async () => {
    try {
      const jobs = await jenkinsService.getJobs();
      const buildPromises = jobs.map((job) => jenkinsService.getBuilds(job.name));
      const builds = await Promise.all(buildPromises);
      // Flatten the array of arrays
      return builds.flat();
    } catch (error) {
      throw new Error('Failed to fetch builds');
    }
  },

  // Fetch build counts by status for all jobs
  getBuildCountsByStatus: async () => {
    try {
      const jobs = await jenkinsService.getJobs();
      if (!Array.isArray(jobs)) {
        throw new Error('Failed to retrieve jobs');
      }

      const buildStatusCounts = {
        SUCCESS: 0,
        FAILURE: 0,
        UNSTABLE: 0,
        ABORTED: 0,
        NOT_BUILT: 0,
        UNKNOWN: 0,
      };

      // Fetch builds for each job and aggregate their statuses
      await Promise.all(jobs.map(job =>
        limit(async () => {
          const builds = await jenkinsService.getBuilds(job.name);
          if (Array.isArray(builds)) {
            builds.forEach(build => {
              const status = build.result || 'UNKNOWN';
              if (buildStatusCounts.hasOwnProperty(status)) {
                buildStatusCounts[status] += 1;
              } else {
                buildStatusCounts.UNKNOWN += 1;
              }
            });
          }
        })
      ));

      return buildStatusCounts;
    } catch (error) {
      console.error('Error fetching build counts by status:', error);
      throw error;
    }
  },

  getNodes: async () => {
    try {
      const response = await axios.get(`${JENKINS_BASE_URL}/computer/api/json`, options);
      return response.data.computer || []; // Ensure nodes is always an array
    } catch (error) {
      console.error('Error fetching nodes:', error);
      throw error;
    }
  },

  // Fetch total number of nodes
  getTotalNodes: async () => {
    // await jenkinsService.getNodes()
    //   .then(nodes => nodes.computer.length)
    try {
      const nodes = await jenkinsService.getNodes();
      return nodes.length; // Return the count of nodes
    } catch (error) {
      console.error('Error fetching total nodes:', error);
      throw error;
    }
  },

  // Fetch all users
  getUsers: async () => {
    try {
      const response = await axios.get(`${JENKINS_BASE_URL}/asynchPeople/api/json?tree=users[user[id,fullName]]`, options);
      return response.data.users || []; // Ensure users is always an array
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Fetch total number of users
  getTotalUsers: async () => {
    try {
      const users = await jenkinsService.getUsers();
      return users.length; // Return the count of users
    } catch (error) {
      console.error('Error fetching total users:', error);
      throw error;
    }
  },

  // Fetch all plugins
  getPlugins: async () => {
    try {
      const response = await axios.get(`${JENKINS_BASE_URL}/pluginManager/api/json?depth=1`, options);
      return response.data.plugins || []; // Ensure plugins is always an array
    } catch (error) {
      console.error('Error fetching plugins:', error);
      throw error;
    }
  },

  // Fetch total number of plugins
  getTotalPlugins: async () => {
    try {
      const plugins = await jenkinsService.getPlugins();
      return plugins.length; // Return the count of plugins
    } catch (error) {
      console.error('Error fetching total plugins:', error);
      throw error;
    }
  },

   // Fetch all views
   getViews: async () => {
    try {
      const response = await axios.get(`${JENKINS_BASE_URL}/api/json?tree=views[name]`, options);
      return response.data.views || []; // Ensure views is always an array
    } catch (error) {
      console.error('Error fetching views:', error);
      throw error;
    }
  },

  // Fetch total number of views
  getTotalViews: async () => {
    try {
      const views = await jenkinsService.getViews();
      return views.length; // Return the count of views
    } catch (error) {
      console.error('Error fetching total views:', error);
      throw error;
    }
  }
}

export default jenkinsService;