import { View, Image, TouchableOpacity } from 'react-native';
var StyleSheet = require('StyleSheet');
const React = require('react');
import { Icon } from 'native-base';
import { px, py } from '../../../../commons/helper';
import Text from '../../../Text';

export default class Advanced extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageWidth: 50
    };
  }
  styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      width: px(100),
      borderRadius: 0,
      borderBottomWidth: 1,
      elevation: 1,
      borderColor: '#DCDCDC',
      shadowColor: '#000000',
      shadowOpacity: 0,
      shadowRadius: 1,
      shadowOffset: {
        height: 1,
        width: 0.3
      },
      backgroundColor: '#fff'
    },
    imageContainer: {},
    titleContainer: {
      width: px(50)
    },
    iconContainer: {
      marginTop: py(3),
      marginLeft: px(22)
    }
  });

  renderArrow() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Icon
          name="ios-arrow-forward"
          style={{ fontSize: 20, color: '#989898', justifyContent: 'flex-end' }}
        />
      </View>
    );
  }

  renderImage() {
    return (
      <View
        style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}
        onLayout={event => {
          const { width, height } = event.nativeEvent.layout;
          let w = width;
          if (height < width) {
            w = height;
          }
          this.setState({ imageWidth: w - 30 });
        }}
      >
        <Image
          source={this.props.image}
          style={{
            width: this.state.imageWidth,
            height: this.state.imageWidth,
            margin: 15,
            borderRadius: this.state.imageWidth / 2
          }}
          resizeMode="contain"
        />
      </View>
    );
  }
  renderTitleDetails() {
    return (
      <View
        style={{
          flex: 7,
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'center'
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#34495e' }}>
          {this.props.title}
        </Text>
        <Text style={{ fontSize: 14, color: '#656565' }}>
          {this.props.details}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => this.props.onPress()}
      >
        <View style={this.styles.container}>
          {this.renderImage()}
          {this.renderTitleDetails()}
          {this.renderArrow()}
        </View>
      </TouchableOpacity>
    );
  }
}
Advanced.defaultProps = {
  onPress: () => {
    return null;
  },
  imageUrl:
    'https://cdn2.iconfinder.com/data/icons/rcons-users-color/32/maid-512.png',
  title: 'Your Profile',
  details: 'Edit your personal details'
};
