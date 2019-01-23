import React from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import s from './styles';
import ItemList from '../../components/ItemList/ItemList';
import { data } from '../../mocks/items';

const HomeScreenView = () => {
  const array = data.map((item) => (
    <ItemList
      task={item.task}
      completed={item.completed}
      style={s.task}
    />
  ));
  return (
    <View style={s.container}>
      <View style={s.containerInput}>
        <MaterialCommunityIcons
          name="plus"
          size={30}
          style={s.icon}
        />
        <TextInput placeholder="Add item" style={s.textInput} />
      </View>
      {array}
      <TouchableOpacity style={s.touchableBtn}>
        <Text style={s.touchableBtnText}>HIDE CHECKED-OFF ITEMS</Text>
      </TouchableOpacity>
    </View>
  );
};

HomeScreenView.navigationOptions = {
  title: 'My shopping lists',
  headerRight: (
    <ActivityIndicator
      size={30}
      color="#924E46"
      style={s.activityIndicator}
    />
  ),
};

export default HomeScreenView;
