import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import { Icon } from 'native-base';
import Text from '../Text';
import * as Colors from '../../commons/colors';
import * as Constants from '../../commons/Constants';
import { isEmpty, isPhoneNumber } from '../../commons/Utils';
import * as AuthServices from '../../services/AuthServices';
// var Analytics = require('react-native-firebase-analytics');
let ScreenWidth = Dimensions.get('window').width;

let ScreenHeight = Dimensions.get('window').height;
let LIST_OF_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

export default class CompanyDetails extends Component {
  constructor(props) {
    super(props);
    const companyState = this.props.companyState.data.company;
    this.state = {
      editing: false,
      behavior: 'padding',
      buttonState: 'idle',
      form_data: this.getDefaultFormData(),
      new_form_data: this.getDefaultFormData()
    };
  }

  getDefaultFormData() {
    return {
      company_name: '',
      business_category: '',
      new_business_category: '',
      contact_number: '',
      fax: '',
      gstin: '',
      website: '',
      address: '',
      city: '',
      state: '',
      country: 'India',
      pincode: ''
    };
  }

  componentDidMount() {
    const companyState = this.props.companyState.data.company;
    this.resetState(companyState);
  }

  componentWillReceiveProps(nextProps) {
    const prevState = this.props.companyState;
    const nextState = nextProps.companyState;

    if (!prevState.complete && nextState.complete) {
      this.resetState(nextState.data.company);
    }
  }

  resetState(companyState) {
    const { signupState } = this.props;
    let new_data = this.getDefaultFormData();
    this.setState({
      editing: false,
      buttonState: 'idle'
    });
    if (companyState.name) {
      new_data['company_name'] = companyState.name;
    }
    if (companyState.business_category) {
      let listCategories = signupState.listCategories;
      let flag = false;
      for (var i = 0; i < listCategories.length; i++) {
        if (companyState.business_category === listCategories[i]) {
          flag = true;
        }
      }
      if (flag) {
        new_data['business_category'] = companyState.business_category;
      } else {
        new_data['business_category'] = 'Other';
        new_data['new_business_category'] = companyState.business_category;
      }
    }
    if (companyState.contact_number) {
      new_data['contact_number'] = companyState.contact_number.substr(
        companyState.contact_number.length - 10
      );
    }
    if (companyState.registered_address.street_address) {
      new_data['address'] = companyState.registered_address.street_address;
    }
    if (companyState.registered_address.city) {
      new_data['city'] = companyState.registered_address.city;
    }
    if (companyState.registered_address.gstin) {
      new_data['gstin'] = companyState.registered_address.gstin;
    }
    if (companyState.registered_address.state) {
      new_data['state'] = companyState.registered_address.state;
    }
    if (companyState.registered_address.country) {
      new_data['country'] = companyState.registered_address.country;
    }
    if (companyState.registered_address.pincode) {
      new_data['pincode'] = companyState.registered_address.pincode + '';
    }

    this.setState({
      form_data: Object.assign({}, new_data),
      new_form_data: Object.assign({}, new_data)
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
        color: Colors.SECONDARY_BLUE,
        fontFamily: Constants.MAIN_FONT,
        padding: 0,
        borderBottomWidth: 1,
        borderBottomColor: Colors.TEXT_BLACK
      };
    } else {
      return {
        color: Colors.MAIN_GREY,
        fontFamily: Constants.MAIN_FONT,
        padding: 0,
        borderBottomWidth: 1,
        borderBottomColor: Colors.TEXT_BLACK
      };
    }
  }

  getTextStyle() {
    return { fontSize: 15, fontFamily: Constants.MAIN_FONT, width: '100%' };
  }

  saveCompanyDetails() {
    const { saveCompanyDetails, companyState, showAlert } = this.props;
    const {
      company_name,
      gstin,
      new_business_category,
      business_category,
      contact_number,
      fax,
      website,
      address,
      city,
      state,
      country,
      pincode
    } = this.state.new_form_data;
    if (
      isEmpty(company_name) ||
      isEmpty(business_category) ||
      isEmpty(contact_number) ||
      isEmpty(address) ||
      isEmpty(city) ||
      isEmpty(state) ||
      isEmpty(country) ||
      isEmpty(pincode) ||
      (isEmpty(gstin) && AuthServices.getGST())
    ) {
      showAlert('info', 'Save Error', 'Please enter all the details');
    } else {
      if (!isPhoneNumber(contact_number)) {
        showAlert('info', 'Save Error', 'Please enter valid phone number');
      } else {
        if (business_category === 'Other' && isEmpty(new_business_category)) {
          showAlert('info', 'Save Error', 'Please enter new Business Category');
        } else {
          let credentials = {
            id: companyState.data.company.id,
            company: {
              name: company_name,
              business_category:
                business_category === 'Other'
                  ? new_business_category
                  : business_category,
              contact_number: contact_number,
              website: website,
              address: address,
              city: city,
              state: state,
              country: country,
              pincode: pincode
            }
          };
          if (AuthServices.getGST()) {
            credentials['company']['gstin'] = gstin;
          }
          this.updateCompanyDetails(companyState.data.company.id, credentials);
        }
      }
    }
  }

  updateCompanyDetails(companyId, data) {
    const { saveCompanyDetails, showAlert } = this.props;
    this.setState({ buttonState: 'busy' });
    saveCompanyDetails(companyId, data).then(data => {
      this.setState({ buttonState: 'idle' });
      if (!!data.error) {
        showAlert('info', 'Save Error', data.error);
      } else {
        showAlert(
          'info',
          'Saved Successfully',
          'Your changes have been saved successfully'
        );
      }
    });
  }

  onEdit() {
    const { signupState, loadCategories } = this.props;
    loadCategories();
    this.setState({ editing: true });
  }

  onChangeTextFieldValue(text, key) {
    let newState = {};
    newState[key] = text;
    this.setState(newState);
  }

  onCancelSave() {
    const companyState = this.props.companyState.data.company;
    this.resetState(companyState);
    this.setState({
      editing: false
    });
  }

  dropDownRenderRow(rowData, rowID, highlighted) {
    let color = Colors.MAIN_GREY;
    if (highlighted) {
      color = Colors.SECONDARY_BLUE;
    }
    return (
      <View
        style={{ padding: 10, paddingLeft: 10, paddingRight: 10, height: 40 }}
      >
        <Text style={[this.getTextStyle(), { color: color }]}>{rowData}</Text>
      </View>
    );
  }

  renderBusinessCategoryComponent() {
    const { signupState } = this.props;
    let listCategories = signupState.listCategories;
    const data = [],
      dropdownData = [];
    var i = 0;
    for (i = 0; i < listCategories.length; i++) {
      data.push({ key: i, label: listCategories[i] });
      dropdownData.push(listCategories[i]);
    }
    data.push({ key: i++, label: 'Other' });
    dropdownData.push('Other');
    if (this.state.editing) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'stretch',
            paddingBottom: 10
          }}
        >
          <View
            style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch' }}
          >
            <View>
              <Text style={{ color: Colors.SECONDARY_GREY, fontSize: 16 }}>
                Business Category
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'stretch',
                borderBottomColor: Colors.GREY,
                borderBottomWidth: 1
              }}
            >
              <ModalDropdown
                style={{
                  height: 0.06 * ScreenHeight,
                  width: '100%',
                  padding: 5,
                  paddingLeft: 0
                }}
                defaultValue={this.state.new_form_data['business_category']}
                textStyle={[
                  this.getTextStyle(),
                  { color: Colors.SECONDARY_BLUE }
                ]}
                options={dropdownData}
                renderRow={this.dropDownRenderRow.bind(this)}
                onSelect={(index, value) =>
                  this.onChangeTextFieldValue(value, 'business_category')
                }
              />
            </View>
          </View>
        </View>
      );
    } else {
      if (this.state.new_form_data['business_category'] === 'Other') {
        return this.renderTextField(
          'Business Category',
          'new_business_category',
          'words',
          false,
          this.state.editing
        );
      } else {
        return this.renderTextField(
          'Business Category',
          'business_category',
          'words',
          false,
          this.state.editing
        );
      }
    }
  }

  setFormData(key, value) {
    let new_form_data = Object.assign({}, this.state.new_form_data);
    new_form_data[key] = value;

    this.setState({ new_form_data: new_form_data });
  }

  renderTextField(
    label,
    key,
    autoCapitalize = 'none',
    autoCorrect = false,
    editable = true,
    keyboardType = 'default'
  ) {
    return (
      <View>
        <Text style={styles.labelText}>{label}</Text>
        <TextInput
          style={{
            padding: 0,
            paddingLeft: 20,
            height: 0.06 * ScreenHeight,
            borderColor: '#C4C4C4',
            borderBottomWidth: 1,
            borderWidth: 0,
            backgroundColor: '#FFFFFF'
          }}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          autoCorrect={autoCorrect}
          underlineColorAndroid={'transparent'}
          editable={editable}
          labelStyle={this.getLabelStyle()}
          inputStyle={this.getInputStyle()}
          onChangeText={text => this.setFormData(key, text)}
          value={this.state.new_form_data[key]}
          defaultValue={this.state.new_form_data[key]}
        />
      </View>
    );
  }

  renderSelectStateComponent() {
    if (this.state.editing) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'stretch',
            paddingBottom: 10
          }}
        >
          <View
            style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch' }}
          >
            <View>
              <Text style={{ color: Colors.SECONDARY_GREY, fontSize: 15 }}>
                State
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'stretch',
                borderBottomColor: Colors.GREY,
                borderBottomWidth: 1
              }}
            >
              <ModalDropdown
                style={{
                  height: 0.06 * ScreenHeight,
                  padding: 5,
                  paddingLeft: 0
                }}
                defaultValue={this.state.new_form_data['state']}
                textStyle={[
                  this.getTextStyle(),
                  { color: Colors.SECONDARY_BLUE }
                ]}
                options={LIST_OF_STATES}
                renderRow={this.dropDownRenderRow.bind(this)}
                onSelect={(index, value) =>
                  this.onChangeTextFieldValue(value, 'state')
                }
              />
            </View>
          </View>
        </View>
      );
    } else {
      return this.renderTextField('State', 'state', 'words', false, false);
    }
  }

  renderNewBusinessComponent() {
    const { companyState } = this.props;
    let newBusinessCategoryComponent = <View />;
    if (
      this.state.editing &&
      this.state.new_form_data['business_category'] === 'Other'
    ) {
      newBusinessCategoryComponent = this.renderTextField(
        'Enter new Business Category',
        'new_business_category',
        'words',
        false,
        this.state.editing
      );
    }
    return newBusinessCategoryComponent;
  }

  renderEditButtonComponent() {
    let component = <View />;
    if (!this.state.editing) {
      component = (
        <TouchableOpacity style={{ flex: 1 }} onPress={this.onEdit.bind(this)}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
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

  renderSaveButtons() {
    let component = <View />;
    if (this.state.editing) {
      component = (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'stretch',
            marginBottom: 0
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: -10
            }}
          >
            <Button
              raised
              buttonStyle={{
                backgroundColor: '#34495E',
                borderRadius: 3,
                width: 0.5 * ScreenWidth,
                height: 0.1 * ScreenHeight
              }}
              textStyle={{
                textAlign: 'center',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: 16
              }}
              title={'SAVE'}
              onPress={() => this.saveCompanyDetails.bind(this)}
            />
          </View>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            onPress={this.onCancelSave.bind(this)}
          >
            <View style={[styles.button, styles.cancelButton]}>
              <Text style={[styles.buttonText, styles.cancelText]}>CANCEL</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return component;
  }

  onSegmentChange(segment) {
    this.setState({ behavior: segment.toLowerCase() });
  }

  render() {
    const companyState = this.props.companyState.data;
    const { signupState } = this.props;
    let gst_component = null;
    if (AuthServices.getGST()) {
      gst_component = this.renderTextField(
        'GST Number',
        'gstin',
        'characters',
        false,
        this.state.editing
      );
    }
    return (
      <View
        style={{ flex: 1, margin: 5, elevation: 1, backgroundColor: '#FDFDFE' }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            padding: 20,
            paddingTop: 10,
            paddingBottom: 10
          }}
        >
          <View style={{ flex: 2, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>Company Information</Text>
          </View>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'flex-end' }}
            onPress={this.onEdit.bind(this)}
          >
            <Icon style={{ fontSize: 18, color: '#54575a' }} name="md-create" />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View
          style={{
            flex: 7,
            backgroundColor: '#FFFFFF',
            height: 0.5 * ScreenHeight,
            padding: 20,
            paddingTop: 10
          }}
        >
          <ScrollView
            keyboardDismissMode="none"
            keyboardShouldPersistTaps="always"
          >
            {this.renderTextField(
              'Company Name',
              'company_name',
              'words',
              false,
              this.state.editing
            )}
            {this.renderBusinessCategoryComponent()}
            {this.renderNewBusinessComponent()}
            {this.renderTextField(
              'Contact Number',
              'contact_number',
              'none',
              false,
              this.state.editing,
              'numeric'
            )}
            {this.renderTextField(
              'Address',
              'address',
              'words',
              false,
              this.state.editing
            )}
            {this.renderTextField(
              'City',
              'city',
              'words',
              false,
              this.state.editing
            )}
            {this.renderSelectStateComponent()}
            {this.renderTextField(
              'Country',
              'country',
              'words',
              false,
              this.state.editing
            )}
            {this.renderTextField(
              'PIN Code',
              'pincode',
              'none',
              false,
              this.state.editing,
              'numeric'
            )}
            {gst_component}
          </ScrollView>
        </View>
        <View>{this.renderSaveButtons()}</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 0.05 * ScreenWidth,
    height: 0.1 * ScreenHeight,
    margin: 5,
    width: 0.5 * ScreenWidth
  },
  saveButton: {
    backgroundColor: Colors.SECONDARY_BLUE
  },
  cancelButton: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.PRIMARY_GREY,
    backgroundColor: Colors.BACKGROUND_LIGHT_GREY
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveText: {
    color: Colors.WHITE
  },
  cancelText: {
    color: Colors.ALT_GREY
  },
  labelText: {
    color: Colors.TEXT_BLACK,
    marginTop: 10
  },
  separator: {
    height: 1,
    backgroundColor: '#E9E9E9'
  }
});
