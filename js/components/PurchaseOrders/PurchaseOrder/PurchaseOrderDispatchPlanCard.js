import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Text from '../../Text';
import * as Colors from '../../../commons/colors';
import { px } from '../../../commons/helper';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../../selection.json';
import { Icon } from 'native-base';
const ExtendedIcon = createIconSetFromIcoMoon(icomoonConfig);
import Moment from 'moment';

let ScreenWidth = Dimensions.get('window').width;
let svgWidth = 0.1 * ScreenWidth;

export default class PurchaseOrderDispatchPlanCard extends Component {
  constructor(props) {
    super(props);
  }

  renderMainView() {
    let { destination_address, dispatch_date } = this.props.item;
    dispatch_date = Moment(dispatch_date).format('DD MMM, YYYY');
    let iconName = 'ios-arrow-forward';
    return (
      <View style={styles.cardView}>
        <View style={styles.cardDataStyle}>
          <Text style={styles.heading}>
            Dispatch Date -{' '}
            <Text style={styles.dispatchDateStyle}>{dispatch_date}</Text>
          </Text>
          <View style={styles.footerLocationComponentView}>
            <ExtendedIcon
              size={svgWidth}
              color={Colors.TEXT_BLACK}
              name="Truckq"
            />
            <Text style={styles.footerValueText} numberOfLines={4}>
              {destination_address.city.toUpperCase()} -{' '}
              {destination_address.pincode}
            </Text>
          </View>
        </View>
        <View style={styles.cardArrowStyle}>
          <Icon name={iconName} style={styles.arrowStyle} />
        </View>
      </View>
    );
  }

  render() {
    let { item } = this.props;
    if (item.status === 'open') {
      color = Colors.YELLOW;
    } else if (item.status === 'done') {
      color = Colors.GREEN;
    } else {
      color = Colors.RED;
    }
    cardSideColor = { borderLeftColor: color };
    return (
      <TouchableOpacity
        style={[styles.purchaseOrderCardView, cardSideColor]}
        onPress={() => this.props.openPODetails(item)}
      >
        {this.renderMainView()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  purchaseOrderCardView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: px(2),
    paddingBottom: 0,
    paddingTop: 0,
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
    },
    borderLeftWidth: 3
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardDataStyle: {
    flex: 3,
    marginTop: 10
  },
  cardArrowStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 30
  },
  headerView: {
    paddingLeft: 5
  },
  headerText: {
    fontSize: 14,
    fontWeight: '700'
  },
  contentView: {
    backgroundColor: Colors.WHITE,
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 10
  },
  propertyView: {
    flex: 1,
    flexDirection: 'row',
    padding: 3,
    paddingBottom: 10
  },
  keyView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
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
  heading: {
    fontSize: 15,
    paddingLeft: 0.03 * ScreenWidth,
    color: Colors.TEXT_BLACK
  },
  dispatchDateStyle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  specificationsHeaderWrapper: {
    padding: 5,
    marginTop: 10,
    marginBottom: 5
  },
  specificationsHeader: {
    color: Colors.PRIMARY_BLUE,
    fontWeight: '700'
  },
  mainCardStyle: {
    backgroundColor: Colors.WHITE
  },
  arrowStyle: {
    backgroundColor: Colors.PRIMARY_BLUE,
    borderRadius: 50,
    width: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.WHITE
  },
  footerLocationComponentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  footerValueText: {
    fontSize: 12,
    color: Colors.TEXT_BLACK
  }
});
