import { View, ScrollView } from 'react-native';
import React, { Component } from 'react';
import FaqCard from './FAQCard';

export default class FAQ extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let faqs = require('../../../data/FAQData');
    let component = [];
    for (var i = 0; i < faqs.default.length; i++) {
      component.push(
        <View key={i}>
          <FaqCard
            question={faqs.default[i].question}
            answer={faqs.default[i].answer}
          />
        </View>
      );
    }
    return (
      <ScrollView style={{ flex: 1 }}>
        <View>{component}</View>
      </ScrollView>
    );
  }
}
