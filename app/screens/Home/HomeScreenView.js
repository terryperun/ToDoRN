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
import ItemList from '../../components/ItemList/ItemList';

const HomeScreenView = ({
  setInputTask,
  inputTask,
  addTodo,
  itemsTodo,
  isLoading,
  showBtnDone,
  hideBtnDone,
  ref,
}) => {
  const array = itemsTodo.map((item) => (
    <ItemList
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
          onChangeText={setInputTask}
          value={inputTask}
          onFocus={showBtnDone}
          onBlur={hideBtnDone}
          onSubmitEditing={addTodo}
          ref={ref}
        />
      </View>
      {/* {isLoading ? 'Yep</Text> : <Text>Nope</Text>} */}
      {array}
      <TouchableOpacity style={s.touchableBtn}>
        <Text style={s.touchableBtnText} onPress={addTodo}>
          HIDE CHECKED-OFF ITEMS
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

HomeScreenView.navigationOptions = ({ navigation }) => ({
  title: 'My shopping list',
  headerRight: navigation.getParam('showDone') ? (
    <DoneBtn onPress={navigation.getParam('onDonePress')} />
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
});

export default HomeScreenView;
