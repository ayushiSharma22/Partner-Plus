import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Text from '../../Text';
import * as Colors from '../../../commons/colors';

let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;

export default class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100
    };
  }
  onClick() {
    if (!this.props.active) {
      this.props.changeTab(this.props.tab_index);
    }
  }

  setWidth(event) {
    const { width } = event.nativeEvent.layout;
    let w = 0.9 * width;
    this.setState({
      width: w,
      inputWidth: w - 20
    });
  }

  render() {
    activeCover = {};
    activeTitle = {};
    if (this.props.active) {
      activeCover = styles.activeTabTextCover;
      activeTitle = styles.activeTabTitle;
    }
    return (
      <TouchableOpacity
        style={[styles.tabView]}
        onPress={() => this.props.changeTab(this.props.tab_index)}
        onLayout={event => this.setWidth(event)}
      >
        <View style={[styles.tabTextCover, activeCover]}>
          <Text style={[styles.tabTitle, activeTitle]} numberOfLines={3}>
            {this.props.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: (1 / 3) * ScreenWidth,
    height: 0.07 * ScreenHeight
  },
  tabTitle: {
    textAlign: 'center',
    color: Colors.TEXT_BLACK,
    fontSize: 0.03 * ScreenWidth,
    padding: 5,
    paddingLeft: 0.03 * ScreenWidth,
    paddingRight: 0.03 * ScreenWidth
  },
  tabTextCover: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeTabTextCover: {
    width: (1 / 3) * ScreenWidth,
    borderBottomColor: Colors.PRIMARY_BLUE,
    borderBottomWidth: 5
  },
  activeTabTitle: {
    fontWeight: 'bold',
    color: Colors.PRIMARY_BLUE
  }
});
