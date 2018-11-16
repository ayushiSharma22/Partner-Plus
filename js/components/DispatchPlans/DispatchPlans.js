import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Spinner } from 'native-base';
import { failedToLoadScreen } from '../Elements';
import Text from '../Text';
import * as Colors from '../../commons/colors';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(icomoonConfig);
import Mixpanel from 'react-native-mixpanel';

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

export default class DispatchPlans extends Component {
  constructor(props) {
    super(props);
    Mixpanel.track('Visited Dispatch Plan Page');
    this.state = {
      init: true,
      req: false,
      com: false,
      err: false,
      ref: false
    };
  }

  componentDidMount() {
    this.setState({ init: false, req: true });
    this.loadData();
  }

  loadData() {
    this.setState({ req: false, com: true, err: false });
  }

  renderNoDataScreen() {
    return (
      <Image
        source={require('../../../img/dp_3x.png')}
        style={{
          width: (3 * ScreenWidth) / 4,
          height: (3 * ScreenHeight) / 5,
          borderWidth: 2,
          borderColor: 'white'
        }}
      />
    );
  }

  renderNoDataScreenText() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.noScreenText}>
          We are working on this piece and will be released soon.
        </Text>
      </View>
    );
  }

  setWidth(event) {
    const { width, height } = event.nativeEvent.layout;
    let w = 0.9 * width;
    this.setState({
      width: w,
      inputWidth: w - 20
    });
  }

  renderContent() {
    return (
      <View style={styles.mainContent} onLayout={event => this.setWidth(event)}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="always"
        >
          {this.renderNoDataScreen()}
          {this.renderNoDataScreenText()}
        </ScrollView>
      </View>
    );
  }

  renderLoading() {
    return (
      <View>
        <View style={{ margin: 10 }}>
          <Spinner />
        </View>
      </View>
    );
  }

  renderError() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity onPress={this.loadData.bind(this)}>
          {failedToLoadScreen()}
        </TouchableOpacity>
      </ScrollView>
    );
  }

  render() {
    let { init, req, com } = this.state;
    if (init || req) {
      return this.renderLoading();
    } else if (com) {
      return this.renderContent();
    } else {
      return this.renderError();
    }
  }
}

const styles = StyleSheet.create({
  mainContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    height: ScreenHeight,
    padding: 30
  },
  noScreenText: {
    fontSize: 18,
    color: Colors.TEXT_BLACK,
    padding: 30,
    fontWeight: '600',
    textAlign: 'center'
  }
});
