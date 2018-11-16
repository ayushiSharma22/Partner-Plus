import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.mainView}>
          <View
            style={{ flex: 1, flexDirection: 'row', alignItems: 'stretch' }}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 13
              }}
            >
              <Image
                resizeMode="contain"
                style={{ width: 24, height: 24 }}
                source={this.props.icon}
              />
            </View>
            <View
              style={{
                flex: 4,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center'
              }}
            >
              <View>
                <Text style={styles.menuTitle}>{this.props.title}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export class Separator extends Component {
  render() {
    return <View style={styles.separator} />;
  }
}

const styles = StyleSheet.create({
  mainView: {
    margin: 0,
    padding: 0
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#E9E9E9'
  },
  menuTitle: {
    color: '#34495e',
    fontSize: 16
  },
  itemView: {
    padding: 15,
    paddingLeft: 0
  }
});
