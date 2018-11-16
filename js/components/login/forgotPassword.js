import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import * as Constants from '../../commons/Constants';
import TextField from 'react-native-md-textinput';
import { isEmpty, isEmail } from '../../commons/Utils';
import { resetPassword } from '../../services/AuthServices';

let ScreenWidth = Dimensions.get('window').width;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      buttonState: 'idle',
      cancelButtonState: 'idle'
    };
    this.resetPassword = this.resetPassword.bind(this);
  }

  resetPassword() {
    const { showAlert } = this.props;
    if (!isEmail(this.state.email)) {
      showAlert('info', 'Error', 'Please enter your email ID');
      return;
    }
    this.setState({ buttonState: 'busy' });
    var data = { user: {} };
    data['user'] = { email: this.state.email };
    resetPassword(data)
      .then(response => {
        this.setState({ buttonState: 'idle' });
        if (!isEmpty(response.error)) {
          showAlert('info', 'Error', response.error);
        } else if (!isEmpty(response.errors)) {
          showAlert('info', 'Error', response.errors);
        } else {
          showAlert(
            'info',
            'Success',
            'Password request link has been sent to your email ID'
          );
          this.props.navigator.pop();
        }
      })
      .catch(err => {
        this.setState({ buttonState: 'idle' });
        showAlert('info', 'Error', err);
      });
  }
  cancelResetPassword() {
    const { navigator } = this.props;
    navigator.pop();
  }
  render() {
    const { loginState, navigator } = this.props;
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'center'
        }}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="always"
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'stretch',
            marginLeft: 50,
            marginRight: 50
          }}
        >
          <View style={{ marginTop: 50 }}>
            <TextField
              label={'Enter registered email id'}
              keyboardType="email-address"
              inputStyle={{ fontFamily: Constants.MAIN_FONT, padding: 0 }}
              labelStyle={{ fontFamily: Constants.MAIN_FONT }}
              autoCorrect={false}
              value={this.state.email}
              autoCapitalize={'none'}
              onChangeText={text => this.setState({ email: text })}
            />
          </View>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              alignItems: 'stretch'
            }}
          >
            <Button
              raised
              buttonStyle={{
                backgroundColor: '#34495E',
                borderRadius: 3,
                width: ScreenWidth / 2,
                height: 40
              }}
              textStyle={{
                textAlign: 'center',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: 16
              }}
              title={'RESET PASSWORD'}
              onPress={() => this.resetPassword()}
            />
          </View>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              alignItems: 'stretch'
            }}
          >
            <Button
              raised
              buttonStyle={{
                backgroundColor: '#D9D9D9',
                borderRadius: 3,
                width: ScreenWidth / 2,
                height: 40
              }}
              textStyle={{
                textAlign: 'center',
                color: '#54575A',
                fontWeight: 'bold',
                fontSize: 16
              }}
              title={'CANCEL'}
              onPress={() => this.cancelResetPassword()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  loginButtonBackground: {
    flex: 1,
    height: 40,
    borderRadius: 2,
    padding: 7,
    margin: 0
  },
  createButtonBackground: {
    flex: 1,
    height: 30,
    borderRadius: 0,
    padding: 5,
    margin: 0
  },
  loginButtonLabel: {
    color: 'white',
    fontSize: 16
  },
  cancelButtonLabel: {
    color: 'black',
    fontSize: 16
  },
  createButtonLabel: {
    color: 'white',
    fontSize: 13,
    padding: 0,
    margin: 0
  }
});
