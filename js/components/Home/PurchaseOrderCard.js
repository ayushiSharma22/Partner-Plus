import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Text from '../Text';
import { px } from '../../commons/helper';
import * as Colors from '../../commons/colors';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(icomoonConfig);

let ScreenWidth = Dimensions.get('window').width;
let svgWidth = 0.15 * ScreenWidth;
let svgSmallWidth = 0.1 * ScreenWidth;

export default class PurchaseOrderCard extends Component {
  constructor(props) {
    super(props);
  }

  renderCard() {
    let { openPurchaseOrdersCount } = this.props;
    return (
      <View style={styles.welcomeFlex}>
        <View style={styles.imageCropWrapper}>
          <Icon
            size={svgSmallWidth}
            color="#00AFD7"
            name="outline-file_copy-24px_active"
            style={styles.imageCrop}
          />
        </View>
        <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
          <Text>
            <Text style={{ color: '#00AFD7', fontWeight: 'bold' }}>
              {openPurchaseOrdersCount}
            </Text>{' '}
            PO{openPurchaseOrdersCount > 1 ? "\'s" : ' '}
            <Text style={{ color: '#00AFD7', fontWeight: 'bold' }}>
              {' '}
              Awaiting Acceptance
            </Text>
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Icon
            size={svgSmallWidth}
            color={openPurchaseOrdersCount > 0 ? '#00AFD7' : '#E84855'}
            name="Shape"
          />
        </View>
      </View>
    );
  }

  render() {
    let { openPurchaseOrdersCount } = this.props;
    if (openPurchaseOrdersCount > 0) {
      return (
        <TouchableOpacity
          style={styles.dashboardCardView}
          onPress={() => this.props.openPurchaseOrders()}
        >
          {this.renderCard()}
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  expiringRed: {
    color: Colors.RED,
    fontSize: 16,
    fontWeight: 'bold'
  },
  expiringText: {
    color: Colors.TEXT_BLACK,
    fontSize: 16
  },
  imageCrop: {
    opacity: 0.25
  },
  imageCropWrapper: {
    alignItems: 'center',
    padding: 0.025 * ScreenWidth
  },
  welcomeFlex: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingRight: px(1),
    paddingTop: px(1),
    paddingBottom: px(1),
    paddingLeft: 0,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    margin: 5,
    marginBottom: 2,
    elevation: 2.5,
    marginBottom: 20,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 0.3
    }
  }
});
