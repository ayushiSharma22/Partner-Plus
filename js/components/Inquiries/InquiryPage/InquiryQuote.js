import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../../Text';
import { Card, CardTitle, CardContent, CardFooter } from '../../CardThreeLevel';
import * as Colors from '../../../commons/colors';

export default class InquiryQuote extends Component {
  constructor(props) {
    super(props);
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
    let { navigator } = this.props;
    let { gst_percentage } = this.props.inquiry.product;
    let { quantity, price_type } = this.props.inquiry;
    let {
      price_per_unit,
      delivery_charges_per_unit
    } = this.props.inquiry.supplier_quote;
    if (price_type === 'ex_factory') {
      delivery_charges_per_unit = 0;
    }
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

  renderContent() {
    let {
      price_per_unit,
      delivery_charges_per_unit,
      valid_till,
      dispatch_time,
      message
    } = this.props.inquiry.supplier_quote;
    let { quantity, price_type } = this.props.inquiry;
    return (
      <View style={styles.contentView}>
        {this.renderProperty('Price Per Unit (Rs.)', price_per_unit)}
        {this.renderProperty('Quantity', quantity)}
        {price_type === 'included_in_price' ? (
          this.renderProperty(
            'Delivery Cost Per Unit (Rs.)',
            delivery_charges_per_unit
          )
        ) : (
          <Text />
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
      <View>
        <Card styles={mainCard}>
          <CardTitle styles={mainCard}>{this.renderHeader()}</CardTitle>
          <CardContent styles={mainCard}>{this.renderContent()}</CardContent>
          <CardFooter styles={mainCard}>{this.renderFinalPrice()}</CardFooter>
        </Card>
      </View>
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
    flexDirection: 'column',
    alignItems: 'stretch'
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
  bestBidKeyText: {
    color: '#00AFD7',
    fontWeight: 'bold',
    fontSize: 15
  },
  bestBidValueText: {
    fontSize: 15
  }
});

const mainCard = {
  card: {
    margin: 10,
    marginTop: 20
  },
  cardTitle: {
    backgroundColor: Colors.SECONDARY_BLUE,
    borderWidth: 0
  },
  cardContent: {
    backgroundColor: Colors.BACKGROUND_GREY,
    borderWidth: 0
  },
  cardFooter: {
    backgroundColor: Colors.GREEN,
    borderWidth: 0
  }
};
