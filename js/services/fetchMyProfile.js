import { callApi } from './fetchData';

export default async function fetchMyProfile() {
  url = 'api/user';
  obj = {};
  obj['url'] = url;
  obj['type'] = 'GET';
  return callApi(obj);
}

export async function submitMyProfile(id, body) {
  url = 'api/user/' + id;
  obj = {};
  obj['url'] = url;
  obj['type'] = 'PUT';
  obj['body'] = body;
  return callApi(obj);
}
