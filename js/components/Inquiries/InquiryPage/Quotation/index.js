import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';
import Moment from 'moment';
import { Button } from 'react-native-elements';
import Text from '../../../Text';
import * as Utils from '../../../../commons/Utils';
import DatePicker from 'react-native-datepicker';
import * as Colors from '../../../../commons/colors';
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;
import Mixpanel from 'react-native-mixpanel';
import { Spinner } from 'native-base';

export default class QuotationSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      req: false,
      com: false,
      err: false,
      requestType: 'submit',
      quote_id: null,
      inputWidth: 250,
      inputWidthSet: false,
      deliveryOption: -1,
      price_type: '',
      inquiry: null,
      formData: {
        price_per_unit: '',
        delivery_charges_per_unit: '',
        valid_till: '',
        gst_percentage: 0,
        dispatch_time: '',
        message: ''
      }
    };
  }

  componentDidMount() {
    this.setState({ init: false, req: true });
    this.loadData();
  }

  loadData() {
    let { inquiry } = this.props;
    quote = inquiry;
    if (!!quote.supplier_quote.price_per_unit) {
      this.setState({ requestType: 'edit', quote_id: quote.id });
      newFormData = Object.assign({}, this.state.formData);
      if (!!quote.supplier_quote.dispatch_time) {
        newFormData.dispatch_time = quote.supplier_quote.dispatch_time.toString();
      }
      if (!!quote.supplier_quote.price_per_unit) {
        newFormData.price_per_unit = quote.supplier_quote.price_per_unit.toString();
      }
      if (!!quote.supplier_quote.delivery_charges_per_unit) {
        newFormData.delivery_charges_per_unit = quote.supplier_quote.delivery_charges_per_unit.toString();
      }
      if (!!quote.product.gst_percentage) {
        newFormData.gst_percentage = quote.product.gst_percentage;
      }
      if (!!quote.supplier_quote.message) {
        newFormData.message = quote.supplier_quote.message;
      }

      if (!!quote.supplier_quote.valid_till) {
        newFormData.valid_till = quote.supplier_quote.valid_till;
        this.setState({
          date: Moment(quote.supplier_quote.valid_till).format('YYYY-MM-DD')
        });
      }
      this.setState({
        formData: newFormData,
        com: true,
        req: false,
        ref: false,
        err: false
      });
    }
    this.setState({
      price_type: quote.price_type,
      inquiry: quote,
      com: true,
      req: false,
      ref: false,
      err: false
    });
  }

  componentWillReceiveProps(nextProps) {
    const prevState = this.props.inquiryState.inquiry;
    const nextState = nextProps.inquiryState.inquiry;
    const { showAlert } = nextProps;
    let { init, req, ref } = this.state;

    if (!prevState.complete && nextState.complete) {
      this.setState({
        req: false,
        ref: false,
        com: true,
        err: false
      });
    }

    if (!prevState.error && nextState.error) {
      if (init || req) {
        showAlert('info', 'Error', nextState.errorMessage);
      }
      this.setState({
        req: false,
        ref: false,
        err: true
      });
    }
  }

  handleChangeText(key, value) {
    let newForm = this.state.formData;
    newForm[key] = value;

    this.setState({ formData: newForm });
  }

  dateValidator(str) {
    var timestamp = Date.parse(str);
    if (isNaN(timestamp) == false) {
      return 1;
    }
    return 0;
  }

  selectDate(text) {
    const { showAlert } = this.props;
    if (!this.dateValidator(text)) {
      showAlert('info', 'Date error', 'Invalid date selected');
      return;
    }
    this.setState({
      date: text
    });
    this.handleChangeText('valid_till', new Date(text).toISOString());
  }

  renderQuoteValidity() {
    let { valid_till } = this.state.formData;
    date = new Date();
    if (!!valid_till) {
      date = new Date(valid_till);
    }
    return (
      <View>
        <View style={{ paddingTop: 5 }}>
          <Text style={styles.labelText}>
            Quote Valid Till
            <Text style={{ color: '#E84855' }}>*</Text>
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'stretch',
            borderWidth: 1,
            borderColor: '#C4C4C4',
            height: 0.06 * ScreenHeight
          }}
        >
          <DatePicker
            date={date}
            mode="date"
            format="DD-MMM-YYYY"
            placeholder=""
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              height: 0.057 * ScreenHeight
            }}
            confirmBtnText="CONFIRM"
            cancelBtnText="CANCEL"
            customStyles={{
              dateInput: {
                borderWidth: 0,
                height: 0.06 * ScreenHeight
              },
              dateIcon: {
                position: 'absolute',
                right: 0,
                top: 0
              }
            }}
            onDateChange={(text, b) => this.selectDate(text)}
          />
        </View>
      </View>
    );
  }

  renderTextField(
    label,
    form_key,
    keyboardType = 'default',
    mandatory = true,
    multiline = false,
    autoCapitalize = 'none',
    autoCorrect = false
  ) {
    return (
      <View
        onLayout={event => {
          var { x, y, width, height } = event.nativeEvent.layout;
          if (!this.state.inputWidthSet) {
            this.setState({ inputWidth: width, inputWidthSet: true });
          }
        }}
      >
        <Text style={styles.labelText}>
          {label}
          <Text style={{ color: '#E84855' }}>{mandatory ? '*' : ''}</Text>
        </Text>
        <TextInput
          style={{
            padding: 0,
            paddingLeft: 20,
            height: 0.06 * ScreenHeight,
            borderColor: '#C4C4C4',
            borderWidth: 1,
            backgroundColor: '#FFFFFF'
          }}
          value={this.state.formData[form_key]}
          onChangeText={text => this.handleChangeText(form_key, text)}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          autoCorrect={autoCorrect}
          editable={true}
          multiline={multiline}
          underlineColorAndroid={'transparent'}
        />
      </View>
    );
  }

  renderFields() {
    let priceType = this.state.price_type;
    if (priceType === 'included_in_price') {
      priceType = '';
    }
    let price_type = Utils.CapitalizeAllWords(Utils.splitToWords(priceType));
    return (
      <View style={styles.inputView}>
        {this.renderTextField(
          'Price Per Unit ' +
            (priceType === '' ? '' : '(') +
            price_type +
            (priceType === '' ? '' : ')'),
          'price_per_unit',
          'numeric'
        )}
        {priceType === '' ? (
          this.renderTextField(
            'Delivery Cost Per Unit ',
            'delivery_charges_per_unit',
            'numeric'
          )
        ) : (
          <Text />
        )}
        {this.renderTextField(
          'Dispatch Time (in days)',
          'dispatch_time',
          'numeric'
        )}
        {this.renderQuoteValidity()}
        {this.renderTextField('Comment', 'message', 'default', false, true)}
      </View>
    );
  }

  validateForm() {
    let { showAlert } = this.props;
    let { price_type } = this.state;
    let {
      price_per_unit,
      valid_till,
      delivery_charges_per_unit,
      dispatch_time
    } = this.state.formData;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (
      Utils.isEmpty(price_per_unit) ||
      Utils.isEmpty(dispatch_time) ||
      (price_type == 'included_in_price' &&
        Utils.isEmpty(delivery_charges_per_unit))
    ) {
      showAlert('info', 'Error', 'Please enter required fields');
      return false;
    } else if (!Utils.checkPositive(price_per_unit)) {
      showAlert(
        'info',
        'Error',
        'Please enter a Price Per Unit as valid number and greater than Zero.'
      );
      return false;
    } else if (new Date(valid_till) < currentDate) {
      showAlert('info', 'Error', "Valid date can't be set before today");
      return false;
    } else if (!Utils.checkPositive(dispatch_time)) {
      showAlert(
        'info',
        'Error',
        'Please enter Dispatch days as valid number and greater than Zero.'
      );
      return false;
    } else if (
      price_type == 'included_in_price' &&
      !Utils.checkPositive(delivery_charges_per_unit)
    ) {
      showAlert(
        'info',
        'Error',
        'Please enter Delivery Charges per unit as valid number and greater than Zero.'
      );
      return false;
    }
    return true;
  }

  submitAction() {
    let {
      submitQuote,
      editQuote,
      showAlert,
      inquiry_id,
      navigator,
      inquiry
    } = this.props;
    let { requestType, quote_id, price_type } = this.state;
    if (this.validateForm()) {
      data = Object.assign({}, this.state.formData);
      data.price_per_unit = parseFloat(data.price_per_unit);
      data.dispatch_time = parseFloat(data.dispatch_time);
      price_type === 'included_in_price'
        ? (data.delivery_charges_per_unit = parseFloat(
            data.delivery_charges_per_unit
          ))
        : '';
      data.id = inquiry.supplier_quote.id;
      data.supplier_id = inquiry.supplier_quote.supplier_id;
      data.request_for_quote_supplier_relation_id =
        inquiry.supplier_quote.request_for_quote_supplier_relation_id;
      delete data['comment'];
      delete data['gst_percentage'];
      if (this.state.formData.message) {
        data.message_attributes = { content: this.state.formData.message };
      }
      req = Object.assign({});

      if (requestType === 'submit') {
        this.setState({ progress: true });
        req.supplier_quotes = [data];
        submitQuote(req, inquiry_id).then(data => {
          if (!!data.error) {
            this.setState({ progress: false });
            showAlert('info', 'Error', data.error);
          } else {
            Mixpanel.track('Quote Submitted');
            this.setState({ progress: false });
            navigator.replacePreviousAndPop({
              id: 'inquiry',
              inquiry_id: inquiry_id,
              name: 'QUOTES GIVEN'
            });
          }
        });
      } else if (requestType === 'edit') {
        req.supplier_quote = Object.assign({}, data);
        this.setState({ progress: false });
        editQuote(req, inquiry_id, inquiry.supplier_quote.id).then(data => {
          if (!!data.error) {
            this.setState({ progress: false });
            showAlert('info', 'Error', data.error);
          } else {
            Mixpanel.track('Quote Edited');
            this.setState({ progress: false });
            navigator.replacePreviousAndPop({
              id: 'inquiry',
              inquiry_id: inquiry_id,
              name: 'QUOTES GIVEN'
            });
          }
        });
      }
    }
  }

  setWidth(event) {
    const { width, height } = event.nativeEvent.layout;
    let w = 0.9 * width;
    let half = 0.5 * width;
    this.setState({
      halfWidth: half,
      fullWidth: width
    });
  }

  renderButton() {
    let { gst_percentage } = this.state.inquiry.product;
    let { quantity } = this.state.inquiry;
    let { price_per_unit, delivery_charges_per_unit } = this.state.formData;
    let { price_type } = this.state;
    if (
      !delivery_charges_per_unit ||
      (price_type == 'ex_factory' && !!delivery_charges_per_unit)
    ) {
      delivery_charges_per_unit = 0;
    }
    if (
      !price_per_unit ||
      (price_type == 'ex_factory' && !!delivery_charges_per_unit)
    ) {
      delivery_charges_per_unit = 0;
    }
    final_price =
      (parseFloat(price_per_unit) + parseFloat(delivery_charges_per_unit)) *
      quantity *
      (gst_percentage / 100 + 1);
    final_price = final_price.toFixed(2);
    final_price = isNaN(final_price) ? 0 : final_price;
    return (
      <View style={styles.buttonBar}>
        <View
          style={{
            backgroundColor: '#00AFD7',
            padding: 10,
            width: this.state.halfWidth,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: 13, color: '#FFFFFF' }}>
            Final Price (with {gst_percentage}% tax)
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#FFFFFF',
              fontWeight: 'bold',
              justifyContent: 'flex-start'
            }}
          >
            Rs. {final_price}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#54BD48',
            width: this.state.halfWidth,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            buttonStyle={{
              backgroundColor: '#54BD48',
              borderRadius: 0,
              height: 0.07 * ScreenHeight
            }}
            textStyle={{
              textAlign: 'center',
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: 0.02 * ScreenHeight
            }}
            title={'SUBMIT'}
            onPress={() => this.submitAction()}
          />
        </View>
      </View>
    );
  }

  renderContent() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <ScrollView
          style={{ flex: 1, backgroundColor: '#FFFFFF' }}
          contentContainerStyle={{ paddingBottom: 0.1 * ScreenHeight }}
          onLayout={event => this.setWidth(event)}
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="always"
        >
          {this.renderFields()}
        </ScrollView>
        <View>{this.renderButton()}</View>
      </View>
    );
  }

  renderLoading() {
    return (
      <View>
        <View style={{ margin: 10 }}>
          <Spinner />
        </View>
      </View>
    );
  }

  renderError() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity onPress={this.loadData.bind(this)}>
          {failedToLoadScreen()}
        </TouchableOpacity>
      </ScrollView>
    );
  }

  render() {
    let { init, req, com } = this.state;
    if (init || req) {
      return this.renderLoading();
    } else if (com) {
      return this.renderContent();
    } else {
      return this.renderError();
    }
  }
}

const styles = StyleSheet.create({
  headerView: {
    paddingLeft: 5
  },
  labelText: {
    fontSize: 0.03 * ScreenWidth,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: Colors.TEXT_BLACK
  },
  buttonBar: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 0.07 * ScreenHeight,
    width: ScreenWidth
  },
  inputView: {
    backgroundColor: Colors.BACKGROUND_GREY,
    borderRadius: 3,
    margin: 10,
    marginBottom: 0,
    padding: 15,
    paddingBottom: 20
  },
  headerText: {
    color: 'rgb(52, 73, 94)',
    fontSize: 18
  },
  contentView: {
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  propertyView: {
    flex: 1,
    flexDirection: 'row',
    padding: 3
  },
  keyView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  valueView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  keyText: {
    color: '#999999',
    fontWeight: 'bold',
    fontSize: 15
  },
  valueText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  noteTextStyle: {
    color: 'red',
    fontSize: 13
  }
});
