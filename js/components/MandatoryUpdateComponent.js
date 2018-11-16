import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking
} from 'react-native';
import Text from './Text';

export default class UpdateModal extends Component {
  constructor(props) {
    super(props);
  }
  openUpdateLink() {
    if (Platform.OS === 'ios') {
      Linking.openURL(
        'https://itunes.apple.com/in/app/bizongo-seller/id1192626367?mt=8'
      );
    } else if (Platform.OS === 'android') {
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.seller_app&hl=en'
      );
    }
  }
  render() {
    return (
      <View
        style={styles.mainView}
        onLayout={event => {
          let { width, height } = event.nativeEvent.layout;
          this.props.updateModalHeight(height);
        }}
      >
        <Text style={[styles.headingText, styles.centerAlign]}>
          Immediate Update Available
        </Text>
        <Text style={[styles.descriptionText, styles.centerAlign]}>
          Please update your app
        </Text>
        <View style={styles.buttonsRowView}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.openUpdateLink()}
          >
            <Text style={[styles.affirmativeText, styles.centerAlign]}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 10
  },
  buttonsRowView: {
    marginTop: 10,
    flexDirection: 'row'
  },
  cancelText: {
    color: '#555555'
  },
  affirmativeText: {
    color: '#00AFD7'
  },
  headingText: {
    fontWeight: 'bold',
    color: '#34495e',
    fontSize: 20
  },
  descriptionText: {
    marginTop: 10,
    color: '#555555',
    fontSize: 16
  },
  centerAlign: {
    textAlign: 'center'
  }
});
