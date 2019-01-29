import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d6d7da',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  checkBox: {
    justifyContent: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  task: {
    justifyContent: 'center',
  },
  textTask: {
    color: '#212121',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#9E9E9E',
  },

  containerEditing: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#d6d7da',
    backgroundColor: 'white',
  },
  textInput: {
    height: 60,
    flex: 1,
  },

  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // completedCheckbox: {},
  // inactiveCheckbox: {},
});

export default styles;
