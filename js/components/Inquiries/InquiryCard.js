import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Text from '../Text';
import { px } from '../../commons/helper';
import * as Colors from '../../commons/colors';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(icomoonConfig);

let ScreenWidth = Dimensions.get('window').width;
let svgWidth = 0.1 * ScreenWidth;

export default class InquiryCard extends Component {
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

  renderHeader() {
    let { product } = this.props.inquiry;
    return (
      <View style={styles.headerView}>
        <View style={{ padding: 7, flex: 1 }}>
          <Text style={styles.productNameText} numberOfLines={2}>
            {product.name.toUpperCase()}
          </Text>
        </View>
      </View>
    );
  }

  renderFooter() {
    let {
      time_remaining,
      status,
      price_per_unit,
      buyer_address,
      quantity,
      product,
      delivery_charges_per_unit,
      price_type
    } = this.props.inquiry;
    let { gst_percentage } = this.props.inquiry.product;
    let { name } = this.props;
    if (time_remaining !== 0 && !time_remaining) {
      return null;
    }
    time_component = null;
    if (price_type == 'ex_factory') {
      delivery_charges_per_unit = 0;
    }
    if (name === 'REQUEST FOR QUOTES') {
      time_component = (
        <View style={styles.footerTimeComponentView}>
          <Icon
            size={svgWidth}
            color={time_remaining > 24 ? '#54BD48' : '#E84855'}
            name="baseline-timer-24px"
          />
          <Text style={[styles.footerValueText, styles.fontBold]}>
            {Math.round(time_remaining) + ' Hours'}
          </Text>
        </View>
      );
    } else if (name === 'QUOTES GIVEN' || name === 'QUOTES ACCEPTED') {
      final_price = (
        (price_per_unit + delivery_charges_per_unit) *
        quantity *
        (gst_percentage / 100 + 1)
      ).toFixed(2);
      time_component = (
        <View style={styles.footerTimeComponentView}>
          <Text style={[styles.footerValueText, styles.fontBold]}>
            &#8377; {final_price}
          </Text>
        </View>
      );
    } else {
      time_component = (
        <View style={styles.footerTimeComponentView}>
          <Text style={styles.footerValueText}>&#8377; &nbsp; - &nbsp;</Text>
        </View>
      );
    }

    location_component = (
      <View style={styles.footerLocationComponentView}>
        <Icon size={svgWidth} color="#54575A" name="Truckq" />
        <Text style={styles.footerValueText} numberOfLines={4}>
          {buyer_address.location.toUpperCase()}
        </Text>
      </View>
    );

    quantity_component = (
      <View style={styles.footerQuantityComponentView}>
        <Icon size={svgWidth} color="#54575A" name="boxes" />
        <Text style={styles.footerValueText}>
          {quantity} {product.unit}
        </Text>
      </View>
    );

    return (
      <View style={styles.footerView}>
        {location_component}
        {quantity_component}
        {time_component}
      </View>
    );
  }

  render() {
    borderColorStatus = {};
    let {
      time_remaining,
      status,
      accepted_on,
      price_per_unit
    } = this.props.inquiry;
    let { name } = this.props;
    if (name === 'REQUEST FOR QUOTES') {
      activeTabColor = styles.borderBlue;
    } else if (name === 'QUOTES GIVEN') {
      activeTabColor = styles.borderYellow;
    } else if (name === 'QUOTES ACCEPTED') {
      activeTabColor = styles.borderGreen;
    } else if (name === 'QUOTES LOST') {
      activeTabColor = styles.borderRed;
    } else {
      activeTabColor = styles.borderYellow;
    }
    return (
      <TouchableOpacity
        style={[styles.inquiryCardView, activeTabColor]}
        onPress={() =>
          this.props.openInquiry(this.props.inquiry.id, this.props.name)
        }
      >
        {this.renderHeader()}
        {this.renderFooter()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  inquiryCardView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
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
    },
    borderLeftWidth: 3
  },
  borderRed: {
    borderLeftColor: Colors.RED
  },
  borderBlue: {
    borderLeftColor: Colors.SECONDARY_BLUE
  },
  borderYellow: {
    borderLeftColor: Colors.YELLOW
  },
  borderGreen: {
    borderLeftColor: Colors.GREEN
  },
  headerView: {
    flexDirection: 'row'
  },
  productNameText: {
    color: Colors.TEXT_BLACK,
    fontSize: 15,
    fontWeight: '600'
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
  footerLocationComponentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 0.25 * ScreenWidth,
    paddingRight: px(1)
  },
  footerQuantityComponentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 0.3 * ScreenWidth,
    paddingRight: px(1),
    paddingLeft: px(1)
  },
  footerTimeComponentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 0.3 * ScreenWidth,
    paddingRight: px(3),
    paddingLeft: px(1)
  },
  valueText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  footerView: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerValueText: {
    flexWrap: 'wrap',
    fontSize: 12
  },
  fontBold: {
    fontWeight: 'bold'
  }
});
