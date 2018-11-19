import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import ResetPasswordService from '../../services/resetPassword';
import { Button } from 'react-native-elements';
import { Card, CardTitle, CardContent, Separator } from '../Card';
import Text from '../Text';
import * as Constants from '../../commons/Constants';
import TextField from 'react-native-md-textinput';
import { isEmpty } from '../../commons/Utils';

let ScreenWidth = Dimensions.get('window').width;

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }),
      (this.resetHandler = this.resetHandler.bind(this));
  }

  getLabelStyle() {
    return {
      fontFamily: Constants.MAIN_FONT
    };
  }

  getInputStyle() {
    if (this.state.editing) {
      return {
        color: '#34495e',
        fontFamily: Constants.MAIN_FONT,
        padding: 0
      };
    } else {
      return {
        color: '#656565',
        fontFamily: Constants.MAIN_FONT,
        padding: 0
      };
    }
  }

  resetHandler = function() {
    const { showAlert } = this.props;
    var password = this.state.newPassword;
    var confirmPassword = this.state.confirmNewPassword;
    var oldPassword = this.state.oldPassword;
    var ths = this;
    if (isEmpty(oldPassword)) {
      showAlert('info', 'Error', 'Please enter previous password');
      return;
    }
    if (isEmpty(password)) {
      showAlert('info', 'Error', 'Please enter new password');
      return;
    }
    if (password.length < 8) {
      showAlert('info', 'Error', 'Password should have atleast 8 characters');
      return;
    }
    if (
      password !== confirmPassword ||
      password == undefined ||
      password.length < 8
    ) {
      showAlert('info', 'Error', "Passwords don't match");
      return;
    }
    this.setState({ buttonState: 'busy' });
    var obj = {};
    obj['user'] = {};
    obj['user']['old_password'] = oldPassword;
    obj['user']['password'] = password;
    ResetPasswordService(obj)
      .then(response => {
        this.setState({ buttonState: 'idle' });
        if (response.error) {
          showAlert('info', 'Error', response.error);
        } else if (response.errors) {
          showAlert('info', 'Error', response.errors);
        } else {
          showAlert('info', 'Success', 'Password updated successfully');
          this.props.navigator.pop();
        }
      })
      .catch(error => {
        this.setState({ buttonState: 'idle' });
        showAlert('info', 'Error', error);
      });
  };

  render() {
    name = this.state.buttonState == 'busy' ? 'WAIT' : 'RESET PASSWORD';
    return (
      <ScrollView
        style={{ flex: 1 }}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="always"
      >
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <View>
            <Card styles={card}>
              <CardTitle styles={card}>
                <Text style={styles.title}>Reset Password</Text>
              </CardTitle>
              <Separator />
              <CardContent styles={card}>
                <View>
                  <TextField
                    label={'Enter Old Password'}
                    autoCapitalize="none"
                    keyboardType="default"
                    secureTextEntry={true}
                    labelStyle={this.getLabelStyle()}
                    inputStyle={this.getInputStyle()}
                    onChangeText={text => this.setState({ oldPassword: text })}
                    value={this.state.oldPassword}
                    autoCorrect={false}
                  />
                  <TextField
                    label={'Enter New Password'}
                    autoCapitalize="none"
                    keyboardType="default"
                    secureTextEntry={true}
                    labelStyle={this.getLabelStyle()}
                    inputStyle={this.getInputStyle()}
                    onChangeText={text => this.setState({ newPassword: text })}
                    value={this.state.newPassword}
                    autoCorrect={false}
                  />
                  <TextField
                    label={'Confirm Password'}
                    autoCapitalize="none"
                    keyboardType="default"
                    secureTextEntry={true}
                    labelStyle={this.getLabelStyle()}
                    inputStyle={this.getInputStyle()}
                    onChangeText={text =>
                      this.setState({ confirmNewPassword: text })
                    }
                    value={this.state.confirmNewPassword}
                    autoCorrect={false}
                  />
                </View>
              </CardContent>
            </Card>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'stretch',
              margin: 10,
              marginLeft: 0
            }}
          >
            <Button
              raised
              buttonStyle={{
                backgroundColor: '#34495E',
                borderRadius: 3,
                width: ScreenWidth / 2,
                marginLeft: 0
              }}
              textStyle={{
                textAlign: 'center',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: 16
              }}
              title={name}
              onPress={this.resetHandler}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const card = {
  card: {
    margin: 10,
    marginBottom: 0
  },
  cardTitle: {
    padding: 10,
    paddingLeft: 15
  },
  cardContent: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15
  }
};

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#34495e'
  },
  loginButtonBackground: {
    height: 40,
    borderRadius: 2,
    margin: 10
  },
  loginButtonLabel: {
    color: 'white',
    fontSize: 16
  }
});
