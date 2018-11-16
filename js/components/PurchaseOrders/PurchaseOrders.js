import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Text from '../Text';
import * as Colors from '../../commons/colors';
import * as Utils from '../../commons/Utils';
import { px } from '../../commons/helper';
import Tab from './Tab';
import { Spinner } from 'native-base';
import { renderEmptyScreen, failedToLoadScreen } from '../Elements';
import PurchaseOrderCard from './PurchaseOrderCard';
import Mixpanel from 'react-native-mixpanel';

let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;

let tabs = [
  {
    name: 'open',
    label: 'Pending',
    status: ['pending'],
    heading: 'PENDING'
  },
  {
    name: 'closed',
    label: 'Closed',
    status: ['completed', 'cancelled', 'short_closed', 'closed', 'excess'],
    heading: 'CLOSED'
  }
];

export default class PurchaseOrdersIndex extends Component {
  constructor(props) {
    super(props);
    let { tabName, options } = this.props;
    if (!options) {
      options = {};
    }
    req_params = {
      page: 1,
      per_page: 10,
      status: options.status || 'open'
    };
    if (!tabName) {
      tabName = tabs[0].heading;
      tabStatus = tabs[0].name;
    }
    req_params = Object.assign({}, req_params, options);
    this.state = {
      init: true,
      req: false,
      ref: false,
      com: false,
      err: false,
      laz: false,
      width: 300,
      errorMessage: false,
      data: null,
      count: 0,
      endOfItems: false,
      req_params: req_params,
      tabName: tabName,
      tabStatus: tabStatus
    };
  }

  componentDidMount() {
    this.setState({ init: false, req: true, endOfItems: false });
    this.props.startLoading();
    this.loadData(this.state.req_params);
    Mixpanel.track('Visited Purchase Orders Index Page');
  }

  loadData(options) {
    let { fetchPurchaseOrders, showAlert } = this.props;
    parameterOptions = options;
    if (options.status === 'closed') {
      parameterOptions = Utils.createGetUrlFromOptions(parameterOptions);
      parameterOptions =
        'page=' +
        options.page +
        '&per_page=' +
        options.per_page +
        '&statuses[]=completed&statuses[]=cancelled&statuses[]=short_closed&statuses[]=closed&statuses[]=excess';
    } else {
      parameterOptions['statuses[]'] = ['pending'];
      parameterOptions = Utils.createGetUrlFromOptions(parameterOptions);
    }
    fetchPurchaseOrders(parameterOptions).then(data => {
      let { init, req } = this.state;
      if (!!data.error) {
        showAlert('info', 'Error', data.error);
        if (init || req) {
          this.setState({ err: true });
        }
      }
      this.props.doneLoading();
    });
  }

  componentWillReceiveProps(nextProps) {
    const prevState = this.props.purchaseOrderState;
    const nextState = nextProps.purchaseOrderState;

    let { init, req, ref, laz } = this.state;

    if (!prevState.complete && nextState.complete) {
      if (init || req || ref) {
        this.setState({
          init: false,
          req: false,
          ref: false,
          com: true,
          data: nextState.data.bizongo_purchase_orders,
          count: nextState.data.count
        });
      } else if (laz) {
        let newData = nextState.data.bizongo_purchase_orders;
        newData = this.state.data.concat(
          nextState.data.bizongo_purchase_orders
        );
        new_params = this.state.req_params;
        new_params.page++;
        this.setState({
          laz: false,
          data: newData,
          count: nextState.data.count,
          req_params: new_params
        });
      }
    }
  }

  _onRefresh() {
    new_params = Object.assign({}, this.state.req_params, {
      page: 1
    });
    this.setState({ req: true, ref: false, req_params: new_params });
    this.loadData(new_params);
  }

  openPurchaseOrder(purchase_order_id, po_number) {
    req_params = {
      page: 1,
      per_page: 10
    };
    let { navigator, fetchPurchaseOrderItems, showAlert } = this.props;
    fetchPurchaseOrderItems(req_params, purchase_order_id).then(data => {
      if (!!data.error) {
        showAlert('info', 'Error', data.error);
      } else {
        navigator.push({
          id: 'purchase_order',
          po_number: po_number,
          purchase_order_id: purchase_order_id
        });
      }
    });
  }

  renderPurchaseOrders() {
    allPurchaseOrders = this.state.data;
    let { endOfItems, count } = this.state;
    let index = 0;
    component = [];
    if (allPurchaseOrders.length > 0) {
      for (var i = 0; i < allPurchaseOrders.length; i++) {
        purchase_order = allPurchaseOrders[i];
        index = i;
        component.push(
          <View key={i}>
            <PurchaseOrderCard
              purchase_order={purchase_order}
              purchase_order_index={i}
              openPurchaseOrder={(purchase_order_id, po_number) =>
                this.openPurchaseOrder(purchase_order_id, po_number)
              }
              rejectPurchaseOrder={purchase_order_id =>
                this.rejectPurchaseOrder(purchase_order_id)
              }
              acceptPurchaseOrder={purchase_order_id =>
                this.acceptPurchaseOrder(purchase_order_id)
              }
            />
          </View>
        );
      }
      if (endOfItems) {
        component.push(
          <Text
            style={{
              color: Colors.PRIMARY_BLUE,
              fontSize: 16,
              textAlign: 'center',
              marginBottom: 10,
              fontWeight: 'bold'
            }}
            key={index + 1}
          >
            Shown {count}/{count} Purchase Orders
          </Text>
        );
      }
      return component;
    } else {
      return renderEmptyScreen(
        'No' + this.state.tabStatus + 'Purchase Orders',
        "Currently you don't have any Purchase Orders in this Section"
      );
    }
  }

  changeTab(index) {
    if (!this.state.ref && !this.state.req) {
      new_params = Object.assign({}, this.state.req_params, {
        status: tabs[index].name,
        page: 1
      });
      this.setState({
        req: true,
        com: false,
        err: false,
        endOfItems: false,
        req_params: new_params,
        name: tabs[index].heading
      });
      this.loadData(new_params);
    }
  }

  makeItems = tabs => {
    const items = [];
    active_tab = this.state.req_params.status;
    for (tab in tabs) {
      active = false;
      if (active_tab === tabs[tab].name) {
        active = true;
      }
      items[tab] = (
        <Tab
          key={tab}
          label={tabs[tab].label}
          active={active}
          tab_index={tab}
          changeTab={index => this.changeTab(index)}
        />
      );
    }
    return items;
  };

  renderTabs() {
    items = [];
    items.push(
      <ScrollView
        key="scrollView"
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ flex: 1 }}
        style={styles.scrollViewStyle}
      >
        {this.makeItems(tabs)}
      </ScrollView>
    );
    const horizontalScrollView = <View style={styles.scrollView}>{items}</View>;
    return horizontalScrollView;
  }

  lazyLoad() {
    let { init, req, ref, laz, count, data } = this.state;
    req_params = Object.assign({}, this.state.req_params);
    req_params.page++;
    if (!init && !req && !ref && !laz) {
      if (count > data.length) {
        this.setState({ laz: true });
        this.loadData(req_params);
      } else {
        this.setState({ endOfItems: true });
      }
    }
  }

  onScroll(e) {
    var height = e.nativeEvent.contentSize.height,
      offset = e.nativeEvent.contentOffset.y;
    if (ScreenHeight + offset >= height) {
      this.lazyLoad();
    }
  }

  renderContent() {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.BACKGROUND_LIGHT_GREY }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.ref}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        onScroll={this.onScroll.bind(this)}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="always"
      >
        {this.renderPurchaseOrders()}
      </ScrollView>
    );
  }

  renderLoading() {
    return (
      <View>
        <View style={{ margin: 10 }}>
          <Spinner />
        </View>
      </View>
    );
  }

  renderError() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => this.loadData(this.state.req_params)}>
          {failedToLoadScreen()}
        </TouchableOpacity>
      </ScrollView>
    );
  }

  renderStages() {
    let { init, req, com } = this.state;
    if (init || req) {
      return this.renderLoading();
    } else if (com) {
      return this.renderContent();
    } else {
      return this.renderError();
    }
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {this.renderTabs()}
        {this.renderStages()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    elevation: 2,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 1
    },
    backgroundColor: Colors.TEXT_BLACK
  },
  itemWrapper: {
    padding: px(3)
  },
  horizontalItemWrapper: {
    color: Colors.TEXT_BLACK
  },
  scrollViewStyle: {
    backgroundColor: Colors.BACKGROUND_LIGHT_GREY
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: Colors.TEXT_BLACK
  },
  filterButton: {
    fontSize: 10,
    color: Colors.TEXT_BLACK
  },
  floatView: {
    position: 'absolute',
    bottom: 0.045 * ScreenHeight,
    right: 0.2 * ScreenWidth,
    backgroundColor: Colors.WHITE,
    elevation: 1
  },
  floatTitle: {
    color: Colors.SECONDARY_BLUE,
    padding: 10
  }
});
