import React from 'react';
import { TouchableNativeFeedback } from 'react-native';

const Touchable = (props) => (
  <TouchableNativeFeedback
    {...props}
    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
  />
);

export default Touchable;
