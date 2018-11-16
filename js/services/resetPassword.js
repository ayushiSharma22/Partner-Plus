import { callApi } from './fetchData';
export default async function updatePassword(data) {
  url = 'api/user/update-password';
  obj = {};
  obj['url'] = url;
  obj['type'] = 'PUT';
  obj['body'] = data;
  return callApi(obj);
}
