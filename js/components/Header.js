import React, { Component } from 'react';
import { Dimensions, Image } from 'react-native';
import { Header, Button, Icon, Title, Thumbnail } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { backButtonPress } from '../commons/Utils';
import Text from './Text';
import { Badge } from './Elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../selection.json';
let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;

class StatusBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      req: false,
      com: false,
      err: false,
      ref: false,
      count: 0
    };
  }

  handleBackButtonPress() {
    const { navigator, productReset } = this.props;
    let currentRoutes = navigator.getCurrentRoutes();
    backButtonPress(navigator);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let { fetchNotifications, showAlert } = this.props;
    fetchNotifications().then(data => {
      let { init, req } = this.state;
      if (!!data.error) {
        if (init || req) {
          this.setState({ err: true, ref: false });
        }
        showAlert('info', 'Error', data.error);
      } else {
        this.setState({
          com: true,
          ref: false,
          req: false,
          count: data.total_unread_notifications
        });
      }
    });
  }

  getHeight(event) {
    const { width, height } = event.nativeEvent.layout;
    this.setState({
      height: height
    });
  }

  openNotifications() {
    let { navigator } = this.props;
    navigator.push({ id: 'notifications' });
  }

  render() {
    let heading = [],
      i = 0;
    i++;
    if (this.props.back_button) {
      heading.push(
        <Button
          key={i}
          transparent
          onPress={this.handleBackButtonPress.bind(this)}
        >
          <Icon
            name="md-arrow-back"
            style={{
              fontSize: 25,
              color: 'white',
              fontWeight: 'bold',
              paddingLeft: 0
            }}
          />
        </Button>
      );
    } else {
      heading.push(
        <Button key={i} transparent onPress={this.props.onDrawerPress}>
          <Icon
            name="ios-menu"
            style={{ fontSize: 30, color: 'white', paddingLeft: 0 }}
          />
        </Button>
      );
    }
    i++;
    if (this.props.heading == 'default') {
      heading.push(
        <Image
          key={i}
          source={require('../../img/partner_plus_3x.png')}
          defaultSource={require('../../img/partner_plus_3x.png')}
          style={{
            height: 0.035 * ScreenHeight,
            width: 0.5 * ScreenWidth
          }}
        />
      );
    } else {
      heading.push(
        <Title key={i}>
          <Text style={styles.textHeading}>{this.props.heading}</Text>
        </Title>
      );
    }
    i++;
    if (!this.props.back_button) {
      heading.push(
        <View
          key={i}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end'
          }}
        >
          <Button transparent onPress={this.openNotifications.bind(this)}>
            <Image
              source={require('../../img/notification-bell.png')}
              style={{ height: 0.04 * ScreenHeight, width: 0.05 * ScreenWidth }}
            />
            {!!this.state.count ? (
              <View
                style={{
                  position: 'absolute',
                  right: 0.003 * ScreenWidth,
                  top: 0.001 * ScreenWidth
                }}
              >
                <Badge
                  hollow={true}
                  status="primary"
                  message={this.state.count}
                  fontSize={0.03 * ScreenWidth}
                  width={0.05 * ScreenWidth}
                  paddingLeft={1}
                  paddingRight={1}
                  borderRadius={0.03 * ScreenWidth}
                  borderWidth={2}
                />
              </View>
            ) : (
              <Text />
            )}
          </Button>
        </View>
      );
    }
    return (
      <Header
        style={{
          backgroundColor: '#00AFD7',
          paddingLeft: 0,
          elevation: 2.5,
          shadowColor: '#000000',
          shadowOpacity: 0.2,
          shadowRadius: 10,
          shadowOffset: {
            height: 1,
            width: 0.3
          }
        }}
        onLayout={event => this.getHeight(event)}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          {heading}
        </View>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  textHeading: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default StatusBar;
