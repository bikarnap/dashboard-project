const xmlrpc = require('xmlrpc');

// Store xen session reference for each of the logged in xenserver
const xenSessions = {};

const login = (host, username, password) => {
  return new Promise((resolve, reject) => {
    const clientOptions = {
      host: host,
      port: 80,
      path: '/'
    };

    const client = xmlrpc.createClient(clientOptions);

    client.methodCall('session.login_with_password', [username, password], (error, sessionRef) => {
      if (error) {
        reject (error);
      } else {
        xenSessions[host] = { sessionRef, client }
        resolve(sessionRef)
      }
    })

  })
};

const logout = (host) => {
  if (xenSessions[host]) {
    const { sessionRef, client } = xenSessions[host];
    client.methodCall('session.logout', [sessionRef.Value], (error, data) => {
      if (error) {
        console.log('Error during logout', error);
      }
      delete xenSessions[host];
    })
  }
};

// Customized client.methodCall function
const callMethod = (host, method, params=[]) => {
  return new Promise((resolve, reject) => {
    if (!xenSessions[host]) {
      reject(new Error (`Not logged into the host ${host}`));
      return;
    }

    const { sessionRef, client } = xenSessions[host];
    client.methodCall(method, [sessionRef.Value, ...params], (error, data) => {
      if (error) {
        reject (error);
      } else {
        resolve (data);
      }
    });
  });
};

module.exports = {
  login,
  logout,
  callMethod
};