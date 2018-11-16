import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import QuoteCard from './QuoteCard';
import { Card, CardContent } from '../../CardThreeLevel';
import * as Colors from '../../../commons/colors';

export default class InquiryQuoteHistory extends Component {
  constructor(props) {
    super(props);
  }

  renderContent() {
    let { history_versions } = this.props.history;

    component = [];
    for (var i = 0; i < history_versions.length; i++) {
      component.push(
        <View key={i}>
          <QuoteCard
            index={i + 1}
            quote={history_versions[i]}
            inquiry={this.props.inquiry}
          />
        </View>
      );
    }
    return <View style={styles.contentView}>{component}</View>;
  }

  render() {
    return (
      <View>
        <Card styles={mainCard}>
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
    alignItems: 'stretch',
    paddingBottom: 20
  },
  propertyView: {
    flex: 1,
    flexDirection: 'column',
    padding: 3,
    paddingBottom: 10
  },
  keyView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  valueView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
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
    color: '#00afd7',
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
    marginTop: 20,
    padding: 0
  },
  cardTitle: {
    backgroundColor: Colors.SECONDARY_BLUE,
    borderWidth: 0,
    padding: 0
  },
  cardContent: {
    backgroundColor: Colors.BACKGROUND_GREY,
    borderWidth: 0,
    padding: 0
  },
  cardFooter: {
    backgroundColor: Colors.WHITE,
    borderWidth: 0,
    padding: 0
  }
};
