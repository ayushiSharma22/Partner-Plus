import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';
import Text from '../../../Text';
import * as Colors from '../../../../commons/colors';
import TimelineCard from './TimelineCard';
import DispatchPlanItemCard from './DispatchPlanItemCard';
import Modal from 'react-native-modal';

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;
import Mixpanel from 'react-native-mixpanel';

import { Spinner } from 'native-base';

export default class PurchaseOrderDispatchPlanDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      req: false,
      com: false,
      err: false,
      data: null,
      items: null,
      isModalVisible: false
    };
  }

  componentDidMount() {
    this.setState({ init: false, req: true });
    this.loadData();
    Mixpanel.track('Visited Dispatch Plan Show Page');
  }

  loadData() {
    let { plan_details } = this.props;
    this.setState({ com: true, err: false, req: false, data: plan_details });
  }

  renderTimeline() {
    let { timelines, destination_address, status } = this.state.data;
    return (
      <View style={styles.contentView}>
        <TimelineCard
          timelines={timelines}
          location={destination_address.city}
          pincode={destination_address.pincode}
          status={status}
        />
      </View>
    );
  }

  renderItemsContent() {
    let { dispatch_plan_item_relations } = this.state.data;
    component = [];
    for (var i = 0; i < dispatch_plan_item_relations.length; i++) {
      let plan = dispatch_plan_item_relations[i];
      component.push(
        <View key={i}>
          <DispatchPlanItemCard index={i + 1} item={plan} />
        </View>
      );
    }
    return component;
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

  rejectPurchaseOrder() {
    let {
      rejectPurchaseOrder,
      showAlert,
      navigator,
      purchase_order_id,
      po_items
    } = this.props;
    po_item_ids = po_items.bizongo_po_items.map(val => {
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
      purchase_order_id,
      items
    } = this.props;
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

  renderButton() {
    let { bizongo_po_items } = this.props.po_items;
    if (bizongo_po_items[0] && bizongo_po_items[0].status === 'pending') {
      show = true;
    } else {
      show = false;
    }
    component = null;
    show ? (
      (component = (
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
      ))
    ) : (
      <Text />
    );
    return component;
  }

  renderContent() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <ScrollView
          style={{ flex: 1, backgroundColor: '#FFFFFF' }}
          contentContainerStyle={{ paddingBottom: 0.1 * ScreenHeight }}
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="always"
        >
          <View style={{ padding: 10 }}>{this.renderTimeline()}</View>
          <View style={{ padding: 5 }}>{this.renderItemsContent()}</View>
        </ScrollView>
        {this.renderModal()}
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
  headerView: {
    paddingLeft: 5
  },
  labelText: {
    fontSize: 0.03 * ScreenWidth,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: Colors.TEXT_BLACK
  },
  buttonBar: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 0.07 * ScreenHeight,
    width: ScreenWidth
  },
  inputView: {
    backgroundColor: Colors.BACKGROUND_GREY,
    borderRadius: 3,
    margin: 10,
    marginBottom: 0,
    padding: 15,
    paddingBottom: 20
  },
  headerText: {
    color: 'rgb(52, 73, 94)',
    fontSize: 18
  },
  contentView: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginBottom: 10,
    backgroundColor: Colors.BACKGROUND_GREY
  },
  propertyView: {
    flex: 1,
    flexDirection: 'row',
    padding: 3
  },
  keyView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  valueView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  keyText: {
    color: '#999999',
    fontWeight: 'bold',
    fontSize: 15
  },
  valueText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  noteTextStyle: {
    color: 'red',
    fontSize: 13
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
    height: 0.07 * ScreenHeight,
    width: ScreenWidth / 2
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
  },
  cancelButtonStyle: {
    backgroundColor: Colors.PRIMARY_GREY
  },
  submitButtonStyle: {
    backgroundColor: Colors.PRIMARY_BLUE
  }
});
