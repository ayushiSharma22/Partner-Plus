import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Text from '../Text';
import { px, py, em } from '../../commons/helper';
import * as Colors from '../../commons/colors';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(icomoonConfig);

let ScreenWidth = Dimensions.get('window').width;
let svgWidth = 0.15 * ScreenWidth;
let svgSmallWidth = 0.1 * ScreenWidth;

export default class ExpiringInquiryCard extends Component {
  constructor(props) {
    super(props);
  }

  renderCard() {
    let { expiringInquiry, totalInquiry } = this.props;
    count = expiringInquiry.length;
    return (
      <View style={styles.welcomeFlex}>
        <View style={styles.imageCropWrapper}>
          <Icon
            size={svgWidth}
            color="#00AFD7"
            name="target-outlines1"
            style={styles.imageCrop}
          />
        </View>
        {count > 0 ? (
          <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.expiringRed}>{count} </Text>
            <Text style={styles.expiringText}>
              out of{' '}
              <Text style={{ color: '#34495E', fontWeight: 'bold' }}>
                {totalInquiry}
              </Text>{' '}
              {totalInquiry == 1 ? 'Quote' : 'Quotes'}{' '}
            </Text>
            <Text style={styles.expiringRed}>Expiring</Text>
          </View>
        ) : (
          <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
            <Text>
              <Text style={{ color: '#00AFD7', fontWeight: 'bold' }}>
                {totalInquiry} Pending
              </Text>{' '}
              Request for {totalInquiry == 1 ? 'Quote' : 'Quotes'}
            </Text>
          </View>
        )}
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
            color={count > 0 ? '#E84855' : '#00AFD7'}
            name="Shape"
          />
        </View>
      </View>
    );
  }

  render() {
    let { totalInquiry } = this.props;
    if (totalInquiry > 0) {
      return (
        <TouchableOpacity
          style={styles.dashboardCardView}
          onPress={() => this.props.openRFQ('sortByTimeRemaining')}
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
    alignItems: 'center'
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
