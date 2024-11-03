const vmsRouter = require('express').Router();
const { login, logout } = require('../../devops-dashboard-server/xen/xen-api/authentication')
const { getAllRecords } = require('../../devops-dashboard-server/xen/xen-api/common');

vmsRouter.get('/', async (req, res) => {
  const { host } = req.query;
  console.log(host)
  login(host, 'root', '<xen_server_password>')
  .then(sessionRef => {
    getAllRecords(host, 'VM' )
      .then(refs => {
        res.json(refs)
      })
  })

});

vmsRouter.get('/:host', async (req, res) => {
  const { host } = req.params; // Route parameter
  const { power_state } = req.query; // Specific query parameter

  console.log('Query Parameters:', req.query, 'Host Parameter:', host);

  login(host, 'root', '<xen_server_password>')
    .then(() => {
      return getAllRecords(host, 'VM'); // Fetch records after login
    })
    .then(refs => {
      if (power_state) {
        // Check for a specific query parameter
        const filteredRefs = Object.values(refs).filter(ref => (ref.power_state.toLowerCase() === power_state.toLowerCase()) && !ref.is_a_template && !ref.is_default_template && !ref.is_a_snapshot && !ref.is_control_domain);
        res.json(filteredRefs);
      } else {
        // Default filter logic if no specific query parameter
        const filteredRefs = Object.values(refs).filter(
          ref => !ref.is_a_template && !ref.is_default_template && !ref.is_a_snapshot && !ref.is_control_domain
        );
        res.json(filteredRefs);
      }
    })
    .catch(err => {
      console.error('Error during operation:', err);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    });
});

module.exports = vmsRouter;
