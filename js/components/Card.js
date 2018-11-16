import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

class Card extends Component {
  render() {
    const newStyles = this.props.styles || {};
    return (
      <View style={[styles.container, styles.card, newStyles.card]}>
        {this.props.children}
      </View>
    );
  }
}

class CardImage extends Component {
  render() {
    const newStyles = this.props.styles || {};
    return (
      <View style={[styles.cardImage, newStyles.cardImage]}>
        {this.props.children}
      </View>
    );
  }
}

class CardTitle extends Component {
  render() {
    const newStyles = this.props.styles || {};
    return (
      <View style={[styles.cardTitle, newStyles.cardTitle]}>
        {this.props.children}
      </View>
    );
  }
}

class CardContent extends Component {
  render() {
    const newStyles = this.props.styles || {};
    return (
      <View style={[styles.cardContent, newStyles.cardContent]}>
        {this.props.children}
      </View>
    );
  }
}

class CardAction extends Component {
  render() {
    const newStyles = this.props.styles || {};
    return (
      <View>
        {this.props.separator ? <Separator /> : null}
        <View style={[styles.cardAction, newStyles.cardAction]}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

class Separator extends Component {
  render() {
    return <View style={styles.separator} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: 5
  },
  card: {
    elevation: 1,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 0.3
    }
  },
  cardImage: {
    flex: 1
  },
  cardTitle: {
    padding: 10
  },
  cardContent: {
    padding: 10
  },
  cardAction: {
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: '#E9E9E9'
  }
});

export { Card, CardTitle, CardAction, CardContent, CardImage, Separator };
