const { callMethod } = require('./authentication');

const getAddress = async (host, hostRef) => {
  const address = await callMethod(host, 'host.get_address', [hostRef]);
  return address.Value;
};

const getHostName = async (host, hostRef) => {
  const hostName = await callMethod(host, 'host.get_hostname', [hostRef]);
  return hostName.Value;
};

// Returns a list of resident VMs in the server with the given hostRef
const getResidentVMs = async (host, hostRef) => {
  const residentVMs = await callMethod(host, 'host.get_resident_VMs', [hostRef]);
  return residentVMs.Value;
};

// TODO
const addTags = async () => {};

// TODO
const addToGuestVCPUsParams = async () => {};

// TODO
const addToLicenseServer = async () => {};

// TODO
const addToLogging = async () => {};

// TODO
const addToOtherConfig = async () => {};

// TODO
const applyEdition = async () => {};

// TODO
const applyRecommendedGuidance = async () => {};

// TODO
const applyUpdates = async () => {};

// TODO
const assertCanEvacuate = async () => {};

// TODO
const backupRrds = async () => {};

// TODO
const bugReportUpload = async () => {};

// TODO
const callExtension = async () => {};

// TODO
const callPlugin = async () => {};

// TODO
const computeFreeMemory = async () => {};

module.exports = {
  getAddress,
  getHostName,
  getResidentVMs
};
