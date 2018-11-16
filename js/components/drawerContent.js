import React, { Component } from 'react';
import MenuItem, { Separator } from './MenuItem';
import {
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import Text from './Text';
import { Icon } from 'native-base';

import { isEmpty } from '../commons/Utils';

let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;

export default class ControlPanel extends Component {
  constructor(props) {
    super(props);
  }
  logoutHandler = () => {
    const { logout } = this.props;
    logout();
  };
  renderProfileLink = () => {
    let { userState } = this.props;
    var size = 0.2 * ScreenWidth;
    var height = 0.2 * ScreenHeight;
    var uri = '';
    if (
      !isEmpty(userState.user) &&
      !isEmpty(userState.user.avatar.normal_250)
    ) {
      uri = userState.user.avatar.normal_250;
      // uri = require({userState.user.avatar.normal_250})
    } else {
      uri = '../../img/profile_3x.png';
    }
    return (
      <TouchableOpacity
        onPress={() => this.props.navigator.replace({ id: 'myprofile' })}
      >
        <View style={styles.containerprofile}>
          <View style={styles.profileImageView}>
            <Image
              source={{ uri }}
              resizeMode="cover"
              style={{
                width: size,
                height: size,
                borderRadius: size / 2
              }}
            />
          </View>
          <View style={styles.profileDetailView}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={styles.profileName}>
                {isEmpty(userState.user) || isEmpty(userState.user.name)
                  ? ''
                  : userState.user.name}
              </Text>
              <Text style={styles.profileEmail}>
                {isEmpty(userState.user) || isEmpty(userState.user.email)
                  ? ''
                  : userState.user.email}
              </Text>
            </View>
          </View>
          <View style={styles.profileOpenIconView}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
              }}
            >
              <Icon
                name="ios-arrow-forward"
                style={{
                  fontSize: 20,
                  color: '#989898',
                  justifyContent: 'flex-end'
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderMenuItems = () => {
    return (
      <View style={styles.menuView}>
        <MenuItem
          title="Home"
          iconName="md-home"
          onPress={() => {
            this.props.navigator.replace({ id: 'home' });
          }}
          icon={require('../../img/home.png')}
        />
        <MenuItem
          title="Rating"
          iconName="md-stars"
          onPress={() => {
            this.props.navigator.replace({ id: 'rating' });
          }}
          icon={require('../../img/Star1.png')}
        />
        <Separator />
        <MenuItem
          title="FAQ"
          iconName="md-help-circle"
          onPress={() => {
            this.props.navigator.replace({ id: 'faq' });
          }}
          icon={require('../../img/FAQs.png')}
        />
        <MenuItem
          title="Settings"
          iconName="md-home"
          onPress={() => {
            this.props.navigator.replace({ id: 'account_settings' });
          }}
          icon={require('../../img/Settings.png')}
        />
        <MenuItem
          title="Support"
          iconName="md-help-circle"
          onPress={() => {
            this.props.navigator.replace({ id: 'support' });
          }}
          icon={require('../../img/Support.png')}
        />
        <Separator />
        <MenuItem
          title="Logout"
          iconName="md-home"
          onPress={this.logoutHandler.bind(this)}
          icon={require('../../img/logout.png')}
        />
      </View>
    );
  };
  render() {
    let { closeDrawer, userState } = this.props;
    return (
      <ScrollView style={styles.container} bounces={false}>
        {this.renderProfileLink()}
        {this.renderMenuItems()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    backgroundColor: 'white',
    padding: 0
  },
  containerprofile: {
    flex: 1,
    flexDirection: 'row',
    height: 0.2 * ScreenHeight,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#34495e'
  },
  menuView: {
    flex: 1
  },
  profileImageView: {
    padding: 10
  },
  profileDetailView: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 0.4 * ScreenWidth
  },
  profileName: {
    fontSize: 0.04 * ScreenWidth,
    fontWeight: 'bold',
    color: 'white'
  },
  profileEmail: {
    fontSize: 14,
    color: 'white'
  },
  profileOpenIconView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  header: {
    padding: 20,
    justifyContent: 'flex-end'
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10
  }
});
