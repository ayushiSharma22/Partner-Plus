import * as FetchServices from './fetchData';
import * as Utils from '../commons/Utils';

export async function fetchInquiriesService(options) {
  options = Object.assign({}, options);
  if(!!options.validity_time) {
    options.validity_time = Utils.getTimeInHours(options.validity_time);
  }
  if(!!options.date_filter) {
    options.date_filter = JSON.stringify(options.date_filter);
  }
  if(!!options.status) {
    if(options.status === 'given') {
      options.status = '';
      url = 'api/seller/supplier-quotes/quote-given?'+Utils.createGetUrlFromOptions(options)
    } else if(options.status === 'lost') {
      options.status = '';
      options.quote_lost = true
      url = 'api/seller/supplier-quotes?'+Utils.createGetUrlFromOptions(options)
    } else if(options.status === 'accepted') {
      options.status = '';
      options.quote_accepted = true
      url = 'api/seller/supplier-quotes?'+Utils.createGetUrlFromOptions(options)
    } else {
      options.status = Utils.parameterize(options.status)
      url = 'api/seller/supplier-quotes/quote-requested?'+Utils.createGetUrlFromOptions(options)
    }
  } else {
    options.status = Utils.parameterize(options.status)
    url = 'api/seller/supplier-quotes/quote-requested?'+Utils.createGetUrlFromOptions(options)
  }
  let request = {
    url: url,
    method: 'GET',
  };
  return FetchServices.callApi(request);
}

export async function submitQuoteService(data, inquiry_id) {
  let request = {
    url: 'api/seller/supplier-quotes/bulk-quotes',
    type: 'POST',
    body: data
  };
  return FetchServices.callApi(request);
}

export async function editQuoteService(data, inquiry_id, supplier_id) {
  let request = {
    url: 'api/seller/supplier-quotes/' + supplier_id,
    type: 'PUT',
    body: data
  };
  return FetchServices.callApi(request);
}

export async function fetchInquiryService(inquiry_id) {
  let request = {
    url: 'api/seller/supplier-quotes/show-quotes/?ids='+inquiry_id,
    type: 'GET'
  };
  return FetchServices.callApi(request);
}

export async function fetchInquiryHistoryService(inquiry_id) {
  let request = {
    url: 'api/seller/supplier-quotes/'+inquiry_id+'/quote-history',
    type: 'GET'
  };
  return FetchServices.callApi(request);
}

export async function rejectBidService(inquiry_id, data) {
  let request = {
    url: 'api/seller/bidders/'+inquiry_id+'/reject_bid',
    type: 'PUT',
    body: data
  };
  return FetchServices.callApi(request);
}
