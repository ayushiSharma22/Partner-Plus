import { View, Platform, Linking } from 'react-native';
import { Component } from 'react';
const React = require('react');
import AccountTile from './accountListTile';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: 'idle'
    };
  }

  logoutHandler() {
    const { logout } = this.props;
    logout();
  }

  checkUpdateButton() {
    let { fetchAppUpdates, showAlert } = this.props;
    let updateDialog = true;
    fetchAppUpdates().then(updateData => {
      if (updateData.update) {
        if (Platform.OS === 'ios') {
          Linking.openURL(
            'https://itunes.apple.com/in/app/bizongo-seller/id1192626367?mt=8'
          );
        } else if (Platform.OS === 'android') {
          Linking.openURL(
            'https://play.google.com/store/apps/details?id=com.seller_app&hl=en'
          );
        }
      } else {
        showAlert('success', 'Update Not Found', 'App is already up-to-date.');
      }
    });
  }

  render() {
    const { navigator, logout } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <AccountTile
          title="Update Contact"
          details="Edit your Contact Number"
          onPress={() => navigator.push({ id: 'updateContact' })}
          image={require('../../../../../img/edit-contact.png')}
        />
        <AccountTile
          title="Company Profile"
          details="Edit your company details"
          onPress={() => navigator.push({ id: 'companyProfile' })}
          image={require('../../../../../img/company-settings.png')}
        />
        <AccountTile
          title="Reset Password"
          details="Reset your password"
          onPress={() => navigator.push({ id: 'resetPassword' })}
          image={require('../../../../../img/password.png')}
        />
        <AccountTile
          title="Update"
          details="Check for app updates"
          onPress={() => this.checkUpdateButton()}
          image={require('../../../../../img/update.png')}
        />
      </View>
    );
  }
}
