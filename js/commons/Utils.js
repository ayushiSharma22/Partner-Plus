import { Alert, BackHandler } from 'react-native';

export function isEmpty(obj) {
  if (!obj || (obj === '' && obj === null && obj === undefined)) {
    return true;
  }
  return false;
}

export function isEmail(inputText) {
  let email = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  return email.test(inputText);
}

export function isPhoneNumber(inputText) {
  let phone = /^[789][0-9]{9}$/;
  return phone.test(inputText);
}

export function validatePassword(password) {
  return password.length >= 8;
}

export function backButtonPress(navigator) {
  let currentRoutes = navigator.getCurrentRoutes();
  length = navigator.getCurrentRoutes().length;
  if (
    navigator &&
    navigator.getCurrentRoutes().length == 2 &&
    navigator.getCurrentRoutes()[0].id === 'welcome'
  ) {
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return true;
          },
          style: 'cancel'
        },
        { text: 'OK', onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    );
    return true;
  } else if (currentRoutes[length - 1].id === 'notifications') {
    navigator.replace({ id: 'home' });
    return true;
  } else if (navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.replacePreviousAndPop(currentRoutes[length - 2]);
    return true;
  }
  return false;
}

export function createErrorMessage(errors) {
  let message = '';
  if (errors.length > 0) {
    message = errors[0];
    for (var i = 1; i < errors.length; i++) {
      message += ', ' + errors[i];
    }
  }
  return errors;
}

export function getPrettyError(error) {
  let strError = error.toString();
  var n = strError.indexOf('at');
  if (n == -1) {
    return strError;
  }
  return strError.substr(0, n);
}
export function checkPositive(number) {
  let numberTest = /^[0-9]\d*(\.\d+)?$/;
  if (numberTest.test(number)) {
    let c = parseFloat(number);
    if (c > 0) {
      return true;
    }
  }
  return false;
}

export function checkPositiveInteger(number) {
  let numberTest = /^[0-9]+$/;
  if (numberTest.test(number)) {
    let c = parseInt(number);
    if (c > 0) {
      return true;
    }
  }
  return false;
}

export function checkErrors(response) {
  if (response.error) {
    return response.error;
  } else if (response.errors) {
    return createErrorMessage(response.errors);
  } else {
    return null;
  }
}

export function createGetUrlFromOptions(options) {
  let params = '';
  let count = 0;
  for (property in options) {
    if (options.hasOwnProperty(property)) {
      if (!!property && !!options[property]) {
        if (count > 0) {
          params += '&';
        }
        params += property + '=' + options[property];
        count++;
      }
    }
  }

  return params;
}

export function parameterize(inputText) {
  return inputText.toLowerCase().replace(/ /g, '_');
}

export function humanize(inputText) {
  return inputText.replace('_', ' ').toUpperCase();
}

export function getTimeInHours(inputText) {
  return parseInt(inputText.split(' ')[0]) * 24;
}

export function splitToWords(inputText) {
  return inputText.replace(/_/g, ' ');
}

export function CapitalizeAllWords(inputText) {
  result = '';
  parts = inputText.split(' ');
  result = CapitalizeFirstLetter(parts[0]);
  for (var i = 1; i < parts.length; i++) {
    result += ' ' + CapitalizeFirstLetter(parts[i]);
  }
  return result;
}

export function CapitalizeFirstLetter(inputText) {
  inputText = inputText.toLowerCase();
  return inputText.charAt(0).toUpperCase() + inputText.slice(1);
}
