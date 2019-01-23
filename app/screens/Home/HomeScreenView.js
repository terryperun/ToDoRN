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
import DoneBtn from '../../components/DoneBtn/DoneBtn';
import ItemList from '../../components/ItemList/ItemList';
import { data } from '../../mocks/items';

const HomeScreenView = ({ setInputTask, inputTask, addTodo }) => {
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
        <TextInput
          placeholder="Add item"
          style={s.textInput}
          onChangeText={setInputTask}
          value={inputTask}
        />
      </View>
      {array}
      <TouchableOpacity style={s.touchableBtn}>
        <Text style={s.touchableBtnText} onPress={addTodo}>
          HIDE CHECKED-OFF ITEMS
        </Text>
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
    borderBottomWidth: 1.5,
    borderColor: '#d6d7da',
  },
};

export default HomeScreenView;
