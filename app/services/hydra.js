const fetch = require('node-fetch');
const uj = require('url-join');
const config = rootRequire('./config/');
const logger = rootRequire('./config/logger');

const hydraUrl = config.hydra_url;
const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false
});

// A little helper that takes type (can be "login" or "consent") and a challenge and returns the response from ORY Hydra.
function get(flow, challenge) {
  return fetch(uj(hydraUrl, '/oauth2/auth/requests/' + flow + '/' + challenge), { agent })
    .then(res => {
      if (res.status < 200 || res.status > 302) {
        // This will handle any errors that aren't network related (network related errors are handled automatically)
        return res.json().then(body => {
          logger.error('An error occurred while making a HTTP request: ', body)
          return Promise.reject(new Error(body.error.message))
        })
      }

      return res.json();
    })
    .catch(error => {
      logger.error(error);
      return Promise.reject(new Error(error.message))
    });
}

// A little helper that takes type (can be "login" or "consent"), the action (can be "accept" or "reject") and a challenge and returns the response from ORY Hydra.
function put(flow, action, challenge, body) {
  logger.info(uj(hydraUrl, '/oauth2/auth/requests/' + flow + '/' + challenge + '/' + action));
  logger.info(JSON.stringify(body));
  return fetch(
      // Joins process.env.HYDRA_URL with the request path
      uj(hydraUrl, '/oauth2/auth/requests/' + flow + '/' + challenge + '/' + action), {
        agent: agent,
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(res => {
      logger.info(JSON.stringify(res));
      if (res.status < 200 || res.status > 302) {
        // This will handle any errors that aren't network related (network related errors are handled automatically)
        return res.json().then(body => {
          logger.error('An error occurred while making a HTTP request: ', body)
          return Promise.reject(new Error(body.error.message))
        })
      }

      return res.json();
    })
    .catch(error => {
      logger.error(error);
      return Promise.reject(new Error(error.message))
    });;
}

var hydra = {
  // Fetches information on a login request.
  getLoginRequest: (challenge) => {
    return get('login', challenge);
  },
  // Accepts a login request.
  acceptLoginRequest: (challenge, body) => {
    return put('login', 'accept', challenge, body);
  },
  // Rejects a login request.
  rejectLoginRequest: (challenge) => {
    return put('login', 'reject', challenge, body);
  },
  // Fetches information on a consent request.
  getConsentRequest: (challenge) => {
    return get('consent', challenge);
  },
  // Accepts a consent request.
  acceptConsentRequest: (challenge, body) => {
    return put('consent', 'accept', challenge, body);
  },
  // Rejects a consent request.
  rejectConsentRequest: (challenge, body) => {
    return put('consent', 'reject', challenge, body);
  }
};

module.exports = hydra;
