import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Text from '../../Text';
import * as Constants from '../../../commons/Constants';
import * as Utils from '../../../commons/Utils';
import { Badge } from '../../Elements';
import { Card, CardTitle, CardContent } from '../../CardThreeLevel';
import Progress from 'react-native-progress/Circle';
import * as Colors from '../../../commons/colors';

let ScreenWidth = Dimensions.get('window').width;

export default class InquiryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgWidth: 80,
      textSize: 13,
      buttonState: 'idle'
    };
  }
  renderHeader() {
    let { name } = this.props.inquiry.product;
    return (
      <View style={styles.headerView}>
        <Text style={styles.headerText}>REQUEST DETAILS</Text>
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

  getCircleInnerText() {
    let { time_remaining } = this.props.inquiry;
    time = Math.round(time_remaining);
    return (
      <Text style={{ textAlign: 'center' }}>
        <Text style={{ fontSize: this.state.textSize }}>{time}</Text>
        <Text style={{ fontSize: 8 }}>{'\nHOURS LEFT'}</Text>
      </Text>
    );
  }

  getInquiryStatus() {
    let { name } = this.props;
    if (name === 'QUOTES GIVEN') {
      return 'warning';
    } else if (name === 'QUOTES ACCEPTED') {
      return 'success';
    } else if (name === 'QUOTES LOST') {
      return 'danger';
    } else {
      return 'info';
    }
  }

  getBadgeMessage() {
    let { name } = this.props;
    if (!!name) {
      return name;
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

  renderBadge() {
    let { name } = this.props;
    if (!!name) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3,
            paddingLeft: 0
          }}
        >
          <Badge
            status={this.getInquiryStatus()}
            message={this.getBadgeMessage()}
            fontSize={0.03 * ScreenWidth}
          />
        </View>
      );
    }
  }

  setWidth(event) {
    const { width, height } = event.nativeEvent.layout;
    this.setState({
      textSize: 0.07 * width
    });
  }

  renderTimeRemaining() {
    let { validity_time, time_remaining } = this.props.inquiry;
    percent = time_remaining / validity_time;
    color = 'rgb(84, 189, 72)';
    if (time_remaining <= 24) {
      color = 'rgb(217, 83, 79)';
    }
    return (
      <View style={styles.timeRemainingView}>
        <View
          style={{
            padding: 0,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Progress
            size={this.state.imgWidth}
            thickness={10}
            progress={percent}
            showsText={true}
            formatText={progress => {
              return this.getCircleInnerText();
            }}
            borderWidth={0}
            textStyle={{
              color: 'rgb(52, 73, 94)',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
            color={color}
            direction={'counter-clockwise'}
            unfilledColor={'#C4C4C4'}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            padding: 0.001 * this.state.imgWidth,
            paddingLeft: 0,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {this.renderBadge(this.props.name)}
        </View>
      </View>
    );
  }

  renderStatus() {
    let { status, time_remaining } = this.props.inquiry;
    return this.renderTimeRemaining();
  }

  renderContent() {
    let {
      validity_time,
      time_remaining,
      created_at,
      message,
      quantity,
      id,
      buyer_address,
      price_type
    } = this.props.inquiry;
    let { unit } = this.props.inquiry.product;
    let received_on = 'NA',
      seller_message = null;
    if (price_type === 'included_in_price') {
      price_type = 'delivery_charges_included_in_price';
    }
    priceType = Utils.CapitalizeAllWords(Utils.splitToWords(price_type));
    if (!!created_at) {
      received_on = new Date(created_at).toDateString();
    }
    if (!!message) {
      seller_message = message;
    }
    return (
      <View onLayout={event => this.setWidth(event)}>
        <View style={styles.timeGraphRow}>
          <View style={styles.contentView}>
            {this.renderProperty('REQUEST ID', id)}
            {this.renderProperty('REQUEST DATE', received_on)}
            {this.renderProperty('PRICE TYPE', priceType)}
            {this.renderProperty('DELIVERY IN', buyer_address.location)}
          </View>
          <View style={styles.contentView}>{this.renderStatus()}</View>
        </View>
        {this.renderProperty('MESSAGE', seller_message)}
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
  timeGraphRow: {
    flex: 2,
    flexDirection: 'row'
  },
  contentView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%'
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
    flexDirection: 'column',
    justifyContent: 'center',
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
    marginTop: 20,
    borderWidth: 0
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
    borderWidth: 0
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
