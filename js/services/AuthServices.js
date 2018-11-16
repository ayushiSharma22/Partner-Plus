import { isEmpty, isEmail, isPhoneNumber } from '../commons/Utils';
import { AsyncStorage, Platform } from 'react-native';
import * as EventTypes from '../actions/EventTypes';
import { callApi } from './fetchData';
import env from '../../env';

var DeviceInfo = require('react-native-device-info');
// var Analytics = require('react-native-firebase-analytics');
var base64 = require('base-64');

export function getGST() {
  return env.gst;
}

export async function saveFCMTokenService(token, user_id) {
  if (!isEmpty(token)) {
    var obj = {
      url: 'api/user/' + user_id + '/fcm',
      type: 'POST',
      body: {
        fcm_registration_id: token
      }
    };
    return callApi(obj);
  } else {
    return { error: 'Empty token' };
  }
}

export async function loginService(userCredentials) {
  let validated = false;
  let authdata = '';
  if (
    !isEmpty(userCredentials.username) &&
    !isEmpty(userCredentials.password)
  ) {
    if (isEmail(userCredentials.username)) {
      validated = true;
    } else if (isPhoneNumber(userCredentials.username)) {
      validated = true;
      authdata = '+91';
    }
  }
  if (validated) {
    authdata += userCredentials.username + ':' + userCredentials.password;
    authdata = 'Basic ' + base64.encode(authdata);
    var obj = {
      url: 'api/auth',
      type: 'POST',
      headers: { Authorization: authdata }
    };
    return callApi(obj).then(async json_data => {
      if (json_data.name && json_data.auth_token) {
        let authData = {
          name: json_data.name,
          auth_token: json_data.auth_token
        };
        try {
          await AsyncStorage.setItem('bizongo', JSON.stringify(authData));
        } catch (error) {
          return { status: 'error', message: 'save_error' };
        }
      }
      return json_data;
    });
  }
  return { error: 'Not Valid' };
}
export async function getLocalData() {
  return AsyncStorage.getItem('bizongo');
}
export async function getCurrentStateService() {
  let userCredentials = null;
  return getLocalData().then(value => {
    if (value && value !== null && value !== '') {
      let userData = JSON.parse(value);
      if (userData.name && userData.auth_token) {
        return {
          loggedIn: true,
          nextRoute: 'home',
          user: {
            name: userData.name,
            auth_token: userData.auth_token
          }
        };
      }
    }
    return {
      loggedIn: false,
      nextRoute: null,
      user: null
    };
  });
}

export async function userConfirmationService() {
  var obj = {
    url: 'api/user',
    method: 'PUT'
  };
  return callApi(obj).then(json_data => {
    setUserData(json_data);
    return json_data;
  });
}
export async function getUserData() {
  return AsyncStorage.getItem('user_data').then(data => {
    if (isEmpty(data)) {
      return null;
    } else {
      let userData = JSON.parse(data);
      return userData;
    }
  });
}
async function setUserData(data) {
  let userData = {
    id: data.id,
    name: data.name,
    email: data.email
  };
  try {
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
  } catch (error) {
    return { status: 'error', message: 'Save error' };
  }
}
export async function resetPassword(body) {
  url = 'api/user/request-password';
  obj = {};
  obj['url'] = url;
  obj['type'] = 'PUT';
  obj['body'] = body;
  return callApi(obj);
}

export async function logoutService() {
  let userCredentials = null;
  return AsyncStorage.getItem('bizongo_fcm_token').then(token => {
    if (isEmpty(token)) {
      return removeTokens();
    } else {
      return AsyncStorage.getItem('bizongo_user_id')
        .then(user_id => {
          var obj = {
            url: 'api/user/' + user_id + '/fcm',
            type: 'PUT',
            body: {
              fcm_registration_id: token,
              status: 'INACTIVE'
            }
          };
          return callApi(obj)
            .then(data => {
              return removeTokens();
            })
            .catch(error => {
              return { status: 'ERROR' };
            });
        })
        .catch(error => {
          return { status: 'ERROR' };
        });
    }
  });
}

async function removeTokens() {
  return AsyncStorage.removeItem('bizongo')
    .then(() => {
      return AsyncStorage.removeItem('bizongo_fcm_token')
        .then(() => {
          // Analytics.logEvent(EventTypes.LOGOUT_EVENT, {});
          return { status: 'SUCCESS' };
        })
        .catch(error => {
          return { status: 'ERROR' };
        });
    })
    .catch(error => {
      return { status: 'ERROR' };
    });
}

export async function updateContactNumberService(user_id, data) {
  var obj = {
    url: 'api/user/' + user_id,
    type: 'PUT',
    body: data
  };
  return callApi(obj);
}

export async function fetchAppUpdatesService() {
  version = DeviceInfo.default.getVersion();
  os = Platform.OS;
  var obj = {
    url: 'api/killswitch?os=' + os + '&version=' + version,
    type: 'GET'
  };
  return callApi(obj);
}

export function getDeviceInfo() {
  let device_info = {
    unique_id: DeviceInfo.getUniqueID(),
    manufacturer: DeviceInfo.getManufacturer(),
    brand: DeviceInfo.getBrand(),
    device_model: DeviceInfo.getModel(),
    device_id: DeviceInfo.getDeviceId(),
    system_name: DeviceInfo.getSystemName(),
    system_version: DeviceInfo.getSystemVersion(),
    bundle_id: DeviceInfo.getBundleId(),
    build_number: DeviceInfo.getBuildNumber(),
    app_version: DeviceInfo.getVersion(),
    app_version_readable: DeviceInfo.getReadableVersion(),
    device_name: DeviceInfo.getDeviceName()
  };
  return device_info;
}

export function getPusherInfo() {
  let pusher = {
    app_id: '586254',
    key: '522d29f4d76689ba378a',
    secret: '60062cbe64f2f9083cb0',
    cluster: 'ap2'
  };
  return pusher;
}

export function getEnvironment() {
  return env.mode;
}
