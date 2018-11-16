import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Text from '../Text';
import Moment from 'moment';
import { px } from '../../commons/helper';
import * as Colors from '../../commons/colors';
import * as Constants from '../../commons/Constants';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(icomoonConfig);

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;
let svgWidth = 0.03 * ScreenWidth;

export default class DashboardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottomTextMargin: 20
    };
  }

  renderCard() {
    let { userData, rating } = this.props;
    return (
      <View style={styles.welcomeFlex}>
        <View style={{ flex: 2 }}>
          <Text style={styles.headerMain}>Welcome,</Text>
          <Text style={styles.profileName}>{userData.user.name}</Text>
          <Text
            style={[
              styles.bottomText,
              { marginTop: this.state.bottomTextMargin }
            ]}
          >
            Your rating was last updated on{' '}
            {Moment(rating.updated_at).format('DD MMM YYYY')}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: px(10)
          }}
        >
          <View style={styles.ratingBox}>
            <View style={styles.alignMiddle}>
              <Text style={styles.userRating}>{rating.rating}</Text>
              <Text style={styles.userRatingText}>out of 5</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10
            }}
          >
            <Icon
              size={svgWidth}
              color={rating.rating > 0.5 ? '#FFD54F' : '#F9F9F9'}
              name="star"
              style={styles.starMargin}
            />
            <Icon
              size={svgWidth}
              color={rating.rating > 1.5 ? '#FFD54F' : '#F9F9F9'}
              name="star"
              style={styles.starMargin}
            />
            <Icon
              size={svgWidth}
              color={rating.rating > 2.5 ? '#FFD54F' : '#F9F9F9'}
              name="star"
              style={styles.starMargin}
            />
            <Icon
              size={svgWidth}
              color={rating.rating > 3.5 ? '#FFD54F' : '#F9F9F9'}
              name="star"
              style={styles.starMargin}
            />
            <Icon
              size={svgWidth}
              color={rating.rating > 4.5 ? '#FFD54F' : '#F9F9F9'}
              name="star"
              style={styles.starMargin}
            />
          </View>
        </View>
      </View>
    );
  }

  setHeightWidth(event) {
    const { width, height } = event.nativeEvent.layout;
    let size = 0.3 * height;
    this.setState({
      bottomTextMargin: size
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.openRating()}
        onLayout={event => this.setHeightWidth(event)}
      >
        {this.renderCard()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  ratingBox: {
    backgroundColor: Colors.STAR_YELLOW,
    height: 0.1 * ScreenHeight,
    width: 0.1 * ScreenHeight
  },
  alignMiddle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  starMargin: {
    marginRight: 3,
    height: 13,
    width: 13
  },
  userRating: {
    fontSize: 0.045 * ScreenHeight,
    fontWeight: 'bold',
    color: Colors.WHITE
  },
  userRatingText: {
    fontSize: 12,
    color: Colors.WHITE
  },
  bottomText: {
    fontSize: 10,
    fontFamily: Constants.MAIN_FONT
  },
  headerMain: {
    fontSize: 14,
    marginTop: px(2.5),
    marginBottom: px(1)
  },
  profileName: {
    fontSize: 0.035 * ScreenHeight,
    fontWeight: 'bold',
    color: Colors.TEXT_BLACK,
    fontFamily: Constants.MAIN_FONT
  },
  welcomeFlex: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: px(3),
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    margin: 5,
    elevation: 2.5,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 0.3
    }
  }
});
