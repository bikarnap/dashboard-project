const { callMethod } = require('./authentication');

// There should be a valid session for the following functions to Work.
// So, first of all there should be a login to the server first

const getAll = async (poolMaster, className) => {
  const method = className + '.get_all';
  const allRefs = await callMethod(poolMaster, method)
  return allRefs.Value;
};

// Requires reference
// For example if class is VM, we need to pass vm reference
const getRecord = async (poolMaster, className, reference) => {
  const method = className + '.get_record';
  const allRecords = await callMethod(poolMaster, method, [reference])
  return allRecords.Value;
};

const getAllRecords = async (poolMaster, className ) => {
  const method = className + '.get_all_records';
  const allRecords = await callMethod(poolMaster, method )
  return allRecords.Value;
};

const getByNameLabel = async (host, className, label) => {
  const method = className + '.get_by_name_label';
  const resultObj = await callMethod(host, method, [label]);
  return resultObj.Value;
};

const getByUuid = async (host, className, uuid) => {
  const method = className + '.get_by_uuid';
  const resultObj = await callMethod(host, method, [uuid]);
  return resultObj.Value;
};

const getNameLabel = async (host, className, vmRef) => {
  const method = className + '.get_name_label';
  const resultObj = await callMethod(host, method, [vmRef]);
  return resultObj.Value;
};

const getNameDescription = async (host, className, vmRef) => {
  const method = className + '.get_name_description';
  const resultObj = await callMethod(host, method, [vmRef]);
  return resultObj.Value;
};


module.exports = {
  getAll,
  getRecord,
  getAllRecords,
  getByNameLabel,
  getByUuid,
  getNameLabel,
  getNameDescription
};