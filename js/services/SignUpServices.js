import { isEmpty, isEmail, isPhoneNumber } from '../commons/Utils';
import { AsyncStorage } from 'react-native';
import { callApi, getFixedheaders } from './fetchData';

const signUpHeaders = {};

getFixedheaders().then(headers => {
  signUpHeaders['Seller-Secret-Token'] = headers['Seller-Secret-Token'];
});

export async function validateEmailService(email_id) {
  let validated = false;
  if (!isEmpty(email_id) && isEmail(email_id)) {
    validated = true;
  }
  if (validated) {
    let url = 'api/user/validate-email?email=' + email_id;
    return callApi({
      url: url,
      type: 'GET',
      headers: signUpHeaders
    });
  } else {
    return {
      errors: ['Invalid Email ID']
    };
  }
}
export async function validatePhoneService(phone_number) {
  let validated = false;
  if (!isEmpty(phone_number) && isPhoneNumber(phone_number)) {
    validated = true;
  }
  if (validated) {
    phone_number = '%2B91' + phone_number;
    let url = 'api/user/validate-contact-number?contact_number=' + phone_number;
    return callApi({
      url: url,
      headers: signUpHeaders,
      type: 'GET'
    });
  } else {
    return {
      errors: ['Invalid Phone Number']
    };
  }
}

export async function signupPersonalService(userCredentials) {
  var obj = {
    url: 'api/user',
    type: 'POST',
    headers: signUpHeaders,
    body: userCredentials
  };
  return callApi(obj).then(async json_data => {
    if (json_data.auth_token) {
      let authData = {
        name: json_data.first_name + ' ' + json_data.last_name,
        auth_token: json_data.auth_token
      };
      try {
        await AsyncStorage.setItem('bizongo', JSON.stringify(authData));
      } catch (error) {
        return { errors: ['Unable to save details'] };
      }
    }
    return json_data;
  });
}

export async function sendOTPService(credentials) {
  var obj = {
    url: 'send-otp',
    type: 'PUT',
    headers: signUpHeaders,
    body: credentials
  };
  return callApi(obj);
}

export async function verifyOTPService(credentials) {
  var obj = {
    url: 'verify-otp',
    type: 'PUT',
    headers: signUpHeaders,
    body: credentials
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
        return { errors: error };
      }
    }
    return json_data;
  });
}

export async function loadCategoriesService() {
  var obj = {
    url: 'api/categories/list-categories',
    headers: signUpHeaders,
    type: 'GET'
  };
  return callApi(obj);
}

export async function registerCompanyService(credentials) {
  var obj = {
    url: 'api/companies',
    type: 'POST',
    headers: signUpHeaders,
    body: credentials
  };
  return callApi(obj);
}

export async function registerBillingDetailsService(credentials) {
  let id = credentials.company.id;
  var obj = {
    url: 'api/companies/' + id,
    type: 'PUT',
    headers: signUpHeaders,
    body: credentials
  };
  return callApi(obj);
}
