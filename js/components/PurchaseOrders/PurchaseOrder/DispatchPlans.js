import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Spinner } from 'native-base';
import PurchaseOrderDispatchPlanCard from './PurchaseOrderDispatchPlanCard';
import { failedToLoadScreen } from '../../Elements';
import { Card, CardContent } from '../../CardThreeLevel';
import * as Colors from '../../../commons/colors';
import Moment from 'moment';
import Mixpanel from 'react-native-mixpanel';

export default class PurchaseOrderDispatchPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      req: false,
      ref: false,
      com: false,
      err: false,
      laz: false,
      plans: null
    };
  }

  componentDidMount() {
    this.setState({ init: false, req: true });
    this.loadData();
    Mixpanel.track('Visited Purchase Orders Dispatch Plan Show Page');
  }

  loadData() {
    let {
      fetchPurchaseOrderDispatchPlans,
      showAlert,
      purchase_order_id
    } = this.props;
    fetchPurchaseOrderDispatchPlans(purchase_order_id).then(data => {
      let { init, req } = this.state;
      if (!!data.error) {
        showAlert('info', 'Error', data.error);
        if (init || req) {
          this.setState({ err: true });
        }
      } else {
        this.setState({
          err: false,
          com: true,
          req: false,
          plans: data,
          laz: false
        });
      }
    });
  }

  _onRefresh() {
    this.setState({ req: true, ref: false });
    this.loadData();
  }

  openPODetails(details) {
    let {
      navigator,
      items,
      rejectPurchaseOrder,
      showAlert,
      purchase_order_id
    } = this.props;
    date = Moment(details.dispatch_date).format('DD MMM, YYYY');
    navigator.push({
      id: 'purchase_order_dispatch_plan',
      dispatch_date: date,
      dispatch_plan_details: details,
      po_items: items,
      rejectPurchaseOrder: rejectPurchaseOrder,
      showAlert: showAlert,
      navigator: navigator,
      purchase_order_id: purchase_order_id
    });
  }

  renderContent() {
    let { dispatch_plans } = this.props.plans;
    component = [];
    for (var i = 0; i < dispatch_plans.length; i++) {
      component.push(
        <View key={i}>
          <PurchaseOrderDispatchPlanCard
            index={i + 1}
            item={dispatch_plans[i]}
            details={dispatch_plans[i].dispatch_plan_item_relations[0]}
            po_item={this.props.items}
            openPODetails={item => this.openPODetails(item)}
            {...this.props}
          />
        </View>
      );
    }
    return <View style={styles.contentView}>{component}</View>;
  }

  renderView() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.ref}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="always"
      >
        <Card styles={mainCard}>
          <CardContent styles={mainCard}>{this.renderContent()}</CardContent>
        </Card>
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

  render() {
    let { init, req, com } = this.state;
    if (init || req) {
      return this.renderLoading();
    } else if (com) {
      return this.renderView();
    } else {
      return this.renderError();
    }
  }
}

const styles = StyleSheet.create({
  contentView: {
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingBottom: 20
  }
});

const mainCard = {
  card: {
    marginTop: 20,
    padding: 0
  },
  cardContent: {
    backgroundColor: Colors.BACKGROUND_LIGHT_GREY,
    borderWidth: 0,
    padding: 0
  }
};
