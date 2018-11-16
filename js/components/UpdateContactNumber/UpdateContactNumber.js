import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Spinner } from 'native-base';
import { Button } from 'react-native-elements';
import Text from '../Text';
import * as Constants from '../../commons/Constants';
import { isEmpty, isPhoneNumber } from '../../commons/Utils';
import { failedToLoadScreen } from '../Elements';
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  Separator
} from '../CardThreeLevel';
import * as SignupServices from '../../services/SignUpServices';
import { submitMyProfile } from '../../services/fetchMyProfile';

export default class UpdateContactNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact_number: '',
      new_contact_number: '',
      otp: '',
      verified_contact_number: '',
      request: false,
      edited: false,
      verified: false,
      otp_sent: false,
      otp_verified: false,
      saved: false,
      buttonState: 'send_otp'
    };
  }
  componentDidMount() {
    const { userState } = this.props;
    if (!isEmpty(userState.user) && !isEmpty(userState.user.contact_number)) {
      let contact_with_code = userState.user.contact_number;
      let contact = contact_with_code.substr(contact_with_code.length - 10);
      this.setState({
        contact_number: contact,
        new_contact_number: contact
      });
    }
  }
  getLabelStyle() {
    return {
      fontFamily: Constants.MAIN_FONT
    };
  }
  getInputStyle() {
    return {
      color: '#34495e',
      fontFamily: Constants.MAIN_FONT,
      padding: 0
    };
  }
  handleChange(text) {
    this.setState({
      new_contact_number: text,
      edited: true,
      verified: false,
      otp_sent: false,
      otp_verified: false,
      saved: false,
      buttonState: 'send_otp',
      otp: ''
    });
    if (this.state.contact_number === text) {
      this.setState({
        edited: false
      });
    }
  }
  renderOTPField() {
    const { otp_sent, otp_verified } = this.state;
    if (otp_sent && !otp_verified) {
      return (
        <TextInput
          keyboardType="numeric"
          maxLength={8}
          editable={!this.state.request}
          labelStyle={this.getLabelStyle()}
          inputStyle={this.getInputStyle()}
          onChangeText={text => this.setState({ otp: text })}
          value={this.state.otp}
          autoCorrect={false}
        />
      );
    }
    return null;
  }
  renderFields() {
    return (
      <View>
        <Card styles={mainCard}>
          <CardTitle styles={mainCard}>
            <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'flex-start'
                }}
              >
                <Text style={styles.cardTitle}>Update Contact Number</Text>
              </View>
            </View>
          </CardTitle>
          <CardContent styles={mainCard}>
            <View>
              <TextInput
                keyboardType="numeric"
                editable={!this.state.request}
                labelStyle={this.getLabelStyle()}
                inputStyle={this.getInputStyle()}
                onChangeText={text => this.handleChange(text)}
                value={this.state.new_contact_number}
                maxLength={10}
                autoCorrect={false}
              />
              {this.renderOTPField()}
            </View>
          </CardContent>
        </Card>
      </View>
    );
  }
  send_otp() {
    var { new_contact_number, contact_number } = this.state;
    const { showAlert, userState } = this.props;
    if (!isPhoneNumber(new_contact_number)) {
      showAlert('info', 'Error', 'Please enter a valid phone number');
    } else {
      this.setState({
        buttonState: 'busy',
        request: true
      });
      SignupServices.validatePhoneService(new_contact_number)
        .then(data => {
          if (data.error) {
            showAlert('info', 'Error', data.error);
            this.setState({
              buttonState: 'send_otp',
              request: false
            });
          } else if (data.errors) {
            showAlert('info', 'Errors', data.errors);
            this.setState({
              buttonState: 'send_otp',
              request: false
            });
          } else if (data.exists) {
            showAlert(
              'info',
              'Errors',
              'Phone Number already registered with another account'
            );
            this.setState({
              buttonState: 'send_otp',
              request: false
            });
          } else {
            var credentials = {
              contact_number: new_contact_number,
              id: userState.user.confirmation_token
            };
            SignupServices.sendOTPService(credentials)
              .then(data => {
                if (data.errors) {
                  showAlert('info', 'Errors', data.errors);
                  this.setState({
                    buttonState: 'send_otp',
                    request: false
                  });
                } else {
                  this.setState({
                    buttonState: 'verify_otp',
                    otp_sent: true,
                    request: false
                  });
                }
              })
              .catch(error => {
                showAlert('info', 'Errors', error);
                this.setState({
                  buttonState: 'send_otp',
                  request: false
                });
              });
          }
        })
        .catch(error => {
          showAlert('info', 'Errors', error);
          this.setState({
            buttonState: 'send_otp',
            request: false
          });
        });
    }
  }
  verify_otp() {
    var { new_contact_number, otp } = this.state;
    const { userState, showAlert, navigator } = this.props;
    if (isEmpty(otp)) {
      showAlert('info', 'Error', 'Please enter an OTP');
    } else {
      this.setState({
        request: true,
        buttonState: 'busy'
      });
      let credentials = {
        contact_number: new_contact_number,
        id: userState.user.confirmation_token,
        otp_code: otp
      };
      SignupServices.verifyOTPService(credentials)
        .then(data => {
          if (data.errors) {
            showAlert('info', 'Errors', data.errors);
            this.setState({
              buttonState: 'verify_otp',
              request: false
            });
          } else {
            let credentials = {
              contact_number: '+91' + new_contact_number
            };
            submitMyProfile(userState.user.id, credentials)
              .then(data => {
                if (data.error) {
                  showAlert('info', 'Errors', data.error);
                  this.setState({
                    buttonState: 'verify_otp',
                    request: false
                  });
                } else if (data.errors) {
                  showAlert('info', 'Errors', data.errors);
                  this.setState({
                    buttonState: 'verify_otp',
                    request: false
                  });
                } else {
                  showAlert(
                    'info',
                    'Saved',
                    'Contact Number updated successfully'
                  );
                  this.setState({
                    buttonState: 'send_otp',
                    request: false
                  });
                  navigator.pop();
                }
              })
              .catch(error => {
                showAlert('info', 'Errors', 'Some error occured');
                this.setState({
                  buttonState: 'verify_otp',
                  request: false
                });
              });
          }
        })
        .catch(error => {
          showAlert('info', 'Errors', error);
          this.setState({
            buttonState: 'verify_otp',
            request: false
          });
        });
    }
  }
  renderButtons() {
    const { edited, verified, otp_sent, otp_verified, saved } = this.state;
    name =
      this.state.buttonState == 'send_otp'
        ? 'SEND OTP'
        : this.state.buttonState == 'verify_otp'
        ? 'VERIFY OTP'
        : 'Wait';
    if (edited || verified || otp_sent || otp_verified || saved) {
      return (
        <View
          style={{ flexDirection: 'row', alignItems: 'stretch', margin: 10 }}
        >
          <Button
            raised
            buttonStyle={{
              backgroundColor: '#34495E',
              borderRadius: 3,
              width: ScreenWidth
            }}
            textStyle={{
              textAlign: 'center',
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: 16
            }}
            title={name}
            onPress={
              this.state.buttonState == 'send_otp'
                ? this.send_otp.bind(this)
                : this.verify_otp.bind(this)
            }
          />
        </View>
      );
    } else {
      return null;
    }
  }
  renderSpinner() {
    return <Spinner color="green" />;
  }
  renderFailedComponent() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity onPress={this.loadData.bind(this)}>
          {failedToLoadScreen()}
        </TouchableOpacity>
      </ScrollView>
    );
  }
  renderContent() {
    return (
      <ScrollView keyboardDismissMode="none" keyboardShouldPersistTaps="always">
        {this.renderFields()}
        {this.renderButtons()}
      </ScrollView>
    );
  }
  render() {
    return this.renderContent();
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#fff',
    margin: 10,
    backgroundColor: 'white'
  },
  cardTitle: {
    paddingLeft: 5,
    color: 'rgb(52, 73, 94)',
    fontSize: 18
  },
  nextButtonStyle: {
    flex: 1,
    height: 40,
    borderRadius: 2,
    padding: 7,
    margin: 0
  },
  nextButtonLabel: {
    color: 'white',
    fontSize: 16
  }
});
const mainCard = {
  card: {
    margin: 0,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  cardTitle: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#fafafa',
    borderBottomColor: '#f3f3f3',
    borderBottomWidth: 1,
    padding: 10
  },
  cardContent: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#fafafa',
    borderRightWidth: 1,
    borderBottomColor: '#f3f3f3'
  },
  cardFooter: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ffffff',
    padding: 0
  }
};
