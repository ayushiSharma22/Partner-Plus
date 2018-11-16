import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../../Text';
import * as Constants from '../../../commons/Constants';
import { Card, CardTitle, CardContent } from '../../CardThreeLevel';
import * as Colors from '../../../commons/colors';

export default class InquiryProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgWidth: 80,
      textSize: 13,
      buttonState: 'idle'
    };
  }
  renderHeader() {
    return (
      <View style={styles.headerView}>
        <Text style={styles.headerText}>PRODUCT DETAILS</Text>
      </View>
    );
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

  normalize(text) {
    output = '';
    parts = text.split('_');
    output += parts[0].toUpperCase();
    for (var i = 1; i < parts.length; i++) {
      output += ' ' + parts[i].toUpperCase();
    }
    return output;
  }

  renderContent() {
    let { product, quantity, buyer_address } = this.props.inquiry;
    let { name, unit } = this.props.inquiry.product;

    return (
      <View style={styles.contentView}>
        {this.renderProperty('PRODUCT NAME', name)}
        {this.renderProperty('QUANTITY', quantity, unit)}
        {this.renderProperty('DELIVERY LOCATION', buyer_address.location)}
      </View>
    );
  }

  render() {
    return (
      <View>
        <Card styles={mainCard}>
          <CardTitle styles={mainCard}>{this.renderHeader()}</CardTitle>
          <CardContent styles={mainCard}>{this.renderContent()}</CardContent>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    paddingLeft: 5
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
    flexDirection: 'column',
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
  timeRemainingView: {
    flexDirection: 'row',
    padding: 3
  },
  timeRemainingTitle: {
    color: '#00afd7',
    fontWeight: 'bold',
    fontSize: 16
  },
  timeRemainingValue: {
    color: '#999999',
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
    backgroundColor: '#ffffff',
    borderWidth: 0,
    padding: 0
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
