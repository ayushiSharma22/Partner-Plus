import { View, TouchableOpacity, LayoutAnimation, UIManager, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { Icon } from 'native-base';
import Text from '../Text';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class FAQCard extends Component {
  constructor(props) {
    super(props);
    this.state = { minimized: true };
  }

  toggleFaq() {
    LayoutAnimation.easeInEaseOut();
    this.setState({minimized: !this.state.minimized})
  }

  getArrowIconName() {
    if(this.state.minimized) {
      return "ios-arrow-down";
    }
    return "ios-arrow-up";
  }

  renderAnswer() {
    if(!this.state.minimized) {
      return (
        <View style={{flexDirection:'column', alignItems: 'stretch', padding: 15, paddingTop: 0}}>
          <Text style={{color: '#656565', fontSize: 15}}>{ this.props.answer }</Text>
        </View>
      );
    }
  }

  renderQuestion() {
    return (
      <View style={{flexDirection:'row', alignItems: 'stretch', padding: 15}}>
        <View style={{flex: 5, flexDirection: 'column'}}>
          <Text style={{fontWeight: 'bold', color: '#34495e', fontSize: 16}}>{ this.props.question }</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={this.getArrowIconName()} style={{fontSize:20, color: '#989898'}}/>
        </View>
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.toggleFaq()}>
        <View style={[styles.container]} >
          {this.renderQuestion()}
          {this.renderAnswer()}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    shadowColor: "#000000",
    shadowOpacity: 0,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    },
    backgroundColor:'#ffffff',
  }
});
