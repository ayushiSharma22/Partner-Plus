import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions
} from 'react-native';
import Text from '../../Text';
import { Spinner } from 'native-base';
import { Button } from 'react-native-elements';
import PurchaseOrderDetails from './PurchaseOrderDetails';
import PurchaseOrderItems from './PurchaseOrderItems';
import DispatchPlans from './DispatchPlans';
import { failedToLoadScreen } from '../../Elements';
import Tab from './showTab';
import * as Colors from '../../../commons/colors';
import Mixpanel from 'react-native-mixpanel';
import Modal from 'react-native-modal';
// import RNFS from 'react-native-fs';

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

let tabs = [
  {
    name: 'details',
    label: 'PO DETAILS'
  },
  {
    name: 'products',
    label: 'PRODUCTS'
  },
  {
    name: 'dispatch-plan',
    label: 'DISPATCH PLAN'
  }
];
export default class PurchaseOrder extends Component {
  constructor(props) {
    super(props);
    let { tabName } = this.props;
    this.state = {
      init: true,
      req: false,
      com: false,
      err: false,
      ref: false,
      data: null,
      items: null,
      dispatchPlans: null,
      tabName: tabName || tabs[1].name,
      po_id: null,
      isModalVisible: false
    };
  }

  componentDidMount() {
    this.setState({ init: false, req: true, com: false });
    this.loadData();
  }

  loadData() {
    let {
      fetchPurchaseOrderItems,
      purchaseOrderState,
      purchase_order_id,
      showAlert
    } = this.props;
    options = {
      page: 1,
      per_page: 10
    };
    if (this.state.ref) {
      fetchPurchaseOrderItems(options, purchase_order_id).then(data => {
        if (!!data.error) {
          showAlert('info', 'Error', data.error);
        } else {
          this.setState({ ref: false });
          this.loadData();
        }
      });
    }
    if (!this.state.ref) {
      purchaseOrderDetails =
        purchaseOrderState.purchaseOrderList[purchase_order_id];
      if (!!purchaseOrderDetails.dispatchPlans) {
        this.setState({
          com: true,
          err: false,
          req: false,
          po_id: purchase_order_id,
          data: purchaseOrderDetails.data,
          items: purchaseOrderDetails.items.data,
          dispatchPlans: purchaseOrderDetails.dispatchPlans.data
        });
      } else if (!!purchaseOrderDetails.data) {
        this.setState({
          com: true,
          err: true,
          req: false,
          po_id: purchase_order_id,
          data: purchaseOrderDetails.data,
          items: purchaseOrderDetails.items.data
        });
      } else if (!!purchaseOrderDetails.items) {
        this.setState({
          com: true,
          err: false,
          req: false,
          po_id: purchase_order_id,
          items: purchaseOrderDetails.items.data
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    let { purchase_order_id } = this.props;

    details = nextProps.purchaseOrderState.purchaseOrderList[purchase_order_id];
    this.setState({
      com: true,
      data: details.data,
      items: details.items ? details.items.data : null,
      dispatchPlans: details.dispatchPlans ? details.dispatchPlans.data : null
    });
  }

  rejectPurchaseOrder() {
    let {
      rejectPurchaseOrder,
      showAlert,
      navigator,
      purchase_order_id
    } = this.props;
    let { items } = this.state;
    po_item_ids = items.bizongo_po_items.map(val => {
      return { id: val.id, status: 'rejected' };
    });
    data = {
      bizongo_po_items: po_item_ids
    };
    rejectPurchaseOrder(data, purchase_order_id).then(data => {
      if (!!data.error) {
        this.setState({ progress: false });
        showAlert('info', 'Error', data.error);
      } else {
        Mixpanel.track('Purchase Order Rejected');
        navigator.pop();
      }
    });
  }

  acceptPurchaseOrder() {
    this.setState({ isModalVisible: true });
  }

  acceptPurchaseOrderWithTerms() {
    this.setState({ isModalVisible: false });
    let {
      acceptPurchaseOrder,
      showAlert,
      navigator,
      purchase_order_id
    } = this.props;
    let { items } = this.state;
    po_item_ids = items.bizongo_po_items.map(val => {
      return { id: val.id, status: 'accepted' };
    });
    data = {
      bizongo_po_items: po_item_ids
    };
    acceptPurchaseOrder(data, purchase_order_id).then(data => {
      if (!!data.error) {
        this.setState({ progress: false });
        showAlert('info', 'Error', data.error);
      } else {
        Mixpanel.track('Purchase Order Accepted');
        this.setState({ isModalVisible: false, ref: true });
        this.loadData();
      }
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  renderButton() {
    let { items } = this.state;
    if (
      items &&
      items.bizongo_po_items[0] &&
      items.bizongo_po_items[0].status === 'pending'
    ) {
      show = true;
    } else {
      show = false;
    }
    component = null;
    component = (
      <View style={styles.buttonBar}>
        {show ? (
          <View style={styles.buttonBar}>
            <View style={[styles.buttonViewStyle, styles.rejectButtonStyle]}>
              <Button
                buttonStyle={[styles.buttonStyle, styles.rejectButtonStyle]}
                textStyle={styles.buttonTextStyle}
                title={'REJECT'}
                onPress={() => this.rejectPurchaseOrder()}
              />
            </View>
            <View style={[styles.buttonViewStyle, styles.acceptButtonStyle]}>
              <Button
                buttonStyle={[styles.buttonStyle, styles.acceptButtonStyle]}
                textStyle={styles.buttonTextStyle}
                title={'ACCEPT'}
                onPress={() => this.acceptPurchaseOrder()}
              />
            </View>
          </View>
        ) : (
          <Text />
        )}
      </View>
    );
    return component;
  }

  changeTab(index) {
    if (!this.state.ref && !this.state.req) {
      this.setState({
        req: true,
        com: false,
        err: false,
        tabName: tabs[index].name
      });
      this.loadData();
    }
  }

  makeItems = tabs => {
    const items = [];
    active_tab = this.state.tabName;
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

  renderData() {
    let { tabName, data, items, dispatchPlans } = this.state;
    let {
      navigator,
      fetchPurchaseOrder,
      fetchPurchaseOrderItems,
      fetchPurchaseOrderDispatchPlans,
      acceptPurchaseOrder,
      rejectPurchaseOrder,
      purchase_order_id,
      purchaseOrderState,
      showAlert
    } = this.props;
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.BACKGROUND_LIGHT_GREY }}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="always"
      >
        {tabName === 'details' ? (
          <PurchaseOrderDetails
            fetchPurchaseOrder={fetchPurchaseOrder}
            details={data}
            items={items}
            showAlert={showAlert}
            purchaseOrderState={purchaseOrderState}
            purchase_order_id={purchase_order_id}
          />
        ) : tabName === 'products' ? (
          <PurchaseOrderItems
            purchase_order_id={purchase_order_id}
            fetchPurchaseOrderItems={fetchPurchaseOrderItems}
            showAlert={showAlert}
          />
        ) : tabName === 'dispatch-plan' ? (
          <DispatchPlans
            {...this.props}
            plans={dispatchPlans}
            items={items}
            purchase_order_id={purchase_order_id}
          />
        ) : (
          <Text />
        )}
      </ScrollView>
    );
  }

  setWidthModal(event) {
    const { width } = event.nativeEvent.layout;
    this.setState({
      modalWidth: width
    });
  }

  cancelAcceptPurchaseOrder() {
    this.setState({ isModalVisible: false });
  }

  renderModal() {
    return (
      <Modal
        isVisible={this.state.isModalVisible}
        onSwipe={() => this.setState({ isModalVisible: false })}
        swipeDirection="down"
        scrollTo={this.handleScrollTo}
        scrollOffset={this.state.scrollOffset}
        scrollOffsetMax={300}
        style={styles.bottomModal}
        onLayout={event => this.setWidthModal(event)}
      >
        <View style={styles.scrollableModal}>
          <ScrollView
            ref={ref => (this.scrollViewRef = ref)}
            onScroll={this.handleOnScroll}
            scrollEventThrottle={16}
          >
            <View style={styles.scrollableModalContent}>
              <View style={styles.modalContentView}>
                <Text style={styles.contentText}>
                  By Accepting the Purchase order you are agreeing to the
                  following things:
                </Text>
                <View
                  style={{
                    flexDirection: 'column',
                    marginBottom: 20
                  }}
                >
                  <Text style={{ color: '#54575A' }}>
                    • Terms & Conditions, Privacy Policy and Seller Agreement
                  </Text>
                  <Text style={{ color: '#54575A' }}>• Timelines</Text>
                  <Text style={{ color: '#54575A' }}>• Prices</Text>
                </View>
              </View>
              <View style={styles.modalButtonViewStyle}>
                <View
                  style={[
                    styles.modalButtonViewStyle,
                    styles.cancelButtonStyle,
                    { width: this.state.modalWidth / 2 - 1 }
                  ]}
                >
                  <Button
                    buttonStyle={[
                      styles.modalButtonStyle,
                      styles.cancelButtonStyle
                    ]}
                    textStyle={styles.buttonTextStyle}
                    title={'CANCEL'}
                    onPress={() => this.cancelAcceptPurchaseOrder()}
                  />
                </View>
                <View
                  style={[
                    styles.modalButtonViewStyle,
                    styles.submitButtonStyle,
                    { width: this.state.modalWidth / 2 - 1 }
                  ]}
                >
                  <Button
                    buttonStyle={[
                      styles.modalButtonStyle,
                      styles.submitButtonStyle
                    ]}
                    textStyle={styles.buttonTextStyle}
                    title={'SUBMIT'}
                    onPress={() => this.acceptPurchaseOrderWithTerms()}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }

  renderContent() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.BACKGROUND_LIGHT_GREY }}>
        {this.renderModal()}
        {this.renderTabs()}
        {this.renderData()}
        {this.renderButton()}
      </View>
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
        <TouchableOpacity onPress={this.loadData.bind(this)}>
          {failedToLoadScreen()}
        </TouchableOpacity>
      </ScrollView>
    );
  }

  render() {
    let { init, req, com } = this.state;
    Mixpanel.track('Visited Purchase Order Show Page');
    if (init || req) {
      return this.renderLoading();
    } else if (com) {
      return this.renderContent();
    } else {
      return this.renderError();
    }
  }
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    backgroundColor: Colors.WHITE
  },
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
  buttonBar: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 0.07 * ScreenHeight,
    width: ScreenWidth
  },
  buttonViewStyle: {
    width: ScreenWidth / 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    borderRadius: 0,
    height: 0.07 * ScreenHeight
  },
  buttonTextStyle: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 0.02 * ScreenHeight
  },
  rejectButtonStyle: {
    backgroundColor: Colors.RED,
    padding: 10
  },
  acceptButtonStyle: {
    backgroundColor: Colors.GREEN
  },
  downloadButtonStyle: {
    width: ScreenWidth,
    backgroundColor: Colors.PRIMARY_BLUE
  },
  cancelButtonStyle: {
    backgroundColor: Colors.PRIMARY_GREY
  },
  submitButtonStyle: {
    backgroundColor: Colors.PRIMARY_BLUE
  },
  scrollableModal: {
    backgroundColor: Colors.WHITE
  },
  modalContentView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10
  },
  modalButtonStyle: {
    margin: 0
  },
  contentText: {
    color: Colors.SECONDARY_BLUE,
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalButtonViewStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
