import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// import { Client } from 'bugsnag-react-native';
import thunk from 'redux-thunk';
// import Pusher from 'pusher-js/react-native';

// import * as AuthServices from '../services/AuthServices';
// import fetchMyProfile from '../services/fetchMyProfile';
// import * as authServices from '../services/AuthServices';
import * as reducers from '../reducers';
import Components from '../components/indexNewUI';
// var Analytics = require('react-native-firebase-analytics');

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

// import Mixpanel from 'react-native-mixpanel';
// import { getMixPanelToken, getOneSignalId } from '../services/fetchData';
// import OneSignal from 'react-native-onesignal'; // Import package from node modules

class Index extends Component {
  constructor(opts) {
    super(opts);
  }

  // componentDidMount() {
  //     let env = authServices.getEnvironment();
  //     token = getMixPanelToken();
  //     oneSignalId = getOneSignalId();
  //     if (env === 'prod') {
  //       this.client = new Client('ed1a6085a0144f601260941740e9e65c');
  //       this.client.handleUncaughtErrors();
  //       AuthServices.getUserData().then(data => {
  //         if (!!data) {
  //           if (!!data.id && !!data.name && !!data.email) {
  //             this.client.setUser(data.id.toString(), data.name, data.email);
  //           }
  //         }
  //       });
  // }
  //     console.ignoredYellowBox = ['Setting a timer'];
  //     var pusher = new Pusher('455a848166c27a05c975', {
  //       cluster: 'ap2',
  //       encrypted: true
  //     });
  //     fetchMyProfile().then(data => {
  //       if (!!data) {
  //         var channel = pusher.subscribe('seller-company-' + data.company_id);
  //         channel.bind('notificationData', function(data) {
  //           alert(data.message);
  //         });
  //       }
  //     });
  //     OneSignal.init(oneSignalId);
  //     OneSignal.addEventListener('received', this.onReceived);
  //     OneSignal.addEventListener('opened', this.onOpened);
  //     OneSignal.addEventListener('ids', this.onIds);
  //     Mixpanel.sharedInstanceWithToken(token);
  //   }
  //   componentWillUnmount() {
  //     OneSignal.removeEventListener('received', this.onReceived);
  //     OneSignal.removeEventListener('opened', this.onOpened);
  //     OneSignal.removeEventListener('ids', this.onIds);
  //   }
  //   onReceived(notification) {
  //     console.log('Notification received: ', notification);
  //   }
  //   onOpened(openResult) {
  //     console.log('Message: ', openResult.notification.payload.body);
  //     console.log('Data: ', openResult.notification.payload.additionalData);
  //     console.log('isActive: ', openResult.notification.isAppInFocus);
  //     console.log('openResult: ', openResult);
  //   }
  //   onIds(device) {
  //     console.log('Device info: ', device);
  //   }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" />
        <Provider store={store}>
          <Components client={this.client} />
        </Provider>
      </View>
    );
  }
}

export default Index;
