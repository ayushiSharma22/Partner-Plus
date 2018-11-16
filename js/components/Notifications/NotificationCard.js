import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Text from '../Text';
import { px } from '../../commons/helper';
import * as Colors from '../../commons/colors';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(icomoonConfig);
import Moment from 'moment';

let ScreenWidth = Dimensions.get('window').width;
let svgWidth = 0.1 * ScreenWidth;

export default class NotificationCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    showCard = true;
    let {
      notifiable_id,
      notifiable_type,
      product_name,
      created_at,
      status,
      message
    } = this.props.notification;
    let navigationName = '';
    time = Moment(new Date()).diff(Moment(created_at * 1000), 'days');
    timeHours = Moment(new Date()).diff(Moment(created_at * 1000), 'hours');
    timeMinutes = Moment(new Date()).diff(Moment(created_at * 1000), 'minutes');
    if (notifiable_type == 'request_for_quote_assigned') {
      message = (
        <Text>
          You have received
          <Text style={{ color: '#00AFD7' }}> Quote Request </Text>
          for <Text style={styles.fontBold}> {product_name} </Text>.
        </Text>
      );
      navigationName = 'inquiry';
      name = 'target-outlines-quotes';
    } else if (notifiable_type == 'purchase_order_assigned') {
      message = (
        <Text>
          You have been assigned a
          <Text style={{ color: '#00AFD7' }}> Purchase Order </Text>
          with Id <Text style={styles.fontBold}>{notifiable_id}</Text>.
        </Text>
      );
      navigationName = 'purchase_order';
      name = 'outline-file_copy-24px_active';
    } else {
      message = <Text>{message}</Text>;
      navigationName = 'inquiry';
      name = 'baseline-notifications-24px-1';
    }
    unreadShadow = status == 'read' ? styles.noShadowCard : styles.shadowCard;
    if (showCard) {
      return (
        <TouchableOpacity
          style={[styles.inquiryCardView, unreadShadow]}
          onPress={() =>
            this.props.openNotification(notifiable_id, navigationName)
          }
        >
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center'
            }}
          >
            <Icon
              size={svgWidth}
              color="#00AFD7"
              name={name}
              style={{ opacity: 0.25 }}
            />
          </View>
          <View
            style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}
          >
            {message}
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              margin: 10
            }}
          >
            <Text style={styles.timeElapsed}>
              {time <= 1
                ? timeHours < 1
                  ? timeMinutes < 5
                    ? ' Just Now'
                    : timeMinutes
                  : timeHours
                : time}
              {time < 1
                ? timeHours < 1
                  ? timeMinutes < 5
                    ? ''
                    : ' mins. ago'
                  : 'h ago'
                : 'd ago'}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  inquiryCardView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: Colors.BACKGROUND_LIGHT_GREY,
    borderRadius: 5,
    borderWidth: 0,
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: px(1),
    paddingRight: px(1),
    paddingTop: px(2),
    paddingBottom: px(2)
  },
  shadowCard: {
    shadowColor: Colors.TEXT_BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 0.3
    },
    elevation: 2.5
  },
  timeElapsed: {
    fontSize: 0.03 * ScreenWidth
  },
  headerView: {
    flexDirection: 'row'
  },
  productNameText: {
    color: Colors.TEXT_BLACK,
    fontSize: 15,
    fontWeight: '600'
  },
  footerLocationComponentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 0.3 * ScreenWidth
  },
  footerQuantityComponentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 0.3 * ScreenWidth
  },
  footerTimeComponentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 0.3 * ScreenWidth,
    paddingRight: px(3)
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
