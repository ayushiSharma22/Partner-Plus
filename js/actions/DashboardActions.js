import * as ActionTypes from './actionTypes';
import * as MiscellaneousServices from '../services/MiscellaneousServices';
import { fetchStocksService } from '../services/DashboardServices';
import * as Utils from '../commons/Utils';

export function fetchSellerDashboard() {
  return (dispatch, getState) => {
    return MiscellaneousServices.fetchSellerDashboardService()
      .then(data => {
        let error = Utils.checkErrors(data);
        if (!!error) {
          return { error: error };
        }
        return data;
      })
      .catch(error => {});
  };
}
