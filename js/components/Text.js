import React, { Component } from 'react';
// import * as Constants from '../commons/Constants';
import { View, Text, StyleSheet } from 'react-native';

export default class BizongoTextView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const newStyles = this.props.style || {};
    return (
      <Text
        accessible={this.props.accessible}
        ellipsizeMode={this.props.ellipsizeMode}
        numberOfLines={this.props.numberOfLines}
        onLayout={this.props.onLayout}
        onLongPress={this.props.onLongPress}
        onPress={this.props.onPress}
        testID={this.props.testID}
        style={[styles.textStyle, newStyles]}
      >
        {this.props.children}
      </Text>
    );
  }
}
BizongoTextView.defaultProps = {
  accessible: true,
  ellipsizeMode: 'tail',
  numberOfLines: 10
};

const styles = StyleSheet.create({
  textStyle: {
    // fontFamily: Constants.MAIN_FONT,
    fontSize: 16
  }
});
