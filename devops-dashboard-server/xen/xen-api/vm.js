const { callMethod } = require('./authentication');

const getIsATemplate = async (host, vmRef) => {
  const isATemplate = await callMethod(host, 'VM.get_is_a_template', [vmRef]);
  return isATemplate.Value;
};

const getIsDefaultTemplate = async (host, vmRef) => {
  const isDefaultTemplate = await callMethod(host, 'VM.get_is_default_template', [vmRef]);
  return isDefaultTemplate.Value;
};

const getIsASnapshot = async (host, vmRef) => {
  const isASnapshot = await callMethod(host, 'VM.get_is_a_snapshot', [vmRef]);
  return isASnapshot.Value;
};

const getIsVmssSnapshot = async (host, vmRef) => {
  const isVmssSnapshot = await callMethod(host, 'VM.get_is_vnss_snapshot', [vmRef]);
  return isVmssSnapshot.Value;
};

const getIsSnapshotFromVmpp = async (host, vmRef) => {
  const isSnapshotFromVmpp = await callMethod(host, 'VM.get_is_snapshot_from_vmpp', [vmRef]);
  return isSnapshotFromVmpp.Value;
};

const getIsAControlDomain = async (host, vmRef) => {
  const isAControlDomain = await callMethod(host, 'VM.get_is_a_control_domain', [vmRef]);
  return isAControlDomain.Value;
};

// Get the metrics field reference of the given VM.
const getMetricsRef = async (host, vmRef) => {
  const metrics = await callMethod(host, 'VM.get_metrics', [vmRef]);
  return metrics.Value;
};


const getOrder = async (host, vmRef) => {
  const order = await callMethod(host, 'VM.get_order', [vmRef]);
  return order.Value;
};

const getParentRef = async (host, vmRef) => {
  const parentRef = await callMethod(host, 'VM.get_parent', [vmRef]);
  return parentRef.Value;
};

const getPlatform = async (host, vmRef) => {
  const platform = await callMethod(host, 'VM.get_platform', [vmRef]);
  return platform.Value;
};

const getPowerState = async (host, vmRef) => {
  const powerState = await callMethod(host, 'VM.get_power_state', [vmRef]);
  return powerState.Value;
};

const getOtherConfig = async (host, vmRef) => {
  const otherConfig = await callMethod(host, 'VM.get_other_config', [vmRef]);
  return otherConfig.Value;
};

// Returns a record describing the VM's dynamic state, initialised when the VM boots and updated to reflect runtime configuration changes e.g. CPU hotplug
const getBootRecord = async (host, vmRef) => {
  const bootRecord = await callMethod(host, 'VM.get_boot_record', [vmRef]);
  return bootRecord.Value;
};

const getChildren = async (host, vmRef) => {
  const children = await callMethod(host, 'VM.get_children', [vmRef]);
  return children.Value;
};

module.exports = {
  getIsATemplate,
  getIsDefaultTemplate,
  getIsASnapshot,
  getIsVmssSnapshot,
  getIsSnapshotFromVmpp,
  getIsAControlDomain,
  getMetricsRef,
  getOrder,
  getParentRef,
  getPlatform,
  getPowerState,
  getOtherConfig,
  getBootRecord,
  getChildren
};