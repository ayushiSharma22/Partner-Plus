import React, { Component } from 'react';
import {
  AsyncStorage,
  TouchableOpacity,
  View,
  ScrollView,
  Platform
} from 'react-native';
import { Spinner } from 'native-base';
// import FCM, { FCMEvent } from 'react-native-fcm';
import StatusBar from './Header';
const SideMenu = require('react-native-side-menu');
import Drawer from 'react-native-drawer';
import DrawerContent from './drawerContent';
import { failedToLoadScreen } from './Elements';
// import { saveFCMTokenService } from '../services/AuthServices';
// var Analytics = require('react-native-firebase-analytics');

export default class ThreePanels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      drawerDisabled: false,
      refresh: false,
      initial: true,
      request: false,
      complete: false,
      error: false,
      errorMessage: null,
      pendingNotif: false,
      notif: null,
      fcmToken: null,
      tokenSaved: false,
      dropdownAlert: false,
      token: '',
      tokenCopyFeedback: ''
    };
    this.closeDrawer = this.closeDrawer.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  closeDrawer() {
    this.refs.myDrawer.close();
  }

  openDrawer() {
    this.refs.myDrawer.open();
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {
      userConfirmation,
      getState,
      userState,
      loginState,
      navigator
    } = this.props;
    getState();
    let currentRoutes = navigator.getCurrentRoutes();
    console.log(currentRoutes);
    console.log(userState);
    // this.setState({initial: false});
    if (currentRoutes[currentRoutes.length - 1].id === 'updateContact') {
      this.setState({ initial: false, request: true });
      userConfirmation();
    } else if (userState.user === null) {
      this.setState({ initial: false, request: true });
      userConfirmation();
    } else if (
      (!userState.complete && !userState.error && !userState.request) ||
      userState.user.confirmed_at === null ||
      !userState.user.company_exist ||
      !userState.user.billing_details_filled
    ) {
      this.setState({ initial: false, request: true });
      userConfirmation();
    } else {
      this.setState({ initial: false, complete: true });
    }
    // this.getFCMDetails();
  }

  handleNotification(notif) {
    const { navigator } = this.props;
    if (notif.notification_type === 'REQUEST_FOR_QUOTE_START') {
      navigator.push({
        id: 'inquiry',
        inquiry_id: notif.rfq_id,
        name: 'REQUEST FOR QUOTES'
      });
    }
  }

  getToken() {
    return AsyncStorage.getItem('bizongo_fcm_token');
  }

  saveToken(token) {
    const { showAlert, navigator } = this.props;
    if (token !== null && token !== undefined) {
      try {
        AsyncStorage.setItem('bizongo_fcm_token', token);
      } catch (error) {
        // showAlert("info", "Error", error);
      }
    }
  }

  sendToken(user_id) {
    // const {userState} = this.props;
    this.getToken().then(token => {
      if (token !== null && token !== undefined) {
        saveFCMTokenService(token, user_id).then(data => {
          if (data.error) {
          } else {
          }
        });
      }
    });
  }

  getFCMDetails() {
    const { showAlert, navigator, userState } = this.props;
    if (Platform.OS === 'ios') {
      FCM.requestPermissions();
    }
    FCM.getFCMToken().then(token => {
      if (token !== null && token !== undefined) {
        this.saveToken(token);
      }
    });
    FCM.getInitialNotification().then(notif => {
      if (notif && notif.notification_type) {
        this.setState({
          pendingNotif: true,
          notif: notif
        });
        // this.handleNotification(notif);
      } else {
        // showAlert("info", "No alert", "No Notification");
      }
    });
  }

  notificationUnsubscribe() {
    FCM.on(FCMEvent.Notification, notif => {
      if (notif.local_notification) {
      }
      if (notif.opened_from_tray) {
        this.handleNotification(notif);
      }
      this.handleNotification(notif);
    });
  }

  refreshUnsubscribe() {
    FCM.on(FCMEvent.RefreshToken, token => {
      if (token !== null && token !== undefined) {
        this.getToken().then(value => {
          if (value !== token) {
            this.saveToken(value);
            if (userState.user !== null) {
              this.sendToken(userState.user.id);
            }
          }
        });
      }
    });
  }

  componentWillUnmount() {
    // this.refreshUnsubscribe();
    // this.notificationUnsubscribe();
  }

  componentWillReceiveProps(nextProps) {
    const { navigator, showAlert, loginState } = nextProps;
    const prevUserState = this.props.userState;
    const nextUserState = nextProps.userState;
    const prevLoginState = this.props.loginState;
    if (!loginState.loggedIn) {
      this.setState({ complete: false });
      navigator.resetTo({ id: 'login' });
    }
    if (prevUserState.request && !nextUserState.request) {
      if (!prevUserState.complete && nextUserState.complete) {
        // Analytics.setUserId(nextUserState.user.id + '');
        if (
          nextUserState.user.confirmed_at === null &&
          nextUserState.routePossible
        ) {
          this.setState({ request: false });
          navigator.resetTo({ id: 'signup_mobile' });
        } else if (
          !nextUserState.user.company_exist &&
          nextUserState.routePossible
        ) {
          this.setState({ request: false });
          navigator.resetTo({ id: 'signup_company' });
        } else if (
          !nextUserState.user.seller_company_details_filled &&
          nextUserState.routePossible
        ) {
          this.setState({ request: false });
          navigator.resetTo({ id: 'signup_company' });
        } else if (
          !nextUserState.user.billing_details_filled &&
          nextUserState.routePossible
        ) {
          this.setState({ request: false });
          navigator.resetTo({ id: 'signup_billing' });
        } else {
          this.setState({ request: false, complete: true });
        }
      }
      if (!prevUserState.error && nextUserState.error) {
        this.setState({ request: false, error: true });
        // showAlert('info', "Error", nextUserState.errorMessage);
      }
    }
    if (prevUserState.user === null && nextUserState.user !== null) {
      AsyncStorage.setItem('bizongo_user_id', nextUserState.user.id + '');
      this.sendToken(nextUserState.user.id);
      if (this.state.pendingNotif) {
        this.setState({
          pendingNotif: false
        });
        this.handleNotification(this.state.notif);
      }
    }
  }

  _onRefresh() {
    this.setState({ refresh: true });
  }

  renderInnerComponent() {
    const { userState } = this.props;
    let component = <View />;
    if (!userState.complete) {
      component = <Spinner />;
    } else {
      component = <View>{this.props.childRender}</View>;
    }
    return component;
  }

  renderCustom() {
    return <View />;
  }

  renderStatusBar() {
    const { productReset, fetchNotifications, back_button } = this.props;
    return (
      <StatusBar
        fetchNotifications={fetchNotifications}
        productReset={productReset}
        heading={this.props.name}
        back_button={back_button}
        onDrawerPress={this.openDrawer}
        navigator={this.props.navigator}
      />
    );
  }

  renderFailedComponent() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity onPress={this.loadData.bind(this)}>
          {failedToLoadScreen()}
        </TouchableOpacity>
      </ScrollView>
    );
  }

  renderDrawer() {
    const { logout, productReset, userState, navigator } = this.props;
    return (
      <Drawer
        type="overlay"
        ref="myDrawer"
        content={
          <DrawerContent
            userState={userState}
            logout={logout}
            navigator={navigator}
          />
        }
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        panOpenMask={0.1}
        negotiatePan={true}
        captureGestures="open"
        tweenHandler={ratio => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
      >
        {this.renderStatusBar()}
        {this.props.childRender}
      </Drawer>
    );
  }

  render() {
    const { userState } = this.props;
    console.log(this.state);
    if (this.state.complete) {
      return this.renderDrawer();
    } else if (this.state.request || this.state.initial) {
      return <Spinner />;
    } else {
      return this.renderFailedComponent();
      return this.renderDrawer();
    }
  }
}

const drawerStyles = {
  drawer: {
    elevation: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  main: { paddingLeft: 3 }
};
//
