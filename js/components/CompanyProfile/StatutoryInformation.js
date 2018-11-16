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
import { Icon } from 'native-base';
import { Card, CardTitle, CardContent, Separator } from '../Card';
import * as Colors from '../../commons/colors';
import * as Constants from '../../commons/Constants';
import Text from '../Text';
import { isEmpty, isPhoneNumber } from '../../commons/Utils';

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

export default class StatutoryInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      buttonState: 'idle',
      form_data: this.getDefaultFormData(),
      new_form_data: this.getDefaultFormData()
    };
  }
  getDefaultFormData() {
    return {
      account_number: '',
      account_type: '',
      associated_bank: '',
      beneficiary_name: '',
      cst_number: '',
      ifsc_code: '',
      pan_number: '',
      tan_number: '',
      vat_number: ''
    };
  }
  componentDidMount() {
    let statutory_information = this.props.companyState.data
      .statutory_information;
    this.resetState(statutory_information);
  }
  componentWillReceiveProps(nextProps) {
    const prevState = this.props.companyState;
    const nextState = nextProps.companyState;

    if (!prevState.complete && nextState.complete) {
      this.resetState(nextState.data.statutory_information);
    }
  }
  resetState(statutory_information) {
    let new_data = this.getDefaultFormData();
    this.setState({
      editing: false,
      buttonState: 'idle'
    });
    if (statutory_information.account_no) {
      new_data['account_number'] = statutory_information.account_no;
    }
    if (statutory_information.account_type) {
      new_data['account_type'] = statutory_information.account_type;
    }
    if (statutory_information.banker) {
      new_data['associated_bank'] = statutory_information.banker;
    }
    if (statutory_information.beneficiary) {
      new_data['beneficiary_name'] = statutory_information.beneficiary;
    }
    if (statutory_information.central_sales_tax_no) {
      new_data['cst_number'] = statutory_information.central_sales_tax_no;
    }
    if (statutory_information.ifsc_code) {
      new_data['ifsc_code'] = statutory_information.ifsc_code;
    }
    if (statutory_information.pan) {
      new_data['pan_number'] = statutory_information.pan;
    }
    if (statutory_information.tan) {
      new_data['tan_number'] = statutory_information.tan;
    }
    if (statutory_information.vat_registration_no) {
      new_data['vat_number'] = statutory_information.vat_registration_no;
    }

    this.setState({
      form_data: Object.assign({}, new_data),
      new_form_data: Object.assign({}, new_data)
    });
  }
  onChangeTextFieldValue(text, key) {
    let newState = {};
    newState[key] = text;
    this.setState(newState);
  }

  saveStatutoryData() {
    const {
      saveStatutoryData,
      companyState,
      userState,
      showAlert
    } = this.props;
    const {
      account_number,
      account_type,
      associated_bank,
      beneficiary_name,
      cst_number,
      ifsc_code,
      pan_number,
      tan_number,
      vat_number
    } = this.state.new_form_data;
    if (
      isEmpty(beneficiary_name) ||
      isEmpty(associated_bank) ||
      isEmpty(pan_number) ||
      isEmpty(cst_number) ||
      isEmpty(vat_number) ||
      isEmpty(account_number) ||
      isEmpty(ifsc_code)
    ) {
      showAlert('info', 'Save Error', 'Please enter necessary details');
    } else {
      let credentials = {
        company_id: companyState.data.company.id,
        statutory_information: {
          account_number: account_number,
          account_type: account_type,
          associated_bank: associated_bank,
          beneficiary_name: beneficiary_name,
          cst_number: cst_number,
          ifsc_code: ifsc_code,
          pan_number: pan_number,
          tan_number: tan_number,
          vat_number: vat_number
        },
        user_id: userState.user.id
      };
      this.updateStatutoryData(companyState.data.company.id, credentials);
    }
  }
  updateStatutoryData(companyId, data) {
    const { saveStatutoryData, showAlert } = this.props;
    this.setState({ buttonState: 'busy' });
    saveStatutoryData(companyId, data).then(data => {
      this.setState({ buttonState: 'idle' });
      if (!!data.error) {
        showAlert('info', 'Save Error', data.error);
      } else {
        showAlert(
          'info',
          'Request Successful',
          'Request to change statutory information has been mailed to company admin'
        );
      }
    });
  }
  onEdit() {
    this.setState({ editing: true });
  }
  onCancelSave() {
    this.resetState(this.state.form_data);
    this.setState({
      editing: false
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
  renderEditButtonComponent() {
    let component = <View style={{ flex: 1 }} />;
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
            marginBottom: 0,
            padding: 0
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
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
              onPress={() => this.saveStatutoryData.bind(this)}
            />
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
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
          value={this.state.new_form_data[key]}
          defaultValue={this.state.new_form_data[key]}
          editable={editable}
          labelStyle={this.getLabelStyle()}
          inputStyle={this.getInputStyle()}
          onChangeText={text => this.setFormData(key, text)}
        />
      </View>
    );
  }
  render() {
    const companyState = this.props.companyState.data;
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
            paddingTop: 10
          }}
        >
          <View style={{ flex: 2, alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>Statutory Information</Text>
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
              'Beneficiary Name',
              'beneficiary_name',
              'words',
              false,
              this.state.editing
            )}
            {this.renderTextField(
              'Bank Account Number',
              'account_number',
              'none',
              false,
              this.state.editing,
              'numeric'
            )}
            {this.renderTextField(
              'Banker (Associated Bank)',
              'associated_bank',
              'words',
              false,
              this.state.editing
            )}
            {this.renderTextField(
              'Account Type',
              'account_type',
              'words',
              false,
              this.state.editing
            )}
            {this.renderTextField(
              'IFSC code',
              'ifsc_code',
              'characters',
              false,
              this.state.editing
            )}
            {this.renderTextField(
              'TAN Number',
              'tan_number',
              'characters',
              false,
              this.state.editing
            )}
            {this.renderTextField(
              'PAN Number',
              'pan_number',
              'characters',
              false,
              this.state.editing
            )}
            {this.renderTextField(
              'Central Sales Tax Number',
              'beneficiary_name',
              'words',
              false,
              this.state.editing
            )}
            {this.renderTextField(
              'Value Added Tax Registration Number',
              'vat_number',
              'characters',
              false,
              this.state.editing
            )}
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
