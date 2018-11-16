import {callApi} from './fetchData';

export async function fetchStocksService(){
	url = 'api/dashboard/seller-home';
	obj = {};
	obj['url']=url;
	obj['type']='GET';
	return callApi(obj);
}
