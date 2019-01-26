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
  ref,
}) => {
  const elementsArray = itemsTodo.map((item) => (
    <Item
      key={item.id}
      text={item.text}
      completed={item.completed}
      style={s.task}
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
          ref={ref}
        />
      </View>
      {elementsArray}
      <TouchableOpacity style={s.touchableBtn}>
        <Text style={s.touchableBtnText} onPress={addTodo}>
          HIDE CHECKED-OFF ITEMS
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

HomeScreenView.navigationOptions = ({ navigation }) => {
  if (navigation.getParam('showDone')) {
    <DoneBtn
      onPress={navigation.getParam('onDonePress')}
      style={s.doneBtn}
    />;
  } else if (navigation.getParam('isLoading')) {
    <ActivityIndicator
      size={30}
      color="#B71C1C"
      style={s.activityIndicator}
    />;
  } else {
    null;
  }
  return {
    title: 'My shopping list',
    // headerRight: () => {
    //   if (navigation.getParam('showDone')) {
    //     <DoneBtn
    //       onPress={navigation.getParam('onDonePress')}
    //       style={s.doneBtn}
    //     />;
    //   } else if (navigation.getParam('isLoading')) {
    //     <ActivityIndicator
    //       size={30}
    //       color="#B71C1C"
    //       style={s.activityIndicator}
    //     />;
    //   } else {
    //     null;
    //   }
    // },

    headerRight: navigation.getParam('showDone') ? (
      <DoneBtn
        onPress={navigation.getParam('onDonePress')}
        style={s.doneBtn}
      />
    ) : navigation.getParam('isLoading') ? (
      <ActivityIndicator
        size={30}
        color="#B71C1C"
        style={s.activityIndicator}
      />
    ) : null,
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
