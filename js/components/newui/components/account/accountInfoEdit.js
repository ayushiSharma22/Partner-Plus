import {
  StyleSheet,
  View,
  Image,
  Platform,
  PixelRatio,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import Text from '../../../Text';
import * as Constants from '../../../../commons/Constants';
import React, { Component } from 'react';
import { Spinner, Icon } from 'native-base';
import { isEmpty, isEmail, isPhoneNumber } from '../../../../commons/Utils';
import { Button } from 'react-native-elements';
import { px, py } from '../../../../commons/helper';
import TextField from 'react-native-md-textinput';
import fetchMyProfileDetails from '../../../../services/fetchMyProfile';
import { submitMyProfile } from '../../../../services/fetchMyProfile';
import UploadProfileImage from '../../../../services/uploadProfileImage';
import ImagePicker from 'react-native-image-picker';
import * as Colors from '../../../../commons/colors';
import { Card, CardTitle, CardContent } from '../../../CardThreeLevel';

let ScreenWidth = Dimensions.get('window').width;

export default class Advanced extends Component {
  constructor(props) {
    super(props);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.validateForSubmit = this.validateForSubmit.bind(this);
    this.state = {
      profile: {},
      profile_backup: {},
      editing: false,
      uploadRequest: false,
      uploadComplete: false,
      buttonState: 'idle',
      isLoading: true,
      avatarSource: null,
      videoSource: null,
      avatarId: null
    };
  }
  componentDidMount() {
    var sts = this;
    fetchMyProfileDetails().then(data => {
      sts.setState({
        profile: data,
        profile_backup: Object.assign({}, data),
        isLoading: false
      });
    });
  }
  resetData() {
    let newProfile = Object.assign({}, this.state.profile_backup);
    this.setState({
      profile: newProfile
    });
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

  selectPhotoTapped() {
    const { showAlert, userConfirmation } = this.props;
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        var source;
        let filename = 'file' + new Date().getTime();
        if (Platform.OS === 'android') {
          source = { uri: response.uri, isStatic: true };
        } else {
          source = { uri: response.uri.replace('file://', ''), isStatic: true };
        }
        obj = {
          file: 'data:image/jpg;base64,' + response.data
        };
        this.setState({ uploadRequest: true });
        UploadProfileImage(obj)
          .then(response => {
            if (response.id) {
              let newObj = {
                id: this.state.profile.id,
                avatar_picture_id: response.id
              };
              submitMyProfile(this.state.profile.id, newObj).then(data => {
                if (data.error) {
                  this.setState({ uploadRequest: false });
                  showAlert('info', 'Error', data.error);
                } else if (data.errors) {
                  this.setState({ uploadRequest: false });
                  showAlert('info', 'Error', data.errors);
                } else {
                  this.setState({
                    uploadRequest: false,
                    uploadComplete: true,
                    avatarSource: source
                  });
                  userConfirmation();
                  showAlert(
                    'info',
                    'Profile Pic',
                    'Profile Picture updated successfully'
                  );
                }
              });
            } else {
              this.setState({ uploadRequest: false });
              if (response.error) {
                showAlert('info', 'Error', response.error);
              } else if (response.errors) {
                showAlert('info', 'Error', response.errors);
              } else {
                showAlert('info', 'Error', 'Unable to upload image');
              }
            }
          })
          .catch(response => {
            this.setState({ uploadRequest: false });
            showAlert('info', 'Error', response);
          });
      }
    });
  }
  validateForSubmit() {
    var profile = this.state.profile;
    if (!this.validator('first_name', profile.first_name)) {
      return false;
    } else if (!this.validator('last_name', profile.last_name)) {
      return false;
    } else if (!this.validator('email', profile.email)) {
      return false;
    }
    return true;
  }

  handleSubmit(event, state) {
    const { showAlert, userConfirmation } = this.props;
    if (!this.validateForSubmit()) {
      return;
    }
    this.setState({ buttonState: 'busy' });
    var obj = {};
    var profile = state.profile;
    var first_name = profile.first_name;
    var last_name = profile.last_name;
    var email = profile.email;
    // var contact_number = profile.contact_number;
    var profileId = profile.id;
    var job_title = profile.job_title;
    obj['id'] = this.state.profile.id;
    obj['name'] = first_name + ' ' + last_name;
    obj['email'] = email;
    // obj['contact_number'] = contact_number;
    obj['job_title'] = job_title;
    // if(this.state.avatarId!==null){
    //   obj['avatar_picture_id'] = this.state.avatarId;
    // }

    submitMyProfile(this.state.profile.id, obj)
      .then(response => {
        this.setState({ buttonState: 'idle' });
        if (response.error) {
          showAlert('info', 'Error', response.error);
        } else if (response.errors) {
          showAlert('info', 'Error', response.errors);
        } else {
          this.setState({ editing: false });
          showAlert('info', 'Update Successful', 'Profile has been updated.');
          userConfirmation();
        }
      })
      .catch(error => {});
  }
  styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      width: px(100),
      marginBottom: py(0),
      paddingTop: py(1),
      paddingBottom: py(1),
      paddingRight: px(0),
      borderRadius: 0,
      elevation: 1,
      borderBottomWidth: px(0.1),
      borderColor: '#DCDCDC',
      shadowColor: '#000000',
      shadowOpacity: 0,
      shadowRadius: 1,
      shadowOffset: {
        height: 1,
        width: 0.3
      },
      backgroundColor: '#fff'
    },
    textField: {
      width: px(100)
    }
  });
  validator(field, value) {
    const { showAlert } = this.props;
    switch (field) {
      case 'first_name':
        var vd = isEmpty(value);
        if (vd) {
          showAlert('info', 'Error', 'Please enter a First Name');
          return false;
        }
        return true;
        break;
      case 'last_name':
        var vd = isEmpty(value);
        if (vd) {
          showAlert('info', 'Error', 'Please enter a Last Name');
          return false;
        }
        return true;
        break;
      case 'email':
        var vd = isEmail(value);
        if (!vd) {
          showAlert('info', 'Error', 'Invalid Email ID');
          return false;
        }
        return true;
        break;
      case 'contact_number':
        var vd = isPhoneNumber(value);
        if (vd) {
          showAlert('info', 'Error', 'Invalid Phone ID');
          return false;
        }
        return true;
        break;
      case 'role':
        var vd = isEmpty(value);
        if (vd) {
          showAlert('info', 'Error', 'Invalid Role');
          return false;
        }
        return true;
        break;
    }
  }
  handleChange(field, value) {
    profileNew = this.state.profile;
    profileNew[field] = value;
    this.setState({ profile: profileNew });
  }
  onEdit() {
    if (this.state.editing) {
      this.resetData();
    }
    this.setState({ editing: !this.state.editing });
  }
  renderEditButtonComponent() {
    let component = <View />;
    if (!this.state.editing) {
      component = (
        <TouchableOpacity style={{ flex: 1 }} onPress={this.onEdit.bind(this)}>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'flex-end'
            }}
          >
            <Text>
              <Icon style={{ fontSize: 18 }} name="md-create" />
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return component;
  }
  renderContactNumber() {
    if (!this.state.editing) {
      return (
        <TextField
          label={'Contact Number'}
          keyboardType="numeric"
          editable={this.state.editing}
          labelStyle={this.getLabelStyle()}
          inputStyle={this.getInputStyle()}
          onChangeText={(text, id) => this.handleChange('contact_number', text)}
          value={this.state.profile.contact_number}
          autoCorrect={false}
        />
      );
    }
    return null;
  }
  renderFields() {
    return (
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
              <Text style={styles.cardTitle}>Info</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
              }}
            >
              {this.renderEditButtonComponent()}
            </View>
          </View>
        </CardTitle>
        <CardContent styles={mainCard}>
          <ScrollView
            keyboardDismissMode="none"
            keyboardShouldPersistTaps="always"
          >
            <TextField
              label={'First Name'}
              autoCapitalize="words"
              editable={this.state.editing}
              labelStyle={this.getLabelStyle()}
              inputStyle={this.getInputStyle()}
              onChangeText={(text, id) => this.handleChange('first_name', text)}
              value={this.state.profile.first_name}
              labelPadding="10"
              autoCorrect={false}
            />
            <TextField
              label={'Last Name'}
              autoCapitalize="words"
              editable={this.state.editing}
              labelStyle={this.getLabelStyle()}
              inputStyle={this.getInputStyle()}
              onChangeText={(text, id) => this.handleChange('last_name', text)}
              value={this.state.profile.last_name}
              autoCorrect={false}
            />
            <TextField
              label={'Email Id'}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={this.state.editing}
              labelStyle={this.getLabelStyle()}
              inputStyle={this.getInputStyle()}
              onChangeText={(text, id) => this.handleChange('email', text)}
              value={this.state.profile.email}
              autoCorrect={false}
            />
            {this.renderContactNumber()}
          </ScrollView>
        </CardContent>
      </Card>
    );
  }
  getProperImageURI(uri) {
    if (isEmpty(uri)) {
      return 'https://bytesizemoments.com/wp-content/uploads/2014/04/placeholder3.png';
    } else {
      return uri + '?random_number=' + new Date().getTime();
    }
  }
  renderUploadSpinner() {
    if (this.state.uploadRequest) {
      return <Spinner size="small" />;
    }
    return null;
  }
  renderProfilePictureComponent() {
    let editPhotoText = (
      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
        <View style={{ padding: 10 }}>
          <Icon name="ios-camera" style={{ fontSize: 36, color: '#656565' }} />
        </View>
      </TouchableOpacity>
    );
    return (
      <View>
        <Card styles={mainCard}>
          <CardContent styles={mainCard}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <View style={[styles.avatar, styles.avatarContainer]}>
                {this.state.avatarSource === null ? (
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: this.getProperImageURI(
                        this.state.profile.avatar.normal_250
                      )
                    }}
                  />
                ) : (
                  <Image
                    style={styles.avatar}
                    source={this.state.avatarSource}
                  />
                )}
              </View>
              {editPhotoText}
              {this.renderUploadSpinner()}
            </View>
          </CardContent>
        </Card>
      </View>
    );
  }
  renderButton() {
    if (this.state.editing) {
      return (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10
          }}
        >
          <View style={{ flex: 1 }}>
            <Button
              raised
              buttonStyle={{
                backgroundColor: '#34495E',
                borderRadius: 3,
                width: ScreenWidth / 2.5
              }}
              textStyle={{
                textAlign: 'center',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: 16
              }}
              title={'UPDATE'}
              onPress={event => this.handleSubmit(event, this.state)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              raised
              buttonStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: 3,
                width: ScreenWidth / 2.5
              }}
              textStyle={{
                textAlign: 'center',
                color: '#34495E',
                fontWeight: 'bold',
                fontSize: 16
              }}
              title={'CANCEL'}
              onPress={this.onEdit.bind(this)}
            />
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
  render() {
    if (this.state.isLoading) {
      return <Spinner color="green" />;
    }
    return (
      <View style={styles.mainBackground}>
        <ScrollView
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="always"
        >
          {this.renderProfilePictureComponent()}
          {this.renderFields()}
        </ScrollView>
        {this.renderButton()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_GREY
  },
  cardTitle: {
    paddingLeft: 5,
    color: 'rgb(52, 73, 94)',
    fontSize: 18
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 40,
    width: 80,
    height: 80
  },
  buttonBG: {
    flex: 1,
    padding: 10,
    height: 40
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
    backgroundColor: Colors.WHITE,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#fafafa',
    borderBottomColor: '#f3f3f3',
    borderBottomWidth: 1,
    padding: 10
  },
  cardContent: {
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#fafafa',
    borderRightWidth: 1,
    borderBottomColor: '#f3f3f3'
  },
  cardFooter: {
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ffffff',
    padding: 0
  }
};
