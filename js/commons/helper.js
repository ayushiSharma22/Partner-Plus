import React from 'react-native';
import Dimensions from 'Dimensions';
// Precalculate Device Dimensions for better performance
const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;
// Calculating ratio from iPhone breakpoints
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1;
const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1;
// We set our base font size value
const base_unit = 16;
// We're simulating EM by changing font size according to Ratio
const unit = base_unit * ratioX;
// We add an em() shortcut function
export function em(value) {
  return unit * value;
}

export function px(value) {
  return (x * value) / 100;
}

export function py(value) {
  return (y * value) / 100;
}

export function underscoreless(value) {
  return value.replace(/_/g, ' ');
}
