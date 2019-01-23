import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1.5,
    borderBottomColor: '#d6d7da',
    backgroundColor: '#FFFFFF',
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
});

export default styles;
