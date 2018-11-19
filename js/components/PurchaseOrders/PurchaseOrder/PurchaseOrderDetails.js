import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl
} from 'react-native';
import Text from '../../Text';
import * as Constants from '../../../commons/Constants';
import { Badge } from '../../Elements';
import { Spinner } from 'native-base';
import { Card, CardContent } from '../../CardThreeLevel';
import Moment from 'moment';
import Progress from 'react-native-progress/Circle';
import { failedToLoadScreen } from '../../Elements';
import * as Colors from '../../../commons/colors';
import Mixpanel from 'react-native-mixpanel';

let ScreenWidth = Dimensions.get('window').width;

export default class PurchaseOrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      req: false,
      ref: false,
      com: false,
      err: false,
      laz: false,
      details: null,
      imgWidth: 100,
      textSize: 13
    };
  }

  componentDidMount() {
    this.setState({ init: false, req: true });
    this.loadData();
    Mixpanel.track('Visited Purchase Orders Details Show Page');
  }

  loadData() {
    let { fetchPurchaseOrder, showAlert, purchase_order_id } = this.props;
    fetchPurchaseOrder(purchase_order_id).then(data => {
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
          details: data,
          laz: false
        });
      }
    });
  }

  _onRefresh() {
    this.setState({ req: true, ref: false });
    this.loadData();
  }

  renderProperty(key, value, unit = '') {
    if (!!key && (value === 0 || !!value)) {
      return (
        <View style={styles.propertyView}>
          <View style={styles.keyView}>
            <Text style={styles.keyText}>{key}</Text>
          </View>
          <View style={styles.valueView}>
            <Text style={styles.valueText} numberOfLines={10}>
              {value} {unit ? unit : ''}
            </Text>
          </View>
        </View>
      );
    }
  }

  getCircleInnerText(time) {
    return (
      <Text style={{ textAlign: 'center' }}>
        <Text style={{ fontSize: this.state.textSize }}>{time}</Text>
        <Text style={{ fontSize: 8 }}>{'\nHOURS LEFT'}</Text>
      </Text>
    );
  }

  getPurchaseOrderStatus(status) {
    if (status === 'pending') {
      return 'warning';
    } else if (status === 'cancelled') {
      return 'danger';
    } else if (status === 'completed') {
      return 'success';
    } else {
      return 'info';
    }
  }

  getBadgeMessage(status) {
    if (!!status) {
      return status.toUpperCase();
    }
  }

  normalize(text) {
    output = '';
    parts = text.split('_');
    output += parts[0].toUpperCase();
    for (var i = 1; i < parts.length; i++) {
      output += ' ' + parts[i].toUpperCase();
    }
    return output;
  }

  renderBadge(status) {
    if (!!status) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3,
            paddingLeft: 0
          }}
        >
          <Badge
            status={this.getPurchaseOrderStatus(status)}
            message={this.getBadgeMessage(status)}
            fontSize={0.03 * ScreenWidth}
          />
        </View>
      );
    }
  }

  setWidth(event) {
    const { width } = event.nativeEvent.layout;
    this.setState({
      textSize: 0.07 * width
    });
  }

  renderTimeRemaining() {
    let { created_at } = this.state.details;
    let { items } = this.props;
    showCircle =
      items.bizongo_po_items[0] &&
      items.bizongo_po_items[0].status == 'pending';
    time_remaining = Moment(new Date()).diff(Moment(created_at), 'hours');
    time_remaining = time_remaining > 48 ? 0 : 48 - time_remaining;
    percent = time_remaining / 48;
    color = 'rgb(84, 189, 72)';
    if (time_remaining <= 24) {
      color = 'rgb(217, 83, 79)';
    }
    return (
      <View style={styles.timeRemainingView}>
        {showCircle ? (
          <View
            style={{
              padding: 0,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Progress
              size={this.state.imgWidth}
              thickness={10}
              progress={percent}
              showsText={true}
              formatText={progress => {
                return this.getCircleInnerText(time_remaining);
              }}
              borderWidth={0}
              textStyle={{
                color: 'rgb(52, 73, 94)',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
              color={color}
              direction={'counter-clockwise'}
              unfilledColor={'#C4C4C4'}
            />
          </View>
        ) : (
          <Text
            style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}
          >
            Purchase Order Status:
          </Text>
        )}
        <View
          style={{
            flexDirection: 'column',
            padding: 0.001 * this.state.imgWidth,
            marginTop: 10,
            paddingLeft: 0,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {this.renderBadge(this.state.details.status)}
        </View>
      </View>
    );
  }

  renderStatus() {
    return this.renderTimeRemaining();
  }

  renderContent() {
    let { created_at, delivery_terms, payment_terms, id } = this.state.details;
    let { bizongo_po_items } = this.props.items;
    credit_period = bizongo_po_items[0].supplier_credit_period;
    credit_from = bizongo_po_items[0].credit_period_applied_on;
    date = Moment(created_at).format('DD MMM, YYYY');
    return (
      <View onLayout={event => this.setWidth(event)}>
        <View style={styles.timeGraphRow}>
          <View style={styles.contentView}>
            {this.renderProperty('PO ID', id)}
            {this.renderProperty('PO DATE', date)}
            {this.renderProperty('CREDIT PERIOD', credit_period)}
            {this.renderProperty('CREDIT FROM', credit_from.toUpperCase())}
          </View>
          <View style={styles.contentView}>{this.renderStatus()}</View>
        </View>
        {this.renderProperty('DELIVERY TERMS', delivery_terms)}
        {this.renderProperty('PAYMENT TERMS', payment_terms)}
      </View>
    );
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
  timeGraphRow: {
    flex: 2,
    flexDirection: 'row'
  },
  contentView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%'
  },
  propertyView: {
    flexDirection: 'column',
    padding: 3,
    paddingBottom: 15
  },
  keyView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 5
  },
  valueView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  keyText: {
    color: Colors.TEXT_BLACK,
    fontWeight: 'bold',
    fontSize: 14
  },
  valueText: {
    color: Colors.TEXT_BLACK,
    fontSize: 14
  },
  timeRemainingView: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 3
  }
});

const mainCard = {
  card: {
    margin: 10,
    marginTop: 20,
    borderWidth: 0
  },
  cardContent: {
    backgroundColor: Colors.BACKGROUND_GREY,
    borderWidth: 0
  }
};

const buttonStyles = StyleSheet.create({
  loginButtonBackground: {
    flex: 1,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    height: 40
  },
  loginButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: Constants.MAIN_FONT
  },
  rejectButtonLabel: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: Constants.MAIN_FONT
  }
});
