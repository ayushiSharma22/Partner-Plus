import env from '../../env';
('use strict');
var React = require('react-native');
import { getPrettyError } from '../commons/Utils';

var { AsyncStorage } = React;
export async function callApi(fetchObject) {
  let base_url = getBaseUrl();
  let url = base_url + fetchObject.url;
  let type = fetchObject.type ? fetchObject.type : 'GET';
  let body = fetchObject.body ? fetchObject.body : {};
  let headers = fetchObject.headers;
  return getFixedheaders().then(allheaders => {
    if (headers != undefined) {
      Object.assign(allheaders, headers);
    }
    if (fetchObject.headers && fetchObject.headers['Content-Type']) {
      allheaders['Content-Type'] = fetchObject.headers['Content-Type'];
    }
    var obj = {
      method: type,
      headers: allheaders,
      dataType: 'json'
    };
    if (type != 'GET' && !fetchObject.nojson) {
      obj['body'] = JSON.stringify(body);
    }
    return fetch(url, obj)
      .then(response => {
        return response.text().then(function(text) {
          let json_response = JSON.parse(text);
          return json_response;
        });
      })
      .catch(error => {
        let prettyError = getPrettyError(error);
        return {
          errors: [prettyError]
        };
      });
  });
}
export async function getFixedheaders() {
  return AsyncStorage.getItem('bizongo').then(value => {
    var headers = {};
    fixedHeaders = getBasicHeaders();
    if (value) {
      let userData = JSON.parse(value);
      let authdata = 'Token token=' + userData.auth_token;
      fixedHeaders['Authorization'] = authdata;
      return fixedHeaders;
    }
    return fixedHeaders;
  });
}

export function getMode() {
  return env.mode;
}

export function getBaseUrl() {
  let mode = getMode();
  return env[mode].base_url;
}

function getBasicHeaders() {
  let mode = getMode();
  return env[mode].headers;
}

export function getMixPanelToken() {
  let mode = getMode();
  return env[mode].mixpanelToken;
}

export function getOneSignalId() {
  let mode = getMode();
  return env[mode].oneSignalId;
}
