import { callApi } from './fetchData';

export async function fetchCompanyService(company_id) {
  var obj = {
    url: 'api/companies/' + company_id,
    type: 'GET'
  };
  return callApi(obj).then(json_data => {
    return json_data;
  });
}

export async function saveCompanyService(company_id, credentials) {
  var obj = {
    type: 'PUT',
    url: 'api/companies/' + company_id,
    body: credentials
  };
  return callApi(obj).then(json_data => {
    return json_data;
  });
}

export async function saveStatutoryDetailsService(company_id, credentials) {
  var obj = {
    type: 'POST',
    url: 'api/companies/' + company_id + '/request-to-edit-information',
    body: credentials
  };
  return callApi(obj).then(json_data => {
    return json_data;
  });
}
