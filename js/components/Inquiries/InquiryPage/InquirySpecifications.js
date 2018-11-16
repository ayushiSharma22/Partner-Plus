import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../../Text';
import * as Utils from '../../../commons/Utils';
import { Card, CardTitle, CardContent } from '../../CardThreeLevel';
import * as Colors from '../../../commons/colors';

export default class InquirySpecifications extends Component {
  constructor(props) {
    super(props);
  }

  renderHeader() {
    return (
      <View style={styles.headerView}>
        <Text style={styles.headerText}>SPECIFICATIONS</Text>
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

  renderContent() {
    let { product_specifications } = this.props.inquiry.product;
    content = [];
    for (key in product_specifications) {
      if (product_specifications.hasOwnProperty(key)) {
        value = product_specifications[key];
        content.push(
          <View key={key}>
            {this.renderProperty(
              Utils.CapitalizeFirstLetter(Utils.splitToWords(key)),
              value
            )}
          </View>
        );
      }
    }
    return <View style={styles.contentView}>{content}</View>;
  }

  render() {
    let { product_specifications } = this.props.inquiry.product;
    let length = Object.keys(product_specifications).length;
    if (!!length) {
      return (
        <View>
          <Card styles={mainCard}>
            <CardTitle styles={mainCard}>{this.renderHeader()}</CardTitle>
            <CardContent styles={mainCard}>{this.renderContent()}</CardContent>
          </Card>
        </View>
      );
    } else {
      return null;
    }
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
    fontSize: 14,
    flexWrap: 'wrap'
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
    backgroundColor: Colors.WHITE,
    borderWidth: 0,
    padding: 0
  }
};
