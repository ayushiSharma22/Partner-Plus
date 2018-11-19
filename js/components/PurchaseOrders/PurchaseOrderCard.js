import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Text from '../Text';
import Moment from 'moment';
import { px } from '../../commons/helper';
import { Badge } from '../Elements';
import * as Colors from '../../commons/colors';
import NumberFormat from 'react-number-format';

let ScreenWidth = Dimensions.get('window').width;

export default class PurchaseOrderCard extends Component {
  constructor(props) {
    super(props);
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

  getPurchaseOrderSettledStatus() {
    let { settled } = this.props.purchase_order;
    if (settled) {
      return 'success';
    } else {
      return 'warning';
    }
  }

  renderMainView() {
    let {
      po_number,
      created_at,
      status,
      total_amount,
      settled,
      amount_paid
    } = this.props.purchase_order;
    date = Moment(created_at).format('DD MMM, YYYY');
    message = settled ? 'SETTLED' : 'AMOUNT PAID: ' + amount_paid.toFixed(2);
    return (
      <View style={styles.showDataView}>
        <View style={styles.dataRowView}>
          <View style={styles.dataLeftView}>
            <Text style={styles.purchaseOrderNumber}>{po_number}</Text>
          </View>
          <View style={styles.dataRightView}>
            {status === 'pending' ? (
              <Text style={styles.purchaseOrderDate}>
                Date - <Text style={styles.fontBold}>{date}</Text>
              </Text>
            ) : (
              <Text />
            )}
          </View>
        </View>
        <View style={styles.dataRowView}>
          <View style={styles.dataLeftView}>
            <Text style={styles.purchaseOrderAmount}>
              Amount:{' '}
              <Text style={styles.fontBold}>
                <NumberFormat
                  value={total_amount}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'₹ '}
                  decimalScale={2}
                  renderText={value => <Text>{value}</Text>}
                />
              </Text>
            </Text>
          </View>
          <View style={styles.dataRightView}>
            <Badge
              style={styles.purchaseOrderSettledBadge}
              message={message}
              status={this.getPurchaseOrderSettledStatus()}
            />
          </View>
        </View>
      </View>
    );
  }

  render() {
    let { id, po_number } = this.props.purchase_order;
    return (
      <TouchableOpacity
        style={styles.purchaseOrderCardView}
        onPress={() => this.props.openPurchaseOrder(id, po_number)}
      >
        {this.renderMainView()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  purchaseOrderCardView: {
    padding: px(1),
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    margin: 5,
    elevation: 1,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: Colors.TEXT_BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 0.3
    }
  },
  showDataView: {
    padding: 0.02 * ScreenWidth
  },
  dataRowView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    marginBottom: 10
  },
  dataLeftView: {
    flex: 1,
    alignItems: 'flex-start'
  },
  dataRightView: {
    flex: 1,
    alignItems: 'flex-end'
  },
  purchaseOrderNumber: {
    fontFamily: '',
    fontSize: 16,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: Colors.TEXT_BLACK
  },
  purchaseOrderDate: {
    fontFamily: '',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: 12
  },
  purchaseOrderAmount: {
    fontSize: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: Colors.TEXT_BLACK
  },
  purchaseOrderSettledBadge: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  fontBold: {
    fontFamily: '',
    fontWeight: 'bold',
    fontSize: 12
  }
});
