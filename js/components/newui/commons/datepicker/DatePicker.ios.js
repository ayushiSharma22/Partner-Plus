import React, { Component } from 'react';
import { View } from 'react-native';
import DatePicker1 from 'react-native-datepicker';

export default class DatePicker extends Component {
  static defaultProps = {
    date: ''
  };
  state = {
    date: this.props.date
  };
  onDateChange = date => {
    this.setState({ date: date });
  };
  render() {
    return (
      <View>
        <DatePicker1
          date={this.state.date}
          mode="date"
          placeholder={this.props.placeholder}
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36,
              borderWidth: 1,
              borderRadius: 3,
              borderColor: '#f3f3f3'
            }
          }}
          onDateChange={date => {
            this.setState({ date: date });
          }}
        />
      </View>
    );
  }
}
