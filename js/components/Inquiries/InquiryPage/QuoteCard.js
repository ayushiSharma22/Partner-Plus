import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../../Text';
import CollapsibleCard from '../../../commons/CollapsibleCard';
import * as Colors from '../../../commons/colors';

export default class QuoteCard extends Component {
  constructor(props) {
    super(props);
  }

  getHeader() {
    let { index } = this.props;
    return (
      <View style={{ padding: 15, backgroundColor: '#34495E' }}>
        <Text style={styles.heading}>{'Quote ' + index}</Text>
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={styles.headerView}>
        <Text style={styles.headerText}>QUOTE DETAILS</Text>
      </View>
    );
  }

  renderProperty(key, value, unit = '') {
    if (!!key && !!value) {
      return (
        <View style={styles.propertyView}>
          <View style={styles.keyView}>
            <Text style={styles.keyText}>{key}</Text>
          </View>
          <View style={styles.valueView}>
            <Text style={styles.valueText}>
              : &nbsp; {value} {unit ? unit : ''}
            </Text>
          </View>
        </View>
      );
    }
  }

  renderMessage(key, value, unit = '') {
    if (!!key && !!value) {
      return (
        <View style={styles.propertyView}>
          <View style={styles.keyView}>
            <Text style={styles.keyText}>{key}</Text>
            <Text style={styles.valueText}>
              {value} {unit ? unit : ''}
            </Text>
          </View>
        </View>
      );
    }
  }

  renderFinalPrice() {
    let { gst_percentage } = this.props.inquiry.product;
    let { quantity } = this.props.inquiry;
    let { price_per_unit, delivery_charges_per_unit } = this.props.quote;
    final_price = (
      (price_per_unit + delivery_charges_per_unit) *
      quantity *
      (gst_percentage / 100 + 1)
    ).toFixed(2);
    return (
      <View key={gst_percentage} style={styles.finalPriceBox}>
        <Text style={styles.finalPriceBoxText}>
          {' '}
          <Text style={{ fontWeight: 'bold' }}>
            Final Price{' '}
          </Text> &nbsp;(with {gst_percentage}% Tax) : Rs. {final_price}
        </Text>
      </View>
    );
  }

  getContent() {
    let {
      price_per_unit,
      delivery_charges_per_unit,
      valid_till,
      dispatch_time,
      message
    } = this.props.quote;
    return (
      <View style={styles.contentView}>
        {this.renderProperty('Price Per Unit', price_per_unit)}
        {this.renderProperty(
          'Delivery Cost Per Unit',
          delivery_charges_per_unit
        )}
        {this.renderProperty(
          'Quotes Valid Till',
          new Date(valid_till).toDateString()
        )}
        {this.renderProperty('Dispatch Time', dispatch_time, ' Days')}
        {this.renderMessage('Message', message)}
      </View>
    );
  }

  render() {
    return (
      <CollapsibleCard
        collapsible={true}
        heading={this.getHeader()}
        content={this.getContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    paddingLeft: 5
  },
  finalPriceBoxText: {
    color: Colors.WHITE
  },
  finalPriceBox: {
    padding: 3
  },
  headerText: {
    color: Colors.WHITE,
    fontSize: 14,
    fontWeight: '700'
  },
  contentView: {
    backgroundColor: Colors.BACKGROUND_GREY,
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
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
