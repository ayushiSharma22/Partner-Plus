import {callApi} from './fetchData';
export default async function fetchHome(body){
  url = 'api/pictures';
  obj ={};
  obj['url']=url;
  obj['type']='POST';
  obj['body'] = body;
  return callApi(obj);
}
