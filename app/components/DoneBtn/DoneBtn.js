import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const DoneBtn = ({ onPress }) => (
  <View>
    <TouchableOpacity onPress={onPress}>
      <Text>Done</Text>
    </TouchableOpacity>
  </View>
);

export default DoneBtn;
