import React from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import s from './styles';
import ItemList from '../../components/ItemList/ItemList';
import { data } from '../../mocks/items';

const HomeScreenView = () => {
  const array = data.map((item) => (
    <ItemList
      key={item.id}
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
  title: 'My shopping list',
  headerRight: (
    <ActivityIndicator
      size={30}
      color="#B71C1C"
      style={s.activityIndicator}
    />
  ),
  headerTitleStyle: {
    elevation: 6,
  },
  headerStyle: {
    elevation: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#d6d7da',
  },
};

export default HomeScreenView;
