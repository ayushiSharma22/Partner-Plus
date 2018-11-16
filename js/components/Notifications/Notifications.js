import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions
} from 'react-native';
import { renderEmptyScreen } from '../Elements';
import { Spinner } from 'native-base';
import { px } from '../../commons/helper';
import * as Colors from '../../commons/colors';
import Mixpanel from 'react-native-mixpanel';
import NotificationCard from './NotificationCard';

let ScreenHeight = Dimensions.get('window').height - 80;
let unread_ids = [];

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    req_params = {
      page: 1,
      per_page: 10
    };
    this.state = {
      init: true,
      req: false,
      com: false,
      err: false,
      ref: false,
      laz: false,
      data: null,
      total: 0,
      req_params: req_params
    };
    Mixpanel.track('Visited Notifications Page');
  }

  componentDidMount() {
    this.setState({ init: false, req: true });
    this.loadData(this.state.req_params);
  }

  loadData(options) {
    let { fetchNotifications, showAlert } = this.props;
    fetchNotifications(options).then(data => {
      let { init, req } = this.state;
      if (!!data.error) {
        showAlert('info', 'Error', data.error);
        if (init || req) {
          this.setState({ err: true, ref: false });
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const prevState = this.props.notificationsState.notifications;
    const nextState = nextProps.notificationsState.notifications;

    let { init, req, ref, laz } = this.state;

    if (!prevState.complete && nextState.complete) {
      if (init || req || ref) {
        this.setState({
          init: false,
          req: false,
          ref: false,
          com: true,
          data: nextState.data.notifications,
          total: nextState.data.total_notifications
        });
      } else if (laz) {
        let newData = nextState.notifications;
        newData = this.state.data.concat(nextState.data.notifications);
        new_params = this.state.req_params;
        new_params.page++;
        this.setState({
          laz: false,
          data: newData,
          total: nextState.data.total_notifications,
          req_params: new_params
        });
      }
    }
  }

  handleRefresh() {
    this.setState({
      ref: true
    });
    new_params = Object.assign({}, this.state.req_params, {
      page: 1
    });
    this.updateData(unread_ids);
    this.loadData(new_params);
  }

  openNotification(id, navName) {
    let { navigator } = this.props;
    Mixpanel.track('Opened Link through Notification Card');
    if (navName == 'inquiry') {
      navigator.push({ id: 'inquiry', inquiry_id: id, name: '' });
    } else if (navName == 'purchase_order') {
      navigator.push({ id: 'home', activeTab: 'po' });
    } else {
      navigator.push({ id: 'home', activeTab: 'quotes' });
    }
  }

  renderNotifications() {
    all_notifications = this.state.data;
    total = this.state.total;
    if (all_notifications.length > 0) {
      component = [];
      for (var i = 0; i < all_notifications.length; i++) {
        unread = false;
        notification = all_notifications[i];
        if (all_notifications[i].status === 'unread') {
          unread_ids.push(all_notifications[i].id);
          unread = true;
        }
        component.push(
          <View key={i}>
            <NotificationCard
              notification={notification}
              notification_index={i}
              unread={unread}
              openNotification={(id, name) => this.openNotification(id, name)}
            />
          </View>
        );
      }
      this.updateData(unread_ids);
      return component;
    } else {
      return renderEmptyScreen(
        'ZERO NOTIFICATIONS',
        "Currently you don't have any Notifications."
      );
    }
  }

  lazyLoad() {
    let { init, req, ref, laz, total, data } = this.state;
    req_params = Object.assign({}, this.state.req_params);
    req_params.page++;
    if (!init && !req && !ref && !laz) {
      if (total > data.length) {
        this.setState({ laz: true });
        this.loadData(req_params);
      }
    }
  }

  onScroll(e) {
    var windowHeight = Dimensions.get('window').height,
      height = e.nativeEvent.contentSize.height,
      offset = e.nativeEvent.contentOffset.y;
    if (windowHeight + offset >= height) {
      this.lazyLoad();
    }
  }

  updateData(unread_ids) {
    let { updateNotifications, showAlert } = this.props;
    updateNotifications(unread_ids).then(data => {
      unread_ids = [];
    });
  }

  renderView() {
    return (
      <View style={styles.mainBackground}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.ref}
              onRefresh={() => this.handleRefresh()}
            />
          }
          onScroll={this.onScroll.bind(this)}
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="always"
        >
          <View style={{ padding: px(3) }}>{this.renderNotifications()}</View>
        </ScrollView>
      </View>
    );
  }

  render() {
    if (this.state.com) {
      return this.renderView();
    } else if (this.state.err) {
      return this.renderFailedComponent();
    } else {
      return <Spinner />;
    }
  }
}

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_LIGHT_GREY
  },
  mainScroll: {
    backgroundColor: Colors.BACKGROUND_LIGHT_GREY,
    height: ScreenHeight
  },
  ratingHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: px(3),
    color: Colors.TEXT_BLACK,
    marginTop: 10,
    marginBottom: 10,
    height: 20
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.SECONDARY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    elevation: 1,
    shadowColor: Colors.TEXT_BLACK,
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  radioButtons: {
    alignItems: 'flex-start'
  }
});
