import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import Text from '../Text';
import Mixpanel from 'react-native-mixpanel';
import Communications from 'react-native-communications';
let ScreenWidth = Dimensions.get('window').width;

const support_contact = '8080004646';
const support_email = 'support@bizongo.in';

export default class Support extends Component {
  constructor(props) {
    super(props);
    // this.getBody = this.getBody.bind(this);
    this.handleMailRequest = this.handleMailRequest.bind(this);
  }
  renderComponent(title, content, icon_name, callback) {
    return (
      <TouchableOpacity
        onPress={() => {
          callback();
        }}
      >
        <View style={{ flex: 1, padding: 15 }}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.card}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              padding: 20,
              paddingLeft: 10
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Text style={styles.content}>{content}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
            >
              <Icon
                name={icon_name}
                style={{ color: '#34495e', fontSize: 30 }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  handleCallRequest() {
    Communications.phonecall(support_contact, false);
  }
  getBody() {
    const { userState } = this.props;
    let message = '';
    message +=
      'Hello Bizongo Support,\nI need a little help in the usage of Bizongo Seller App. Kindly contact me on the details below.\n\n';
    message += userState.user.name + '\n' + userState.user.contact_number;
    return message;
  }
  handleMailRequest() {
    let msg = this.getBody();
    Communications.email(
      ['support@bizongo.in'],
      null,
      null,
      'Need Support',
      msg
    );
  }
  renderCallComponent() {
    return this.renderComponent(
      'Call/Helpline',
      '80 80 004646',
      'md-call',
      this.handleCallRequest
    );
  }
  renderMailComponent() {
    return this.renderComponent(
      'Email Address',
      'support@bizongo.in',
      'md-mail',
      this.handleMailRequest
    );
  }
  render() {
    Mixpanel.track('Visited Support Page');
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            {this.renderCallComponent()}
            {this.renderMailComponent()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#34495e',
    fontWeight: 'bold',
    fontSize: 0.05 * ScreenWidth
  },
  content: {
    color: '#656565',
    fontSize: 20
  },
  card: {
    borderRadius: 3,
    margin: 15,
    padding: 10,
    marginBottom: 0,
    backgroundColor: '#F9F9F9',
    elevation: 2.5,
    shadowColor: '#000000'
  }
});
