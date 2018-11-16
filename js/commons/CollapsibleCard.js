import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  UIManager
} from 'react-native';
import { Icon } from 'native-base';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class CollapsibleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.toggleOpenCard = this.toggleOpenCard.bind(this);
  }
  toggleOpenCard() {
    // LayoutAnimation.easeInEaseOut();
    this.setState({ open: !this.state.open });
  }
  renderHeader() {
    let iconName = 'ios-arrow-down';
    if (this.state.open) {
      iconName = 'ios-arrow-up';
    }
    let arrowComponent = null;
    if (this.props.collapsible) {
      arrowComponent = (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 20
          }}
        >
          <Icon
            name={iconName}
            style={[this.props.arrowStyle, { fontSize: 20, color: '#FFFFFF' }]}
          />
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        disabled={!this.props.collapsible}
        onPress={this.toggleOpenCard}
      >
        <View style={{ flex: 3 }}>{this.props.heading}</View>
        <View style={{ flex: 1 }}>{arrowComponent}</View>
      </TouchableOpacity>
    );
  }
  renderContent() {
    if (!this.state.open && this.props.collapsible) {
      return null;
    } else {
      return (
        <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          {this.props.content}
        </View>
      );
    }
  }

  render() {
    return (
      <View style={[styles.mainCard, this.props.mainCardStyle]}>
        {this.renderHeader()}
        {this.renderContent()}
      </View>
    );
  }
}

CollapsibleCard.defaultProps = {
  collapsible: true
};

const styles = StyleSheet.create({
  mainCard: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#34495E',
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 2,
    elevation: 1,
    shadowColor: '#54575A',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 0.3
    }
  }
});
