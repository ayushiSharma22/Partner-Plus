import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions
} from 'react-native';
import Text from '../Text';
import { Spinner } from 'native-base';
import { px } from '../../commons/helper';
import * as Colors from '../../commons/colors';
import RadioGroup from 'react-native-radio-buttons-group';
import DatePicker from 'react-native-datepicker';
import Mixpanel from 'react-native-mixpanel';
import { Button } from 'react-native-elements';

let ScreenHeight = Dimensions.get('window').height - 80;
let ScreenWidth = Dimensions.get('window').width;
var data = [
  { label: 'Request Received', value: 'date', color: '#00AFD7', size: 14 },
  { label: 'Time Left', value: 'time', color: '#00AFD7', size: 14 }
];

export default class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      req: false,
      com: false,
      err: false,
      ref: false,
      rating: null,
      sortByValue: '',
      date: null,
      focus: 'startDate',
      noStartDate: true,
      startDate: this.props.startDate ? this.props.startDate : null,
      endDate: this.props.endDate ? this.props.endDate : null,
      name: this.props.name ? this.props.name : 'REQUEST FOR QUOTES'
    };
  }

  componentDidMount() {
    this.setState({ com: true });
  }

  handleRefresh() {
    const { fetchSellerDashboard, showAlert } = this.props;
    this.setState({
      ref: true
    });
    this.loadRatingData();
  }

  renderSortByHeading() {
    return <Text style={styles.ratingHeading}>Sort By</Text>;
  }

  onPress = data => this.setState({ sortByValue: data });

  renderSortByData() {
    return (
      <View style={styles.radioButtons}>
        <RadioGroup radioButtons={data} onPress={this.onPress} />
      </View>
    );
  }

  renderDateRangeHeading() {
    return <Text style={styles.ratingHeading}>Date Range</Text>;
  }

  setStartDate(date) {
    this.setState({ startDate: date, noStartDate: false });
  }

  setEndDate(date) {
    this.setState({ endDate: date });
  }

  renderDateRangeData() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: px(3)
          }}
        >
          <DatePicker
            date={this.state.startDate}
            mode="date"
            style={{ width: '100%' }}
            placeholder="From"
            confirmBtnText="CONFIRM"
            cancelBtnText="CANCEL"
            customStyles={{
              dateInput: {
                borderWidth: 1,
                borderRadius: 3,
                borderColor: '#F9F9F9'
              }
            }}
            onDateChange={date => {
              this.setStartDate(date);
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <DatePicker
            date={this.state.endDate}
            mode="date"
            style={{ width: '100%' }}
            placeholder="Till"
            disabled={this.state.noStartDate}
            min={this.state.startDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                borderWidth: 1,
                borderRadius: 3,
                borderColor: '#F3F3F3'
              }
            }}
            onDateChange={date => {
              this.setEndDate(date);
            }}
          />
        </View>
      </View>
    );
  }

  applyFilter(event, state) {
    let { navigator, showAlert } = this.props;
    if (this.state.startDate && !this.state.endDate) {
      showAlert(
        'error',
        'Invalid Range',
        'Both Start and End Date are mandatory.'
      );
      return null;
    } else if (this.state.endDate < this.state.startDate) {
      showAlert(
        'error',
        'Invalid Range',
        'End Date cannot be less than Start Date'
      );
      return null;
    } else {
      Mixpanel.track('RFQ Filters Applied');
      new_params = {
        startDate: this.state.startDate || '',
        endDate: this.state.endDate || ''
      };
      navigator.push({
        id: 'home',
        activeTab: 'quotes',
        name: this.state.name,
        date_filter: new_params
      });
    }
  }

  renderSubmitButton() {
    return (
      <View style={styles.submitButton}>
        <Button
          raised
          buttonStyle={{
            backgroundColor: '#34495E',
            borderRadius: 0,
            width: ScreenWidth
          }}
          textStyle={{
            textAlign: 'center',
            color: '#FFFFFF',
            fontWeight: 'bold'
          }}
          title={'SUBMIT'}
          onPress={event => this.applyFilter(event, this.state)}
        />
      </View>
    );
  }

  renderView() {
    return (
      <View style={styles.mainBackground}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.ref}
              onRefresh={() => this.handleRefresh()}
            />
          }
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="always"
        >
          <View style={{ padding: px(3) }}>
            {this.renderSortByHeading()}
            {this.renderSortByData()}
            {this.renderDateRangeHeading()}
            {this.renderDateRangeData()}
          </View>
        </ScrollView>
        {this.renderSubmitButton()}
      </View>
    );
  }

  render() {
    if (this.state.com && this.state.com) {
      return this.renderView();
    } else if (this.state.err) {
      return this.renderFailedComponent();
    } else {
      return <Spinner />;
    }
  }
}

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    backgroundColor: Colors.WHITE
  },
  mainScroll: {
    backgroundColor: Colors.WHITE,
    height: ScreenHeight
  },
  ratingHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: px(3),
    color: Colors.TEXT_BLACK,
    marginTop: 10,
    marginBottom: 10,
    height: 20
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.SECONDARY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    elevation: 1,
    shadowColor: Colors.TEXT_BLACK,
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  radioButtons: {
    alignItems: 'flex-start'
  }
});
