import React, { Component } from 'react';
import {
  DatePickerAndroid,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
} from 'react-native';

export default class DatePicker extends Component {
  state = {
    simpleText: this.props.placeholder
  };
  showPicker = async (stateKey, options) => {
    try {
      var newState = {};
      const { action, year, month, day } = await DatePickerAndroid.open(
        options
      );
      if (action === DatePickerAndroid.dismissedAction) {
      } else {
        var date = new Date(year, month, day);
        newState[stateKey + 'Text'] = date.toLocaleDateString();
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);
    } catch ({ code, message }) {}
  };
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.showPicker.bind(this, 'simple', {
          date: this.state.simpleDate
        })}
      >
        <Text style={styles.text}>{this.state.simpleText}</Text>
      </TouchableWithoutFeedback>
    );
  }
}
var styles = StyleSheet.create({
  text: {
    color: 'rgb(52, 73, 94)',
    borderWidth: 1,
    borderColor: '#f3f3f3',
    padding: 5,
    marginLeft: 5,
    marginRight: 5
  }
});
