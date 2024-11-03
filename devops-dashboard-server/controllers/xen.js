const xenRouter = require('express').Router();
const { login, logout } = require('../../devops-dashboard-server/xen/xen-api/authentication')
const { getAllRecords } = require('../../devops-dashboard-server/xen/xen-api/common');

xenRouter.get('/:host', (req, res) => {
  const { host } = req.params;

  const queries = req.query;

  if (Object.keys(queries).length > 0) {

  } else {
   login(host, 'root', '<xen_server_password>')
    .then(() => {
      getAllRecords(host, 'host')
        .then(hostRecords => res.json(hostRecords))
    })
  }

});

xenRouter.get('/:host/vms', async (req, res) => {
  const { host } = req.params;
  console.log(host)
  login(host, 'root', '<xen_server_password>')
  .then(() => {
    getAllRecords(host, 'VM' )
      .then(refs => {
        res.json(refs)
      })
  })

});

xenRouter.get('/:host/host_metrics', async (req, res) => {
  const { host } = req.params;
  console.log(host)
  login(host, 'root', '<xen_server_password>')
  .then(() => {
    getAllRecords(host, 'host_metrics' )
      .then(refs => {
        res.json(refs)
      })
  })

});

xenRouter.get('/:host/hostcpu', async (req, res) => {
  const { host } = req.params;
  console.log(host)
  login(host, 'root', '<xen_server_password>')
  .then(() => {
    getAllRecords(host, 'host_cpu' )
      .then(refs => {
        res.json(refs)
      })
  })

});

xenRouter.get('/:host/network', async (req, res) => {
  const { host } = req.params;
  console.log(host)
  login(host, 'root', '<xen_server_password>')
  .then(() => {
    getAllRecords(host, 'network' )
      .then(refs => {
        res.json(refs)
      })
  })

});

xenRouter.get('/:host/pool', async (req, res) => {
  const { host } = req.params;
  console.log(host)
  login(host, 'root', '<xen_server_password>')
  .then(() => {
    getAllRecords(host, 'pool' )
      .then(refs => {
        res.json(refs)
      })
  })

});

xenRouter.get('/:host/vbdmetrics', async (req, res) => {
  const { host } = req.params;
  console.log(host)
  login(host, 'root', '<xen_server_password>')
  .then(() => {
    getAllRecords(host, 'VBD_metrics' )
      .then(refs => {
        res.json(refs)
      })
  })

});

xenRouter.get('/:host/vmmetrics', async (req, res) => {
  const { host } = req.params;
  console.log(host)
  login(host, 'root', '<xen_server_password>')
  .then(() => {
    getAllRecords(host, 'VM_metrics' )
      .then(refs => {
        res.json(refs)
      })
  })

});

xenRouter.get('/:host/vmguestmetrics', async (req, res) => {
  const { host } = req.params;
  console.log(host)
  login(host, 'root', '<xen_server_password>')
  .then(() => {
    getAllRecords(host, 'VM_guest_metrics' )
      .then(refs => {
        res.json(refs)
      })
  })

});

xenRouter.get('/:host/vdi', async (req, res) => {
  const { host } = req.params;
  console.log(host)
  login(host, 'root', '<xen_server_password>')
  .then(() => {
    getAllRecords(host, 'VDI' )
      .then(refs => {
        res.json(refs)
      })
  })

});

module.exports = xenRouter;