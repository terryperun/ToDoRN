import React from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import s from './styles';
import DoneBtn from '../../components/DoneBtn/DoneBtn';
import Item from '../../components/Item/Item';
import Input from '../../components/Input/Input';

const HomeScreenView = ({
  setNewTaskInputText,
  newTaskInputText,
  addTodo,
  itemsTodo,
  showBtnDone,
  hideBtnDone,
  inputRef,
  removeTodo,
}) => {
  const elementsArray = itemsTodo.map((item) => (
    <Item
      key={item.id}
      text={item.text}
      completed={item.completed}
      style={s.task}
      onLongPress={() => removeTodo(item.id)}
    />
  ));
  return (
    <ScrollView style={s.container}>
      <View style={s.containerInput}>
        <MaterialCommunityIcons
          name="plus"
          size={30}
          style={s.icon}
        />
        <TextInput
          placeholder="Add item"
          style={s.textInput}
          onChangeText={setNewTaskInputText}
          value={newTaskInputText}
          onFocus={showBtnDone}
          onBlur={hideBtnDone}
          onSubmitEditing={addTodo}
          ref={inputRef}
        />
      </View>
      {elementsArray}
      <TouchableOpacity style={s.touchableBtn}>
        <Text style={s.touchableBtnText}>HIDE CHECKED-OFF ITEMS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

HomeScreenView.navigationOptions = ({ navigation }) => {
  let headerRight;
  if (navigation.getParam('isLoading')) {
    headerRight = (
      <ActivityIndicator
        size={30}
        color="#B71C1C"
        style={s.activityIndicator}
      />
    );
  } else if (navigation.getParam('showDone')) {
    headerRight = (
      <DoneBtn
        onPress={navigation.getParam('onDonePress')}
        style={s.doneBtn}
      />
    );
  }
  return {
    title: 'My shopping list',
    headerRight,
    headerTitleStyle: {
      elevation: 6,
    },
    headerStyle: {
      elevation: 0,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#d6d7da',
    },
  };
};

export default HomeScreenView;
