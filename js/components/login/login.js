import React, { Component } from 'react';
import { Thumbnail, Button } from 'native-base';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
// import { Button } from 'react-native-elements';
// import Text from '../Text';
// import * as Constants from '../../commons/Constants';
// import { TextField } from 'react-native-material-textfield';
// import { isEmail, isPhoneNumber } from '../../commons/Utils';

// import * as EventTypes from '../../actions/EventTypes';
// var Analytics = require('react-native-firebase-analytics');
// import {_setUpGoogleSignIn, _signIn, _signOut} from '../../services/GoogleLoginService';
// import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonState: 'idle',
      progress: false,
      writeSomething: null
    };
    // this.logIn = this.logIn.bind(this);
    // this.handleSignupPress = this.handleSignupPress.bind(this);
    // this.forgotPassword = this.forgotPassword.bind(this);
  }

  // componentDidMount() {
  //   const { getState, loginState, navigator, userState } = this.props;
  //   getState();
  //   if (loginState.loggedIn) {
  //     navigator.replace({ id: 'home' });
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   const prevLoginState = this.props.loginState;
  //   const nextLoginState = nextProps.loginState;
  //   const { showAlert } = nextProps;
  //   if (nextLoginState.loggedIn === true && prevLoginState.loggedIn === false) {
  //     this.setState({ buttonState: 'idle', progress: true });
  //     // Analytics.logEvent(EventTypes.LOGIN_EVENT, {username: nextLoginState.user.name});
  //     nextProps.loginState.nextRoute = null;
  //     nextProps.navigator.replace({ id: 'home' });
  //   }
  //   if (prevLoginState.error === false && nextLoginState.error === true) {
  //     showAlert('info', 'Login Error', nextProps.loginState.message, [
  //       { text: 'OK' }
  //     ]);
  //     this.setState({ buttonState: 'idle', progress: false });
  //   }
  //   if (!prevLoginState.loggingIn && nextLoginState.loggingIn) {
  //     this.setState({ buttonState: 'busy' });
  //   }
  // }

  // logIn() {
  //   const { loginState, login, showAlert } = this.props;
  //   if (this.state.username !== '' && this.state.password !== '') {
  //     if (
  //       !isEmail(this.state.username) &&
  //       !isPhoneNumber(this.state.username)
  //     ) {
  //       this.setState({ progress: false });
  //       showAlert('info', 'Login Error', 'Please enter a valid Username');
  //     } else if (this.state.password.length < 8) {
  //       this.setState({ progress: false });
  //       showAlert(
  //         'info',
  //         'Login Error',
  //         'Password should be minimum 8 characters long'
  //       );
  //     } else {
  //       if (isEmail(this.state.username)) {
  //         this.state.username = this.state.username.toLowerCase();
  //       }
  //       login({
  //         username: this.state.username,
  //         password: this.state.password
  //       });
  //     }
  //   } else {
  //     this.setState({ progress: false });
  //     showAlert('info', 'Login Error', 'Please fill all the fields');
  //   }
  // }

  // renderForgotPasswordComponent() {
  //   return <View />;
  //   return (
  //     <View style={{ flexDirection: 'row', marginTop: 5 }}>
  //       <View style={{ flex: 1 }}>
  //         <Text style={{ margin: 0, padding: 0, alignSelf: 'flex-end' }}>
  //           Forgot Password?
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // }

  // handleSignupPress() {
  //   const { loginState, navigator } = this.props;
  //   if (!loginState.loggedIn && !loginState.loggingIn) {
  //     navigator.push({ id: 'signup_personal' });
  //   }
  // }

  forgotPassword = () => {
    // const { loginState, navigator } = this.props;
    // navigator.push({ id: 'forgotPassword' });
    // if (!loginState.loggedIn && !loginState.loggingIn) {
    // navigator.push({ id: 'forgotPassword' });
    // }
    this.setState({ writeSomething: 'skjdnsjn' });
  };

  // getBorderColor() {
  //   return '#E0E0E0';
  // }

  // renderOption() {
  //   return (
  //     <View style={{ margin: 10, padding: 0 }}>
  //       <Text style={{ margin: 0, padding: 0, alignSelf: 'center' }}>OR</Text>
  //     </View>
  //   );
  // }

  // setWidth(event) {
  //   const { width, height } = event.nativeEvent.layout;
  //   let w = 0.9 * width;
  //   this.setState({
  //     width: w,
  //     fullWidth: width
  //   });
  // }

  render() {
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
            justifyContent: 'center',
            marginLeft: 30,
            marginRight: 30
          }}
        >
          <View
            style={{
              height: 50,
              alignItems: 'stretch',
              paddingLeft: 20,
              paddingRight: 20,
              marginBottom: 10
            }}
          >
            <Image
              square
              source={require('../../../img/bizongo-logo-blue.png')}
              style={{ flex: 1, width: null, height: null }}
              resizeMode="contain"
            />
          </View>
          <View style={{ height: 50, alignItems: 'stretch', marginBottom: 20 }}>
            {/* <TextField
              label={'Email or Mobile Number'}
              keyboardType="email-address"
              inputStyle={{ fontFamily: Constants.MAIN_FONT, padding: 0 }}
              labelStyle={{ fontFamily: Constants.MAIN_FONT }}
              autoCorrect={false}
              borderColor={this.getBorderColor()}
              value={this.state.username}
              autoCapitalize={'none'}
              onChangeText={text => this.setState({ username: text })}
            /> */}
          </View>
          <View style={{ height: 50, alignItems: 'stretch', marginBottom: 20 }}>
            {/* <TextField
              label={'Password'}
              onChangeText={text => this.setState({ password: text })}
              keyboardType="default"
              inputStyle={{ fontFamily: Constants.MAIN_FONT, padding: 0 }}
              labelStyle={{ fontFamily: Constants.MAIN_FONT }}
              autoCorrect={false}
              borderColor={this.getBorderColor()}
              value={this.state.password}
              autoCapitalize={'none'}
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
            /> */}
          </View>
          {/* {this.renderForgotPasswordComponent()} */}
          <View
            style={{
              marginTop: 15,
              position: 'relative',
              alignItems: 'stretch'
            }}
            // onLayout={event => this.setWidth(event)}
          >
            <Button
              raised
              buttonStyle={{
                backgroundColor: '#34495E',
                borderRadius: 3,
                height: 50
              }}
              textStyle={{
                textAlign: 'center',
                color: '#FFFFFF',
                fontWeight: 'bold'
              }}
              title={'LOGIN'}
              // onPress={this.logIn.bind(this)}
            />
          </View>
          <TouchableOpacity onPress={this.forgotPassword}>
            <Text>{this.state.writeSomething}</Text>
            <View
              style={{
                marginTop: 20,
                padding: 0,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <View>
                <Text
                  style={{
                    marginRight: 10,
                    padding: 0,
                    color: '#00AFD7',
                    fontWeight: 'bold'
                  }}
                >
                  Forgot password?
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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
  createButtonLabel: {
    color: 'white',
    fontSize: 13,
    padding: 0,
    margin: 0
  }
});
