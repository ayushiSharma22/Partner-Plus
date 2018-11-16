import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Text from './Text';
import * as Colors from '../commons/colors';
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    color: '#00AFD7',
    margin: 0,
    padding: 0,
    fontSize: 15
  }
});
let ScreenWidth = Dimensions.get('window').width;
const bgColors = {
  primary: Colors.PRIMARY_BLUE,
  success: Colors.GREEN,
  info: Colors.SECONDARY_BLUE,
  warning: Colors.YELLOW,
  danger: Colors.RED,
  disabled: Colors.BACKGROUND_GREY
};
let imgWidth = 300;

export default class TransparentButton extends Component {
  constructor(props) {
    super(props);
    // let person = Object.assign(styles.button, this.props.buttonStyle);
  }
  render() {
    return (
      <Text style={styles.button} onPress={this.props.pressAction}>
        {this.props.buttonName}
      </Text>
    );
  }
}

export class Badge extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View
            style={[
              BadgeStyles.badgeView,
              {
                backgroundColor: this.props.hollow
                  ? '#FFFFFF'
                  : bgColors[this.props.status],
                borderColor: bgColors[this.props.status],
                borderWidth: this.props.borderWidth || 0,
                height: ((this.props.hollow ? 5 : 4) * this.props.fontSize) / 3,
                width: this.props.width || 'auto',
                borderRadius: this.props.borderRadius || 2,
                paddingLeft: this.props.paddingLeft || 0.01 * ScreenWidth,
                paddingRight: this.props.paddingRight || 0.01 * ScreenWidth
              }
            ]}
          >
            <Text
              style={[
                BadgeStyles.badgeText,
                {
                  fontSize: this.props.fontSize || 12,
                  color: this.props.hollow
                    ? bgColors[this.props.status]
                    : '#FFFFFF'
                }
              ]}
            >
              {this.props.message}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const BadgeStyles = StyleSheet.create({
  badgeView: {
    marginLeft: 1,
    marginRight: 1
  },
  badgeBackground: {
    backgroundColor: 'green'
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    padding: 0,
    margin: 0,
    textAlign: 'center'
  }
});

export function Sanitize(str) {
  var StrippedString = str.replace(/(<([^>]+)>)/gi, '');
  return StrippedString.trim();
}

export function renderEmptyScreen(
  title = 'No content',
  message = "Currently we don't have any content for you"
) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        paddingLeft: 20,
        paddingRight: 20
      }}
    >
      <Image source={require('../../img/empty.png')} resizeMode="cover" />
      <Text style={{ color: '#34495e', fontSize: 20, fontWeight: 'bold' }}>
        {title}
      </Text>
      <Text style={{ color: '#656565' }}>{message}</Text>
    </View>
  );
}

export function failedToLoadScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 50
      }}
      onLayout={event => {
        const { width, height } = event.nativeEvent.layout;
        let w = width;
        if (height > width) {
          w = height;
        }
        imgWidth: w / 2;
      }}
    >
      <Image
        source={require('../../img/failed_to_load.png')}
        style={{
          width: imgWidth,
          height: imgWidth
        }}
        resizeMode={Image.resizeMode.contain}
      />
      <Text style={{ color: '#34495e', fontSize: 20, fontWeight: 'bold' }}>
        Failed to load
      </Text>
      <Text style={{ color: '#656565' }}>Tap to retry</Text>
    </View>
  );
}
